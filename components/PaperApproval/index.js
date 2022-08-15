import { getKBHInfo } from "actions";
import { Col, Form, Input, Row, Spin } from "antd";
import {
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTitleWrapper,
} from "components";
import { BorderBottomInput, Button as ButtonAnt } from "components/patterns";
import { AlignBottomItem } from "components/patterns/formlable";
import { withAuth, withConnect } from "hocs";
import { withRouter } from "next/router";
import React, { Component } from "react";
import { FormWrapper } from "./styles";

const { TextArea } = Input;

const FULL_WIDTH_COL = {
  colon: false,
  labelCol: { span: 12 },
  wrapperCol: { span: 6 },
  hasFeedback: true,
};

const WIDTH_COL = {
  colon: false,
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
  hasFeedback: true,
};

@withRouter
@withAuth([], true)
@withConnect((state) => ({
  loading: state.loading.isLoading,
  ...state.authReducer,
}))
class PaperApproval extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: false,
      dataKBH: [],
    };
  }

  async componentDidMount() {
    const { dispatch, jwt } = this.props;

    try {
      const { data } = await dispatch(getKBHInfo(jwt));

      this.setState({ dataKBH: data });
    } catch (error) {
      // notification.errorStrict(error);
    }
  }

  handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const { onApprove } = this.props;

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let clonedValues = {
          ...values,
          sbt: values?.sbt || 0,
        };

        onApprove(clonedValues);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      cancel,
      isVisible = true,
    } = this.props;
    const { showLoading, dataKBH } = this.state;

    return (
      <PageInchargeModal
        visible={isVisible}
        onCancel={cancel}
        footer={null}
        width="40%"
        maskClosable={false}
        centered
        closable={false}
      >
        <Spin spinning={showLoading} tip="Đang xử lý...">
          <PageInChargeTitleWrapper>
            Nhập số để ký ban hành
          </PageInChargeTitleWrapper>

          <PageInchargeContainer>
            <Row type="flex" justify="center">
              <FormWrapper xs={24} sm={24} md={24} lg={22}>
                <Form
                  labelAlign="left"
                  onSubmit={this.handleSubmit}
                  className="error-invoice-refecting-form"
                >
                  <Row gutter={36} align="bottom" className="require-item">
                    <Col span={24}>
                      <AlignBottomItem
                        label={
                          <span style={{ fontWeight: "bold" }}>
                            Nhập số thông báo bắt đầu
                          </span>
                        }
                        {...WIDTH_COL}
                      >
                        {getFieldDecorator(`sbt`, {
                          // normalize: (value) =>
                          //   (value || "").replace(/\D/g, ""),
                          rules: [
                            {
                              required: true,
                              message: "Bạn chưa nhập số thông báo",
                            },
                          ],
                        })(<BorderBottomInput />)}
                      </AlignBottomItem>
                    </Col>
                  </Row>

                  {/* <Row gutter={36} align="bottom">
                  <Col span={24}>
                    <AlignBottomItem
                      label={
                        <span style={{ fontWeight: "bold" }}>
                          Địa danh
                        </span>
                      }
                      {...WIDTH_COL}
                    >
                      {getFieldDecorator(`ddanh`, {
                        initialValue: dataKBH?.ddanh
                      })(
                        <BorderBottomInput readOnly />
                      )}
                    </AlignBottomItem>
                  </Col>
                </Row> */}

                  {/* <Row gutter={36} align="bottom">
                    <Col span={24}>
                      <AlignBottomItem
                        label={
                          <span style={{ fontWeight: "bold" }}>
                            Hậu tố thông báo
                          </span>
                        }
                        {...WIDTH_COL}
                      >
                        {getFieldDecorator(`hhtbao`, {
                          initialValue: dataKBH?.httbao || "",
                          rules: [
                            {
                              required: true,
                              // message: "Văn thư chưa cấu hình hậu tố thông báo",
                              message: "Bạn chưa nhập hậu tố thông báo",
                            },
                          ],
                        })(<BorderBottomInput readOnly={false} />)}
                      </AlignBottomItem>
                    </Col>
                  </Row> */}

                  <Row
                    type="flex"
                    justify="center"
                    style={{ marginTop: "10px" }}
                    gutter={20}
                  >
                    <Col>
                      <ButtonAnt htmlType="submit" onClick={this.handleSubmit}>
                        Ký ban hành
                      </ButtonAnt>
                    </Col>
                    <Col>
                      <ButtonAnt onClick={() => cancel()}>Hủy</ButtonAnt>
                    </Col>
                  </Row>
                </Form>
              </FormWrapper>
            </Row>
          </PageInchargeContainer>
        </Spin>
      </PageInchargeModal>
    );
  }
}

export default Form.create()(PaperApproval);
