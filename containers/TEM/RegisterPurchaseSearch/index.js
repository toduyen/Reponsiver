import { layoutToggleLoading } from "actions";
import {
  getTEMAnnouncement,
  getTEMPurchase,
  getTEMPurchaseDetail,
} from "actions";
import { Col, Row } from "antd";
import {
  PageFormWrapper,
  PagePaginationWrapper,
  PageTitleWrapper,
} from "components";
import { ButtonAnt, ButtonIcon, Pagination } from "components/patterns";
import { withConnect } from "hocs";
import _ from "lodash";
import React from "react";
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
        {showModal === MODAL.DETAIL && (
          <PopupRegisterUsingTEM
            title="Chi tiết"
            renderBtn={this.renderDetailBtn}
            unfix
            selectedRow={selectedRow}
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
          Tra cứu đăng ký mua TEM
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
          onClickChiTiet={this.onClickChiTiet}
        />
      </>
    );
  }
}

export default Page;
