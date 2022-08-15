import React, { Component } from "react";
import {
  Modal,
  PageFormWrapper,
  PageTableWrapper,
  PagePaginationWrapper,
} from "components";
import { FormWrapper, TableWrapper, PageIndex } from "./styles";
import { Col, Form, Row, Select } from "antd";
import { withConnect, withAuth } from "hocs";
import { withRouter } from "next/router";

import {
  AlignBottomItem,
  BorderBottomInput,
  BorderBottomSelect,
  Button,
  ButtonAnt,
  ColLabel,
} from "components/patterns";
import {
  FormInputsWrapper,
  FormTitleWrapper,
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTitleWrapper,
} from "components";
import { getCQT } from "actions/hoa-don-sai-sot";
import { checkingCQT } from "utils/helper";
import { ExecutiveTable } from "./Table";
import { getMergedUsers, layoutToggleLoading } from "actions";
import _ from "lodash";

const { Option } = BorderBottomSelect;
const { Option: AntOption } = Select;

const ITEM_COL = {
  colon: false,
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
  hasFeedback: true,
};

const CHILD_ITEM_COL = {
  colon: false,
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
  hasFeedback: true,
};

@withRouter
@withAuth([], true)
@withConnect((state) => ({
  loading: state.loading.isLoading,
  ...state.authReducer,
}))
class ExecutiveSelectPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      disabledLoad: false,
      size: 10,
      total: 0,
      datas: [],
      time: 0,
      stateList: [],
      onSelectRow: null,
      reload: false,
      tableData: [
        {
          id: "001",
          tdn: "anhpd2",
          tnd: "Duy Anh 2",
        },
        {
          id: "002",
          tdn: "anhpd3",
          tnd: "Duy Anh 3",
        },
      ],
    };
  }

  componentDidMount() {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
      cqtCode,
      cqtName
    } = this.props;

    if (cqtName) setFieldsValue({ group_id: cqtName });
  }

  handleSearching = async (e) => {
    if (e) e.preventDefault();

    const { dispatch, jwt, cqtCode, popupType } = this.props;
    const { size } = this.state;

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // Object.keys(values).forEach((key) => {
        //   if (["qdngay=ge", "qdngay=le", "tngay", "dngay"].includes(key)) {
        //     values[key] = values[key] ? moment(values[key]).toJSON() : null;
        //   }
        // });
        const search = _.pickBy(values, _.identity);
        search.group_id = cqtCode;

        dispatch(layoutToggleLoading(true));

        const param = {
          search,
          size,
        };
        if (popupType === "ld") {
          param.type = "ld";
        }

        try {
          let {
            datas = [],
            state,
            total,
            time,
          } = await dispatch(getMergedUsers(jwt, param));

          // const dataSource = this.mapDataWithKey(datas);

          this.setState(
            {
              datas,
              stateList: [state],
              page: 0,
              search,
              total,
              time,
              reload: false,
              selectedRowKeys: [],
            },
            () => {
              dispatch(layoutToggleLoading(false));
            }
          );
        } catch (e) {
          dispatch(layoutToggleLoading(false));
        }
      }
    });
  };

  resetForm = () => {
    const {
      form: { setFieldsValue },
    } = this.props;

    setFieldsValue({ username: '', name: '' });
    this.handleSearching();
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
    } = this.props;

    return (
      <Row type="flex" justify="center">
        <PageFormWrapper style={{ width: "100%" }}>
          <FormWrapper xs={24} sm={24} md={24} lg={22}>
            <Form
              labelAlign="left"
              style={{ paddingLeft: 0 }}
              onSubmit={this.handleSearching}
            >
              <Row align="bottom">
                <Col span={24}>
                  <AlignBottomItem label={"Cơ quan thuế"} {...ITEM_COL}>
                    {getFieldDecorator(`group_id`, {})(<BorderBottomInput readOnly />)}
                  </AlignBottomItem>
                </Col>
              </Row>

              <Row align="bottom">
                <Col span={24}>
                  <AlignBottomItem label={"Tên đăng nhập"} {...ITEM_COL}>
                    {getFieldDecorator(`username`, {
                      rules: [],
                    })(<BorderBottomInput />)}
                  </AlignBottomItem>
                </Col>
              </Row>

              <Row align="bottom">
                <Col span={24}>
                  <AlignBottomItem label={"Tên người dùng"} {...ITEM_COL}>
                    {getFieldDecorator(`name`, {
                      rules: [],
                    })(<BorderBottomInput />)}
                  </AlignBottomItem>
                </Col>
              </Row>

              <Row
                type="flex"
                justify="center"
                gutter={50}
                style={{ margin: "10px 0" }}
              >
                <Col>
                  <Button htmlType="submit">Tìm kiếm</Button>
                </Col>
                <Col>
                  <Button onClick={() => this.resetForm()}>Bỏ tìm kiếm</Button>
                </Col>
              </Row>
            </Form>
          </FormWrapper>
        </PageFormWrapper>
      </Row>
    );
  };

  renderFooter = () => {
    const { onClose, getExecutive, popupType } = this.props;
    const { onSelectRow } = this.state;

    return (
      <Row
        type="flex"
        justify="center"
        gutter={50}
        style={{ margin: "20px 0" }}
      >
        <Col>
          <Button
            onClick={() => {
              getExecutive(onSelectRow, popupType);
              onClose();
            }}
          >
            Cập nhật
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onClose()}>Đóng</Button>
        </Col>
      </Row>
    );
  };

  handleLoad =
    (type = "next") =>
    (action = "") => {
      let { dispatch, jwt } = this.props;
      let { stateList, page, search, size, datas } = this.state;

      let index;
      if (type === "next") index = page;
      if (type === "current") index = page - 1;
      if (type === "prev") index = page - 2;

      if (action === "insert") index = -1;

      dispatch(layoutToggleLoading(true));

      this.setState(
        {
          disabledLoad: true,
        },
        async () => {
          try {
            let {
              datas = [],
              state,
              total,
              time,
            } = await dispatch(
              getMergedUsers(jwt, {
                search,
                state: stateList[index],
                size,
              })
            );

            if (type === "next") stateList[page + 1] = state;
            this.setState(
              {
                datas,
                stateList,
                insertState: false,
                page:
                  action === "insert"
                    ? 0
                    : type === "next"
                    ? page + 1
                    : type === "current"
                    ? page
                    : page - 1,
                total,
                time,
              },
              () => dispatch(layoutToggleLoading(false))
            );
          } finally {
            this.setState(
              { disabledLoad: false, insertState: false, selectedRowKeys: [] },
              () => dispatch(layoutToggleLoading(false))
            );
          }
          if (type === "current" && index >= 0 && datas.length === 0) {
            return this.handleLoad("prev")();
          }
        }
      );
    };

  renderTotalItem = () => {
    const { total } = this.state;

    return (
      <Col>
        <div>
          <span>
            {`Có ${(total || "0")
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kết quả`}
          </span>
        </div>
      </Col>
    );
  };

  renderOptions = () => {
    return (
      <PagePaginationWrapper>
        <Row type="flex" justify="space-between" gutter={10}>
          {this.renderTotalItem()}

          <Col>
            <Row type="flex" gutter={10} style={{ alignItems: "center" }}>
              {this.renderPagination()}
            </Row>
          </Col>
        </Row>
      </PagePaginationWrapper>
    );
  };

  renderPagination = () => {
    const { page, total, size, disabledLoad, time, stateList, search } =
      this.state;
    const totalPage = Math.ceil(total / size);

    return (
      <>
        <Col>
          <ButtonAnt
            icon="left"
            type="primary"
            disabled={
              disabledLoad || page === 0 || (page !== 1 && !stateList[page - 2])
            }
            onClick={this.handleLoad("prev")}
          />
        </Col>
        <Col>
          <PageIndex>{`${page + 1} / ${totalPage || 1}`}</PageIndex>
        </Col>
        <Col>
          <ButtonAnt
            icon="right"
            type="primary"
            disabled={
              page + 1 === totalPage || disabledLoad || !stateList[page]
            }
            onClick={this.handleLoad("next")}
          />
        </Col>
        <Col>
          <Select
            value={size}
            // onChange={this.handleChangePageSize}
            disabled={total <= 0}
          >
            <AntOption value={15}>15</AntOption>
            <AntOption value={30}>30</AntOption>
            <AntOption value={50}>50</AntOption>
          </Select>
        </Col>
      </>
    );
  };

  renderTable = () => {
    const { onSelectRow, tableData, datas } = this.state;

    return (
      <PageTableWrapper>
        <TableWrapper>
          <ExecutiveTable
            dataSource={datas}
            onRow={(row) => {
              return {
                onClick: () => {
                  this.setState({
                    onSelectRow: row,
                  });
                },
              };
            }}
            rowClassName={(record, index) =>
              onSelectRow?.username == record?.username && "ant-selected-row"
            }
          />
        </TableWrapper>
      </PageTableWrapper>
    );
  };

  render() {
    return (
      <Modal
        centered
        visible={true}
        width="50%"
        footer={null}
        maskClosable={false}
      >
        <div style={{ background: "#fff", padding: "10px 0" }}>
          <PageInChargeTitleWrapper>Tìm kiếm cán bộ</PageInChargeTitleWrapper>
          <PageInchargeContainer>
            {this.renderForm()}
            {this.renderOptions()}
            {this.renderTable()}
            {this.renderFooter()}
          </PageInchargeContainer>
        </div>
      </Modal>
    );
  }
}

export default Form.create()(ExecutiveSelectPopup);
