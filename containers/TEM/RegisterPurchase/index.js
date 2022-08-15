import { layoutToggleLoading } from "actions";
import {
  adjustTEMPurchase,
  genXmlTEMPurchase,
  getTEMAnnouncement,
  getTEMPurchase,
  getTEMPurchaseDetail,
  rejectTEMPurchase,
  signTEMPurchase,
} from "actions";
import { Col, Modal, Row } from "antd";
import {
  ModalApproval,
  ModalReject,
  PageFormWrapper,
  PagePaginationWrapper,
  PageTitleWrapper,
} from "components";
import { ButtonAnt, ButtonIcon, Pagination } from "components/patterns";
import { withConnect } from "hocs";
import _ from "lodash";
import React from "react";
import { pluginCertificate } from "utils/sa";
import ViewDataPopup02TEM from "../PopupAnnouncement/02-TEM";
import ViewDataPopup03TEM from "../PopupAnnouncement/03-TEM";
import PopupRegisterUsingTEM from "./Popup/PopupRegisterUsingTEM";
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
        const response = await dispatch(getTEMPurchase(jwt, param));
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
          selectedRow: {},
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

  onSign = async ({
    hinhThuc,
    hthuc: maHinhThuc,
    cdanh: chucDanh,
    cduquyen: chucDanhUyQuyen,
  }) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    try {
      dispatch(layoutToggleLoading(true));
      const { cert } = await pluginCertificate.getCertificate();
      const param = {
        ...selectedRow,
        cert: cert.base64,
        maHinhThuc,
        hinhThuc,
        chucDanh,
        chucDanhUyQuyen,
      };
      const resXml = await dispatch(genXmlTEMPurchase(jwt, param));
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
        cert_info: response?.cert_info?.Subject || "",
        cert: response.cert,
        maHinhThuc,
        hinhThuc,
        chucDanh,
        chucDanhUyQuyen,
      };
      await dispatch(signTEMPurchase(jwt, body));
    } catch (error) {
      // reject();
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  onAdjust = async (value) => {
    const { dispatch, jwt, selectedRow } = this.props;
    const { ndung, selected } = value;
    const param = { ...selectedRow, pdldao: selected, pdndung: ndung };
    delete param.key;
    // console.log(param);
    await dispatch(adjustTEMPurchase(jwt, param));
  };

  onReject = async ({ pdndung: lyDo }) => {
    const { dispatch, jwt } = this.props;
    const {
      selectedRow: { id, trangThai },
    } = this.state;
    await dispatch(
      rejectTEMPurchase(jwt, { id, lyDo, trangThai: trangThai === 0 ? 2 : 4 })
    );
  };

  onApprove = async () => {
    const { dispatch, jwt } = this.props;
    const {
      selectedRow: { id, trangThai },
    } = this.state;
    try {
      await new Promise((resolve, reject) => {
        Modal.confirm({
          centered: true,
          title: "Xác nhận phê duyệt",
          content: "Bạn có chắc chắn phê duyệt ?",
          okText: "Xác nhận",
          cancelText: "Hủy",
          onOk: () => resolve(),
        });
      });
      await dispatch(
        rejectTEMPurchase(jwt, { id, trangThai: trangThai === 0 ? 1 : 3 })
      );
    } catch {}
  };

  onViewProposal = async (data) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    const param = data?.id ? data : selectedRow;
    const dataProposal = await dispatch(getTEMPurchaseDetail(jwt, param));
    this.setState({ dataProposal });
  };

  onViewAnnouncement = async (data) => {
    const { dispatch, jwt } = this.props;
    const { selectedRow } = this.state;
    const param = data?.id ? data : selectedRow;
    const dataAnnouncement = await dispatch(getTEMAnnouncement(jwt, param));
    if (dataAnnouncement) {
      this.setState({
        dataAnnouncement: {
          ...param,
          ...dataAnnouncement,
          dangKyTem: "Đơn đề nghị mua tem điện tử",
        },
      });
    }
  };

  onClickRow = (row, rowIndex) => (e) => {
    this.setState({ selectedRow: row });
  };

  onClickXuLy = async (row) => {
    this.setState({ selectedRow: row });
    this.openModal(MODAL.HANDLE)
  };

  onClickDuyet = async (row) => {
    this.setState({ selectedRow: row });
    this.onApprove()
  };

  onClickKyDuyet = async (row) => {
    this.setState({ selectedRow: row });
    this.openModal(MODAL.SIGN)
  };

  onClickTuChoi = async (row) => {
    this.setState({ selectedRow: row });
    this.openModal(MODAL.REJECT)
  };

  onClickChiTiet = async (row) => {
    this.setState({ selectedRow: row });
    this.openModal(MODAL.DETAIL)
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
            disabled={_.isEmpty(selectedRow)}
            title="Xử lý"
            icon="icon_xu_ly"
            onClick={() => this.openModal(MODAL.HANDLE)}
          />
        </Col>
        <Col>
          <ButtonIcon
            disabled={
              _.isEmpty(selectedRow) || ![0, 1].includes(selectedRow.trangThai)
            }
            title="Duyệt"
            icon="icon_phe_duyet_va_ky"
            onClick={this.onApprove}
          />
        </Col>
        <Col>
          <ButtonIcon
            disabled={
              _.isEmpty(selectedRow) || ![3].includes(selectedRow.trangThai)
            }
            title="Ký duyệt"
            icon="icon_phe_duyet_va_ky"
            onClick={() => this.openModal(MODAL.SIGN)}
          />
        </Col>
        <Col>
          <ButtonIcon
            disabled={
              _.isEmpty(selectedRow) || ![0, 1].includes(selectedRow.trangThai)
            }
            title="Từ chối"
            icon="icon_tu_choi"
            onClick={() => this.openModal(MODAL.REJECT)}
          />
        </Col>
        <Col>
          <ButtonIcon
            title="Xem chi tiết"
            icon="icon_xem_chi_tiet"
            disabled={_.isEmpty(selectedRow)}
            onClick={() => this.openModal(MODAL.DETAIL)}
          />
        </Col> */}
      </Row>
    );
  }

  renderHandleBtn = () => {
    const { selectedRow } = this.state;

    return (
      <Row
        type="flex"
        justify="center"
        gutter={10}
        style={{ margin: "20px 0" }}
      >
        {/* <Col>
          <ButtonAnt
            text="Trình duyệt"
            onClick={() => this.openModal(MODAL.ADJUST)}
          />
        </Col> */}
        <Col>
          <ButtonAnt
            text="Duyệt"
            onClick={this.onApprove}
            disabled={![0, 1].includes(selectedRow.trangThai)}
          />
        </Col>
        <Col>
          <ButtonAnt
            text="Ký duyệt"
            onClick={() => this.openModal(MODAL.SIGN)}
            disabled={![3].includes(selectedRow.trangThai)}
          />
        </Col>
        <Col>
          <ButtonAnt
            disabled={![0, 1].includes(selectedRow.trangThai)}
            text="Từ chối"
            onClick={() => this.openModal(MODAL.REJECT)}
          />
        </Col>
        <Col>
          <ButtonAnt text="Xem đề nghị" onClick={this.onViewProposal} />
        </Col>
        {!!selectedRow.toKhaiId && (
          <Col>
            <ButtonAnt text="Xem thông báo" onClick={this.onViewAnnouncement} />
          </Col>
        )}
        <Col>
          <ButtonAnt text="Đóng" onClick={this.closeModal} />
        </Col>
      </Row>
    );
  };

  renderDetailBtn = () => {
    const { selectedRow } = this.state;
    return (
      <Row
        type="flex"
        justify="center"
        gutter={10}
        style={{ margin: "20px 0" }}
      >
        <Col>
          <ButtonAnt text="Xem đề nghị" onClick={this.onViewProposal} />
        </Col>
        {!!selectedRow.toKhaiId && (
          <Col>
            <ButtonAnt text="Xem thông báo" onClick={this.onViewAnnouncement} />
          </Col>
        )}
        <Col>
          <ButtonAnt text="Đóng" onClick={this.closeModal} />
        </Col>
      </Row>
    );
  };

  renderModal = () => {
    const {
      showModal,
      selectedRow,
      dataProposal,
      dataAnnouncement,
    } = this.state;
    return (
      <>
        {showModal === MODAL.HANDLE && (
          <PopupRegisterUsingTEM
            title="Xử lý"
            renderBtn={this.renderHandleBtn}
            unfix
            selectedRow={selectedRow}
          />
        )}
        {showModal === MODAL.DETAIL && (
          <PopupRegisterUsingTEM
            title="Chi tiết"
            renderBtn={this.renderDetailBtn}
            unfix
            selectedRow={selectedRow}
          />
        )}
        {showModal === MODAL.ADJUST && (
          <ModalApproval
            code="LDPDDKM"
            visible
            nameType=""
            onCancelModal={this.closeModal}
            handleSubmit={this.onAdjust}
            hiddenApprovalContent
          />
        )}
        {showModal === MODAL.REJECT && (
          <ModalReject
            onCancelModal={this.closeModal}
            handleSubmit={this.onReject}
            reject
          />
        )}
        {showModal === MODAL.SIGN && (
          <ModalReject
            titlePopup="Ký duyệt"
            onCancelModal={this.closeModal}
            handleSubmit={this.onSign}
            sign
            noContent
          />
        )}
        {dataProposal && (
          <ViewDataPopup03TEM
            data={dataProposal}
            onCancel={() => this.setState({ dataProposal: undefined })}
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
          Đăng ký mua TEM
        </PageTitleWrapper>
        <PageFormWrapper>
          <SearchForm handleSearch={this.handleSearch} />
        </PageFormWrapper>
        <PagePaginationWrapper>{this.renderOption()}</PagePaginationWrapper>
        <Table
          dataSource={dataSource}
          // onRow={(row, rowIndex) => ({
          //   onClick: this.onClickRow(row, rowIndex),
          // })}
          rowClassName={this.rowClassName}
          startIndex={page * size}
          onViewProposal={this.onViewProposal}
          onViewAnnouncement={this.onViewAnnouncement}
          onClickXuLy={this.onClickXuLy}
          onClickDuyet={this.onClickDuyet}
          onClickKyDuyet={this.onClickKyDuyet}
          onClickTuChoi={this.onClickTuChoi}
          onClickChiTiet={this.onClickChiTiet}
        />
      </>
    );
  }
}

export default Page;
