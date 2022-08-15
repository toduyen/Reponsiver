import {
  getJobCQT,
  getNewReport,
  getReport,
  getReportJob,
  layoutToggleLoading,
  selectRow,
} from "actions";
import { Button, Col, Row } from "antd";
import {
  ModalReport,
  PageFormWrapper,
  PagePaginationWrapper,
  PageTableWrapper,
  PageTitleWrapper,
} from "components";
import { ButtonAnt, Pagination } from "components/patterns";
import { withConnect } from "hocs";
import { cloneDeep } from "lodash";
import React from "react";
import { exportExcel } from "utils/helper";
import notification from "utils/notification";
import DataForm from "./SearchForm";
import { PageWrapper } from "./styles";
import { TableReport } from "./Table";
import { columns1 } from "./Table/columns";

@withConnect((state) => ({
  ...state.authReducer,
}))
class Page extends React.Component {
  state = {
    datas: [],
    page: 0,
    size: 15,
    time: 0,
    total: 0,
    search: null,
    listState: [],
    detailPopup: false,
    approvePopup: false,
    selectedRow: null,
    fullData: null,
  };

  componentWillUnmount() {
    this.props.dispatch(selectRow({}));
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  callApi = async (param) => {
    const { dispatch, jwt } = this.props;
    const { from, to, chiCucThue, cucThue } = param;
    let status = "";
    const endpoint = chiCucThue ? "register/detail" : "register";
    const cqt = chiCucThue || cucThue;
    const res = await dispatch(
      getReport(jwt, { from, to, cqt: cqt === "'0'" ? "0" : cqt }, endpoint)
    );
    if (!res) {
      return { fullData: [], dataExport: [] };
    }
    const { jobId } = res;
    let response;
    while (!["FINISHED"].includes(status)) {
      response = await dispatch(
        getReportJob(jwt, jobId, { name: endpoint.replace("/", "-") })
      );
      if (!response) {
        return;
      }
      status = response.status;
    }
    const dataExport = response.result
      .sort((a, b) => (a.mcqtqly > b.mcqtqly ? 1 : -1))
      .map((el, idx) => {
        let tglke = 0;
        ["tk01", "tk2367", "tk4", "tk5", "tk8"].forEach((key) => {
          tglke += el[key] || 0;
        });
        return { ...el, tglke, stt: idx + 1 };
      });
    const dataClone = cloneDeep(dataExport);
    const fullData = [],
      size = 50;
    while (dataClone.length > 0) fullData.push(dataClone.splice(0, size));
    return { fullData, dataExport };
  };

  getDatas = () => {
    if (this.state.fullData.length === 0) return;
    this.setState(({ fullData, datas }) => {
      const data = fullData.shift();
      datas = [...datas, ...data];
      return { fullData, datas };
    });
  };

  getResult = (row) => async () => {
    if (row.tthai === -1) {
      notification.error(row.kqua || "Có lỗi xảy ra");
      return;
    }
    this.setState({ row });
  };

  
  // handle functions
  fetchData = async (state, page = 0, size = this.state.size) => {
    const { dispatch, jwt } = this.props;
    const { search, listState } = this.state;
    this.setState({ size });
    const param = {
      size,
      state,
      search: { [`lbcao==`]: "BCCTHKDDK" },
      sort: { ntao: "desc" },
    };
    dispatch(layoutToggleLoading(true));
    try {
      const response = await dispatch(getNewReport(jwt, param));
      if (!response) {
        return;
      }
      const { datas = [], state: newState, time, total } = response;
      listState[page] = newState;
      const newDatas=[
        {
          stt: 1,
          ten: "Tem điện tử thuốc lá",
          kyhieu: "TDTTL",
          sldangky: 1000,
          slnopbaocao: 980,
          slsudung: 992,
          slmat: 2,
          slhuy:0,
          tongcong: 1000,
          ghichu: "không có ghi chú gì"
        },
        {
          stt: 1,
          ten: "Tem điện tử rượu bia",
          kyhieu: "TDTRB",
          sldangky: 400,
          slnopbaocao: 300,
          slsudung: 320,
          slmat: 5,
          slhuy:7,
          tongcong: 400,
          ghichu: "không có ghi chú gì"
        }
      ]
      this.setState({
        datas,
        time,
        total,
        listState,
        page,
        selectedRow: null,
      });
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  hotReload = async (state, page = this.state.page, size = this.state.size) => {
    const { dispatch, jwt } = this.props;
    const { search, listState } = this.state;
    this.setState({ size });
    const param = {
      size,
      state: listState[page - 1],
      search: { [`lbcao==`]: "BCCTHKDDK" },
      sort: { ntao: "desc" },
    };
    try {
      const response = await dispatch(getNewReport(jwt, param));
      if (!response) {
        return;
      }
      const { datas = [], state: newState, time, total } = response;
      listState[page] = newState;
      
      this.setState({
        datas,
        time,
        total,
        listState,
        page,
      });
    } finally {
    }
  };

  handleSearch = (search) => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.hotReload();
    }, 10000);
    this.setState(
      {
        search,
      },
      this.fetchData
    );
  };
  // table row function
  onClickRow = (row, rowIndex) => (e) => {
    if (this.state.selectedRow?.key === row.key) {
      this.setState({ selectedRow: null });
      return;
    }
    this.setState({ selectedRow: row });
  };

  rowClassName = (row, index) => {
    const { selectedRow } = this.state;
    return selectedRow && selectedRow.key === row.key && "ant-selected-row";
  };

  onSelectChange = (key, selectedRows) => {
    this.setState({ rowKeys: key, selectedRows });
  };

  onExportExcel = async (subTitle) => {
    const { dispatch, jwt } = this.props;
    const { dataExport } = this.state;
    const columns = columns1({});
    try {
      dispatch(layoutToggleLoading(true));
      const response = await dispatch(getJobCQT(jwt));
      if (!response) {
        return;
      }
      const [key, value] = Object.entries(response)[0];
      const header = [
        { text: key.toUpperCase() },
        { text: value.toUpperCase(), style: { bold: true } },
      ];
      await exportExcel({
        columns,
        data: dataExport,
        fileName: "Báo cáo tổng hợp sử dụng tem điện tử của tổ chức cá nhân",
        subTitle,
        header,
      });
    } finally {
      dispatch(layoutToggleLoading(false));
    }
  };

  handleRender = (row) => {
    if (![-1, 2].includes(row.tthai)) {
      return null;
    }
    return (
      <Button
        type="link"
        style={{ width: "100%" }}
        onClick={this.getResult(row)}
      >
        Xem kết quả
      </Button>
    );
  };

  mapData = (el, idx) => {
    let tglke = 0;
    ["tk01", "tk2367", "tk4", "tk5", "tk8"].forEach((key) => {
      tglke += el[key] || 0;
    });
    return { ...el, tglke, stt: idx + 1 };
  };

  render() {
    const newDatas=[
      {
        stt: 1,
        ten: "Tem điện tử thuốc lá",
        kyhieu: "TDTTL",
        sldangky: 1000,
        slnopbaocao: 980,
        slsudung: 992,
        slmat: 2,
        slhuy:0,
        tongcong: 1000,
        ghichu: "không có ghi chú gì"
      },
      {
        stt: 1,
        ten: "Tem điện tử rượu bia",
        kyhieu: "TDTRB",
        sldangky: 400,
        slnopbaocao: 300,
        slsudung: 320,
        slmat: 5,
        slhuy:7,
        tongcong: 400,
        ghichu: "không có ghi chú gì"
      }
    ]
    const {
      fullData,
      row,
      datas,
      page,
      size,
      total,
      time,
      listState,
      search,
      selectedRow,
    } = this.state;

    // const dataSource = datas.map((i, idx) => {
    //   return { key: i.id, ...i };
    // });
    const dataSource = newDatas.map((i, idx) => {
      return { key: i.id, ...i };
    });
    console.log("data", datas, dataSource)
    return (
      <PageWrapper>
        {!!row && (
          <ModalReport
            row={row}
            onCancel={() => this.setState({ row: null })}
            columns={columns1}
            mapData={this.mapData}
            name={"Báo cáo tổng hợp sử dụng tem điện tử của tổ chức cá nhân"}
          />
        )}
        <PageTitleWrapper>
          Báo cáo tổng hợp sử dụng tem điện tử của tổ chức, cá nhân
        </PageTitleWrapper>

        <PageFormWrapper>
          <DataForm handleSearch={this.handleSearch} />
        </PageFormWrapper>
        <Row type="flex" justify="end" align="middle" gutter={20}>
          <Col style={{ flex: 1 }}>
            <PagePaginationWrapper>
              <Row type="flex" justify="end" gutter={10}>
                <Col style={{ flex: 1 }}>
                  <Pagination
                    page={page}
                    // total={total}
                    total={2} //test
                    time={time}
                    size={size}
                    listState={listState}
                    // loading={loading}
                    onChange={this.fetchData}
                  />
                </Col>
              </Row>
            </PagePaginationWrapper>
          </Col>
          <Col>
            <ButtonAnt
              text="Xuất excel"
              style={{ backgroundColor: "#70b603" }}
              onClick={() => this.onExportExcel()}
            />
          </Col>
        </Row>
        <PageTableWrapper>
          <TableReport
            getFieldDecorator={null}
            dataSource={dataSource}
            // onRow={(row, rowIndex) => ({
            //   onClick: this.onClickRow(row, rowIndex),
            // })}
            // rowClassName={this.rowClassName}
            startIndex={page * size}
            handleRender={this.handleRender}
          />
        </PageTableWrapper>
      </PageWrapper>
    );
  }
}

export default Page;
