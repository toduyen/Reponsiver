import { getAllCQBH, getAllOfficalCQBH } from "actions";
import { Col, Modal, Row, Form } from "antd";
import {
  FormWrapper,
  ModalContentWrapper,
  ModalHeaderWrapper,
  ModalTitleWrapper,
} from "components";
import {
  AlignBottomItem,
  BorderBottomInput,
  ButtonAnt,
  Pagination,
} from "components/patterns";
import { withAuth, withConnect } from "hocs";
import React, { Component } from "react";
import { TableAgencies } from "./TableAgencies";
import { isEmpty, toLower } from "lodash";
import { removeVietnameseTones } from "utils/helper";

const ITEM_COL = {
  colon: false,
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  // hasFeedback: true,
};

@withAuth([], true)
@withConnect((state) => ({
  ...state.authReducer,
}))
class PopUpSearch extends Component {
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
      selectedRow: {},
      filteredData: null,
      isSearch: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  onClickRow = (selectedRow, rowIndex) => (e) => {
    this.setState({ selectedRow });
  };
  rowClassName = (row, index) => {
    const { selectedRow } = this.state;
    return selectedRow.key === row.key && "ant-selected-row";
  };

  fetchData = async (state, page = 0, size = this.state.size) => {
    const { dispatch, jwt } = this.props;
    const { search, listState } = this.state;
    this.setState({ size });
    const param = {
      size,
      state,
      search,
      sort: {
        // ten: "DESC",
      },
    };
    const response = await dispatch(getAllOfficalCQBH(jwt, param));
    if (!response) {
      return;
    }
    this.setState({
      datas: response,
      isSearch: false,
    });
    // const { datas = [], state: newState, time, total } = response;
    // listState[page] = newState;
    // this.setState({
    //   datas,
    //   time,
    //   total,
    //   listState,
    //   page,
    //   selectedRow: {},
    // });
  };

  handleSearch = (search) => {
    const { datas } = this.state;
    if (isEmpty(search)) {
      this.fetchData();
      this.setState({ selectedRow: {} });
      return;
    }
    const filterData =
      !isEmpty(datas) &&
      datas.filter((item, index) =>
        toLower(removeVietnameseTones(item?.ten)).includes(
          toLower(removeVietnameseTones(search))
        )
      );
    this.setState({
      selectedRow: {},
      filteredData: filterData || [],
    });
  };

  handleCancelSearch = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    this.fetchData();
    this.setState({ selectedRow: {} });
    setFieldsValue({ ten: "" });
  };

  onSubmitSearch = () => {
    const {
      form: { getFieldValue },
    } = this.props;
    const ten = getFieldValue(`ten`) || "";
    this.setState(
      {
        isSearch: true,
      },
      this.handleSearch(ten)
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      setV,
      groupIdName,
    } = this.props;

    const { datas, page, size, isSearch, selectedRow, filteredData } =
      this.state;

    let tableData = isSearch ? filteredData : datas;

    const dataSource =
      tableData &&
      tableData.map((element) => ({
        key: element.matms,
        ...element,
      }));

    return (
      <>
        <Modal
          centered
          visible={true}
          onOk={() => {}}
          onCancel={onCancel}
          width="70%"
          className="modal-ant"
          footer={null}
        >
          <ModalHeaderWrapper>Cơ quan thuế</ModalHeaderWrapper>
          <FormWrapper>
            <>
              <ModalContentWrapper>
                <Row gutter={36} align="bottom">
                  <Col span={24}>
                    <AlignBottomItem label="Tên cơ quan thuế" {...ITEM_COL}>
                      {getFieldDecorator(`ten`, {
                        initialValue: groupIdName,
                        rules: [
                          {
                            required: false,
                            message: "Bạn chưa nhập cơ quan ban hành.",
                          },
                        ],
                      })(<BorderBottomInput />)}
                    </AlignBottomItem>
                  </Col>
                </Row>
              </ModalContentWrapper>
              <Row
                type="flex"
                justify="center"
                gutter={10}
                style={{ margin: "20px 0" }}
              >
                <Col>
                  <ButtonAnt
                    text="Tìm kiếm"
                    htmlType="button"
                    onClick={this.onSubmitSearch}
                  />
                </Col>
                <Col>
                  <ButtonAnt
                    text="Bỏ tìm kiếm"
                    onClick={this.handleCancelSearch}
                  />
                </Col>
              </Row>

              {/* <Row
                type="flex"
                justify="end"
                gutter={12}
                style={{ margin: "30px 0 5px 0" }}
              >
                <Col style={{ flex: 1, paddingLeft: -5 }}>
                  <Pagination
                    page={page}
                    total={total}
                    time={search ? time : 0}
                    size={size}
                    listState={listState}
                    // loading={loading}
                    onChange={this.fetchData}
                  />
                </Col>
              </Row> */}

              {/* <ModalTitleWrapper level={4}>Danh sách cục</ModalTitleWrapper> */}
              <TableAgencies
                dataSource={dataSource || []}
                locale={{ emptyText: "Không có dữ liệu hiển thị" }}
                onRow={(row, rowIndex) => ({
                  onClick: this.onClickRow(row, rowIndex),
                })}
                rowClassName={this.rowClassName}
                startIndex={page * size}
                maxHeight={360}
              />
              <Row
                type="flex"
                justify="center"
                gutter={10}
                style={{ margin: "20px 0" }}
              >
                <Col>
                  <ButtonAnt
                    text="Chọn"
                    disabled={isEmpty(selectedRow)}
                    onClick={() => {
                      setV(selectedRow);
                      onCancel();
                    }}
                  />
                </Col>
                <Col>
                  <ButtonAnt text="Đóng" onClick={onCancel} />
                </Col>
              </Row>
            </>
          </FormWrapper>
        </Modal>
      </>
    );
  }
}

export default Form.create()(PopUpSearch);
