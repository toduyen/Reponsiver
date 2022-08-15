import {
  getNewReportDetail,
  layoutToggleLoading,
  getJobCQT,
  exportExcelReport,
} from "actions";
import { Col, Row } from "antd";
import {
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTitleWrapper,
} from "components";
import { ButtonAnt, ButtonIcon, Pagination } from "components/patterns";
import { withConnect } from "hocs";
import { isEmpty } from "lodash";
import React from "react";
import { TableReport } from "./Table";

@withConnect((state) => ({ ...state.authReducer }))
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      page: 0,
      size: 15,
      listState: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (state, page = 0, size = this.state.size) => {
    const { dispatch, jwt, row, mapData = (el) => el, name } = this.props;
    const { listState } = this.state;
    this.setState({ size });
    const param = {
      size,
      state,
      id: row.id,
      lbcao: row.lbcao,
      name: row.loai,
    };
    dispatch(layoutToggleLoading(true));
    try {
      const response = await dispatch(getNewReportDetail(jwt, param, name));
      if (!response) {
        return;
      }
      const { datas = [], state: newState } = response;
      listState[page] = newState;
      this.setState({
        datas: datas.map(mapData),
        listState,
        page,
      });
    } finally {
      dispatch(layoutToggleLoading(false));
      this.props.onCancel();
    }
  };

  onExportExcel = async () => {
    const { dispatch, jwt, row, name } = this.props;
    try {
      dispatch(layoutToggleLoading(true));
      const response = await dispatch(getJobCQT(jwt));
      if (!response) {
        return;
      }
      const [cthue, ccthue] = Object.entries(response)[0];
      const param = {
        id: row.id,
        lbcao: row.lbcao,
        cthue,
        ccthue,
      };
      await dispatch(exportExcelReport(jwt, param, name));
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  render() {
    // const { onCancel, columns } = this.props;
    // const { datas, page, size, listState } = this.state;
    // const dataSource = datas.map((i, idx) => {
    //   return { ...i };
    // });

    // return (
    //   <PageInchargeModal
    //     centered
    //     closable={false}
    //     visible
    //     width="90%"
    //     className="modal-ant"
    //     footer={null}
    //     onCancel={onCancel}
    //   >
    //     <PageInChargeTitleWrapper>Xem kết quả</PageInChargeTitleWrapper>
    //     <PageInchargeContainer>
    //       <Row type="flex" justify="end" gutter={10}>
    //         <Col style={{ flex: 1 }}>
    //           <Pagination
    //             page={page}
    //             size={size}
    //             listState={listState}
    //             onChange={this.fetchData}
    //           />
    //         </Col>

    //         <Col>
    //           <ButtonIcon
    //             icon="icon_ket_xuat"
    //             title="Kết xuất"
    //             disabled={isEmpty(datas)}
    //             onClick={this.onExportExcel}
    //           />
    //         </Col>
    //       </Row>
    //       <TableReport
    //         dataSource={dataSource}
    //         columns={columns({ startIndex: page * size })}
    //       />
    //     </PageInchargeContainer>{" "}
    //     <Row
    //       type="flex"
    //       justify="center"
    //       gutter={20}
    //       style={{ margin: "10px 0px 10px 0px" }}
    //     >
    //       <Col>
    //         <ButtonAnt onClick={onCancel}>Đóng</ButtonAnt>
    //       </Col>
    //     </Row>
    //   </PageInchargeModal>
    // );
    return null;
  }
}

export const ModalReport = Popup;
