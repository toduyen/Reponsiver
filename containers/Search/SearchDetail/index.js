import { layoutToggleLoading } from "actions";
import { getTEMAnnouncement, getTEMUsing, getTEMUsingDetail } from "actions";
import { Col, Row } from "antd";
import {
  PageFormBorder,
  PagePaginationWrapper,
  PageTitleWrapper,
} from "components";
import {ButtonAnt, Pagination} from "components/patterns";
import { withConnect } from "hocs";
import React from "react";
import ViewDetailTem from "./ViewDetailTem";
import { Table } from "./Table";
import styled from "styled-components";

export const P = styled.p`
  color: black;
  padding-top: 2em;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
`;

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
class SearchDetail extends React.Component {
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

  closeModal = () => {
    this.setState({ showModal: "" });
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

  rowClassName = (row, index) => {
    const { selectedRow } = this.state;
    return selectedRow.key === row.key && "ant-selected-row";
  };

  renderOption() {
    const {
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
      </Row>
    );
  }

  render() {
    const { datas, page, size } = this.state;

    const dataDemo = [
      {
        shBlock: "T0001",
        qrCode: "TR01T.AA/2022.T0001.00000001-00050000",
        khmtem: "TR01T",
        khtem: "AA",
        namph: "2022",
        sntemdaublock: "00000001",
        sntemcuoiblock: "00050000",
        dvt: "Thùng",
        tts: "Quét trùng số"
      }
    ]

    const dataSource = dataDemo.map((el) => ({ key: el.id, ...el }));

    return (
      <>
        <PageTitleWrapper className="title-search">
          Thông tin chi tiết phiếu xuất tem từ QRC của TCCN
        </PageTitleWrapper>
        <P>
          <span>Thông tin phiếu</span>
          <span style={{float: "right"}}>Lịch sử dữ liệu phiếu</span>
        </P>
        <PageFormBorder>
          <ViewDetailTem handleSearch={this.handleSearch} />
        </PageFormBorder>
        <P>
          <span>Thông tin lượt quét trong phiếu</span>
        </P>
        <Table
          dataSource={dataSource}
          onRow={(row, rowIndex) => ({
            onClick: this.onClickRow(row, rowIndex),
          })}
          rowClassName={this.rowClassName}
          startIndex={page * size}
          onViewTK={this.onViewTK}
          onViewAnnouncement={this.onViewAnnouncement}
        />
        <PagePaginationWrapper>{this.renderOption()}</PagePaginationWrapper>
          <Row type="flex" justify="center" gutter={30}>
            <Col>
              <ButtonAnt htmlType="submit" text="Trở lại" />
            </Col>
            <Col>
              <ButtonAnt
                  text="Xóa phiếu"
              />
            </Col>
          </Row>
      </>
    );
  }
}

export default SearchDetail;
