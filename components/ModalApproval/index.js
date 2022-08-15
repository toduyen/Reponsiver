import { getRightApprovedList } from "actions";
import { Col, Form, Input, Radio, Row, Spin } from "antd";
import {
  PageInchargeContainer, PageInchargeFormItem, PageInchargeModal, PageInChargeRowList,
  PageInChargeTextArea, PageInChargeTitleWrapper
} from "components";
import { Tabs } from "components/Tabs";
import { withAuth, withConnect } from "hocs";
import { withRouter } from "next/router";
import React from "react";
import { Button as ButtonAnt } from "../patterns";

const { TabPane } = Tabs;
const { TextArea } = Input;

const TEXTAREA_COL = {
  colon: false,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  hasFeedback: true,
};

export const Approval /* <Tooltip title={i.name}> */ /* </Tooltip> */ =
  @withRouter
  @withAuth([], true)
  @withConnect((state) => ({
    loading: state.loading.isLoading,
    ...state.authReducer,
  }))
  class extends React.Component {
    ref = React.createRef();
    constructor(props) {
      super(props);
      this.state = {
        listManager: [],
        ndung: props.defaultNd,
      };
    }

    async componentDidMount() {
      const {
        code,
        dispatch,
        jwt,
        form: { setFieldsValue },
        defaultNd,
        user: { username },
      } = this.props;
      try {
        if (code) {
          const response = await dispatch(getRightApprovedList(jwt, code));
          if (!response) {
            return;
          }
          const listManager = response.data.filter(
            (el) => el.username !== username
          );
          this.setState({ listManager });
          setFieldsValue({
            ndung: defaultNd || "",
          });
        }
      } catch (error) {}
    }

    onSubmit = (e) => {
      const {
        handleSubmit,
        form: { validateFields },
      } = this.props;
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          handleSubmit(values);
        }
      });
    };

    render() {
      const {
        isLoading,
        nameType,
        onCancelModal = () => {},
        form: { getFieldDecorator },
        hiddenApprovalContent = false,
      } = this.props;
      const { listManager } = this.state;
      return (
        <PageInchargeModal
          centered
          {...this.props}
          width="40%"
          okText="Lưu"
          cancelText="Huỷ"
          footer={null}
          maskClosable={false}
          closable={false}
        >
          <Spin spinning={false} tip="Đang xử lý...">
            <PageInChargeTitleWrapper>
              {`Trình ${nameType} ${
                nameType === "phê duyệt" ? "" : "phê duyệt"
              }`}
            </PageInChargeTitleWrapper>

            <Form labelAlign="left">
              <PageInchargeContainer>
                <Row>
                  <Col>
                    <h3>
                      Danh sách {nameType}{" "}
                      <span style={{ color: "red" }}>(*)</span>
                    </h3>
                  </Col>
                  <Col span={24}>
                    <PageInchargeFormItem>
                      {getFieldDecorator(`selected`, {
                        rules: [
                          {
                            required: true,
                            message: `Bạn chưa chọn ${nameType} phê duyệt`,
                          },
                        ],
                      })(
                        <Radio.Group className="form-radio-group">
                          <PageInChargeRowList gutter={[100, 12]}>
                            {listManager.map((i) => (
                              <Col span={8}>
                                {}
                                <Radio value={i.username}>
                                  {i?.name || i?.fullName}
                                </Radio>
                                {}
                              </Col>
                            ))}
                          </PageInChargeRowList>
                        </Radio.Group>
                      )}
                    </PageInchargeFormItem>
                  </Col>
                </Row>
                <Row hidden={hiddenApprovalContent}>
                  <Col>
                    <h3>
                      Nội dung phê duyệt{" "}
                      <span style={{ color: "red" }}>(*)</span>
                    </h3>
                  </Col>

                  <Col>
                    <PageInchargeFormItem>
                      {getFieldDecorator(`ndung`, {
                        rules: [
                          {
                            required: !hiddenApprovalContent,
                            message: "Bạn chưa nhập nội dung phê duyệt.",
                          },
                        ],
                      })(<PageInChargeTextArea rows={4} />)}
                    </PageInchargeFormItem>
                  </Col>
                </Row>
              </PageInchargeContainer>

              <Row
                type="flex"
                justify="center"
                gutter={20}
                style={{ margin: "10px 0px 10px 0px" }}
              >
                <Col>
                  <ButtonAnt
                    onClick={this.onSubmit}
                  >{`Trình ${nameType}`}</ButtonAnt>
                </Col>
                <Col>
                  <ButtonAnt onClick={() => onCancelModal()}>Hủy</ButtonAnt>
                </Col>
              </Row>
            </Form>
          </Spin>
        </PageInchargeModal>
      );
    }
  };

export const ModalApproval = Form.create({})(Approval);
