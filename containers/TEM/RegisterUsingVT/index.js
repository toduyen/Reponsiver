import { layoutToggleLoading } from "actions";
import {
  genXmlTEMUsing,
  getTEMAnnouncement,
  getTEMUsing,
  getTEMUsingDetail,
  rejectTEMUsing,
  signTEMUsing,
} from "actions";
import { Col, Row } from "antd";
import {
  ModalReject,
  PageFormWrapper,
  PagePaginationWrapper,
  PageTitleWrapper,
} from "components";
import PaperApproval from "components/PaperApproval";
import { ButtonIcon, Pagination } from "components/patterns";
import { withConnect } from "hocs";
import _ from "lodash";
import React from "react";
import { pluginCertificate } from "utils/sa";
import { ViewDataPopup01TEM } from "../PopupAnnouncement/01-TEM";
import ViewDataPopup02TEM from "../PopupAnnouncement/02-TEM";
import SearchForm from "./SearchForm";
import { Table } from "./Table";

const MODAL = {
  ADD: "ADD",
  HANDLE: "HANDLE",
  DETAIL: "DETAIL",
  REJECT: "REJECT",
  ADJUST: "ADJUST",
  SIGN: "SIGN",
};

@withConnect((state) => ({
  ...state.authReducer,
  ...state.temReducer,
}))
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      page: 0,
      size: 15,
      time: 0,
      total: 0,
      search: null,
      listState: [],
      loading: false,
      selectedRow: {},
      showModal: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { actionSuccess } = this.props;
    if (prevProps.actionSuccess !== actionSuccess) {
      if (actionSuccess) {
        let page = this.state.page;
        if (this.state.showModal === MODAL.ADD) {
          page = 0;
        }
        this.fetchData(this.state.listState[page - 1], page);
        this.closeModal();
      }
    }
  }

  fetchData = (state, page = 0, size = this.state.size) => {
    const { dispatch, jwt } = this.props;
    let { search, listState } = this.state;
    this.setState({ loading: true, size }, async () => {
      try {
        const param = {
          ...search,
          paggingReq: { limit: size, page: page + 1 },
        };
        dispatch(layoutToggleLoading(true));
        const response = await dispatch(getTEMUsing(jwt, param));
        dispatch(layoutToggleLoading(false));
        if (!response) {
          return;
        }
        const { content: datas, totalElements: total } = response;
        // listState[page];
        this.setState({
          datas,
          total,
          listState,
          page,
        });
      } finally {
        this.setState({ loading: false });
      }
    });
  };

  handleSearch = (search) => {
    this.setState({ search }, this.fetchData);
  };

  openModal = (type) => {
    this.setState({ showModal: type });
  };

  closeModal = () => {
    this.setState({ showModal: "" });
  };

  onSign = async ({ sbt: soThongBao }) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    try {
      dispatch(layoutToggleLoading(true));
      const { cert } = await pluginCertificate.getCertificate();
      const param = { ...selectedRow, cert: cert.base64, soThongBao };
      const resXml = await dispatch(genXmlTEMUsing(jwt, param));
      const { encodedXml, xpathOut, xpathIn } = resXml;
      const { response } = await pluginCertificate.sign(
        encodedXml,
        xpathOut,
        xpathIn,
        cert.base64
      );
      const body = {
        id: selectedRow.id,
        mst: selectedRow.mst,
        xmlOut: response.signed,
        soThongBao,
        cert_info: response?.cert_info?.Subject || "",
        cert: response.cert,
      };
      await dispatch(signTEMUsing(jwt, body));
    } catch (error) {
      // reject();
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  onReject = async ({ pdndung: lyDo }) => {
    const { dispatch, jwt } = this.props;
    const {
      selectedRow: { id },
    } = this.state;
    await dispatch(rejectTEMUsing(jwt, { id, lyDo, trangThai: 4 }));
  };

  onViewTK = async (data) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    const param = data?.toKhaiId ? data : selectedRow;
    const dataTK = await dispatch(getTEMUsingDetail(jwt, param));
    this.setState({ dataTK });
  };

  onViewAnnouncement = async (data) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    const param = data?.toKhaiId ? data : selectedRow;
    const dataAnnouncement = await dispatch(getTEMAnnouncement(jwt, param));
    if (dataAnnouncement) {
      this.setState({
        dataAnnouncement: { ...param, ...dataAnnouncement },
      });
    }
  };

  onClickRow = (row, rowIndex) => (e) => {
    this.setState({ selectedRow: row });
  };

  onClickKyBH = async (row) => {
    this.setState({ selectedRow: row });
    this.openModal(MODAL.SIGN)
  };

  rowClassName = (row, index) => {
    const { selectedRow } = this.state;
    return selectedRow.key === row.key && "ant-selected-row";
  };

  renderOption() {
    const {
      selectedRow,
      size,
      page,
      total,
      search,
      time,
      listState,
    } = this.state;
    return (
      <Row type="flex" justify="end" gutter={20}>
        <Col style={{ flex: 1 }}>
          <Pagination
            page={page}
            total={total}
            time={search ? time : 0}
            size={size}
            listState={listState}
            onChange={this.fetchData}
          />
        </Col>
        {/* <Col>
          <ButtonIcon
            disabled={
              _.isEmpty(selectedRow) || ![5].includes(selectedRow.trangThai)
            }
            title="Ký ban hành"
            icon="icon_phe_duyet_va_ky"
            onClick={() => this.openModal(MODAL.SIGN)}
          />
        </Col> */}
        {/* <Col>
          <ButtonIcon
            disabled={_.isEmpty(selectedRow)}
            title="Từ chối"
            icon="icon_tu_choi"
            onClick={() => this.openModal(MODAL.REJECT)}
          />
        </Col> */}
      </Row>
    );
  }

  renderModal = () => {
    const { showModal, dataTK, dataAnnouncement } = this.state;
    return (
      <>
        {showModal === MODAL.REJECT && (
          <ModalReject
            onCancelModal={this.closeModal}
            handleSubmit={this.onReject}
            reject
          />
        )}
        {showModal === MODAL.SIGN && (
          <PaperApproval cancel={this.closeModal} onApprove={this.onSign} />
        )}
        {dataTK && (
          <ViewDataPopup01TEM
            data={dataTK}
            onCancel={() => this.setState({ dataTK: undefined })}
          />
        )}
        {dataAnnouncement && (
          <ViewDataPopup02TEM
            data={dataAnnouncement}
            onCancel={() => this.setState({ dataAnnouncement: undefined })}
          />
        )}
      </>
    );
  };

  render() {
    const { datas, page, size } = this.state;

    const dataSource = datas.map((el) => ({ key: el.id, ...el }));

    return (
      <>
        {this.renderModal()}
        <PageTitleWrapper className="title-search">
          Văn thư ký ban hành thông báo tiếp nhận, xử lý đăng ký sử dụng TEM
        </PageTitleWrapper>
        <PageFormWrapper>
          <SearchForm handleSearch={this.handleSearch} />
        </PageFormWrapper>
        <PagePaginationWrapper>{this.renderOption()}</PagePaginationWrapper>
        <Table
          dataSource={dataSource}
          onRow={(row, rowIndex) => ({
            onClick: this.onClickRow(row, rowIndex),
          })}
          rowClassName={this.rowClassName}
          startIndex={page * size}
          onViewTK={this.onViewTK}
          onViewAnnouncement={this.onViewAnnouncement}
          onClickKyBH={this.onClickKyBH}
        />
      </>
    );
  }
}

export default Page;
