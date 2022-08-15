import { getCDCKS, getHTCKS, layoutToggleLoading } from "actions";
import { Col, Form, Row, Spin } from "antd";
import {
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTextArea,
  PageInChargeTitleWrapper,
} from "components";
import { withConnect } from "hocs";
import React from "react";
import {
  AlignBottomItem,
  BorderBottomSelect,
  Button as ButtonAnt,
  BorderBottomInput,
} from "../patterns";

const ITEM_COL = {
  colon: false,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // hasFeedback: true,
};
const ITEM_COL_CHILD = {
  colon: false,
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
  // hasFeedback: true,
};

@withConnect((state) => ({
  ...state.authReducer,
}))
class Reject extends React.Component {
  ref = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      ndung: props.defaultNd,
      cdcks: [],
      htcks: [],
    };
  }

  componentDidMount() {
    const {
      sign,
      jwt,
      dispatch,
      form: { validateFields },
    } = this.props;
    if (sign) {
      dispatch(layoutToggleLoading(true));
      Promise.all([getCDCKS(jwt), getHTCKS(jwt)])
        .then((result) => {
          dispatch(layoutToggleLoading(false));
          this.setState({
            cdcks: result[0].datas,
            htcks: result[1].datas,
          });
        })
        .catch((err) => { });
    }
    validateFields(["cdanh"]);
  }

  onSubmit = (e) => {
    const {
      sign,
      handleSubmit,
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (sign) {
          let objHT = this.state.htcks.find(item => item.ma === values.hthuc)
          if (objHT) {
            const hinhThuc = objHT.ten
            handleSubmit({ ...values, hinhThuc });
          } else handleSubmit({ ...values, hinhThuc: 'Tự ký' });
        } else handleSubmit(values);

      }
    });
  };

  render() {
    const {
      titlePopup = "Từ chối phê duyệt",
      onCancelModal = () => { },
      form: {
        getFieldDecorator,
        getFieldValue,
        validateFields,
        setFieldsValue,
      },
      reject,
      defaultContent = "",
      noContent = false,
      sign,
      user: { cdanh },
    } = this.props;
    const { cdcks, htcks } = this.state;

    const hthuc = getFieldValue("hthuc");

    return (
      <PageInchargeModal
        centered
        {...this.props}
        visible
        width="40%"
        okText="Lưu"
        cancelText="Huỷ"
        footer={null}
        maskClosable={false}
        closable={false}
      >
        <Spin spinning={false} tip="Đang xử lý...">
          <PageInChargeTitleWrapper>{`${titlePopup}`}</PageInChargeTitleWrapper>
          <Form labelAlign="left">
            <PageInchargeContainer>
              {sign && (
                <Row>
                  <Col>
                    <AlignBottomItem label="Chức danh (*)" bold {...ITEM_COL}>
                      {getFieldDecorator(`cdanh`, {
                        // initialValue: cdanh || "",
                        rules: [
                          {
                            required: true,
                            message: "Bạn chưa cấu hình chức danh.",
                          },
                        ],
                      })(
                        <BorderBottomSelect
                        >
                          {cdcks.map((item) => (
                            <BorderBottomSelect.Option
                              key={item.ma}
                              value={item.ten}
                            >
                              {item.ten}
                            </BorderBottomSelect.Option>
                          ))}
                        </BorderBottomSelect>
                      )}
                    </AlignBottomItem>
                  </Col>
                  <Col span={hthuc ? 16 : 24}>
                    <AlignBottomItem
                      label="Hình thức"
                      bold
                      colon={false}
                      labelCol={{ span: hthuc ? 9 : 6 }}
                      wrapperCol={{ span: hthuc ? 15 : 18 }}
                    >
                      {getFieldDecorator(`hthuc`, {
                        initialValue: "",
                        rules: [
                          {
                            required: false,
                            message: "Bạn chưa chọn hình thức.",
                          },
                        ],
                      })(
                        <BorderBottomSelect
                          onSelect={() => {
                            if (!hthuc) {
                              setFieldsValue({ cduquyen: "" });
                            }
                            setTimeout(() => {
                              validateFields(["cduquyen"]);
                            }, 0);
                          }}
                        >
                          <BorderBottomSelect.Option value={""}>
                            Tự ký
                          </BorderBottomSelect.Option>
                          {htcks.map((item) => (
                            <BorderBottomSelect.Option
                              key={item.ma}
                              value={item.ma}
                            >
                              {item.ten}
                            </BorderBottomSelect.Option>
                          ))}
                        </BorderBottomSelect>
                      )}
                    </AlignBottomItem>
                  </Col>
                  <Col span={8} hidden={!hthuc}>
                    <AlignBottomItem label="" bold {...ITEM_COL_CHILD}>
                      {getFieldDecorator(`cduquyen`, {
                        initialValue: "",
                        rules: [
                          {
                            required: !!hthuc,
                            message: "Bạn chưa chọn chức danh.",
                          },
                        ],
                      })(
                        <BorderBottomSelect>
                          <BorderBottomSelect.Option value={""}>
                            Chọn
                          </BorderBottomSelect.Option>
                          {cdcks.map((item) => (
                            <BorderBottomSelect.Option
                              key={item.ma}
                              value={item.ten}
                            >
                              {item.ten}
                            </BorderBottomSelect.Option>
                          ))}
                        </BorderBottomSelect>
                      )}
                    </AlignBottomItem>
                  </Col>
                </Row>
              )}
              {!noContent && (
                <Col>
                  <h3>
                    Nội dung {reject ? "từ chối" : "phê duyệt"}{" "}
                    <span style={{ color: "red" }}>(*)</span>
                  </h3>
                </Col>
              )}

              {!noContent && (
                <Col>
                  <Form.Item>
                    {getFieldDecorator(`pdndung`, {
                      initialValue: defaultContent,
                      rules: [
                        {
                          required: true,
                          message: `Bạn chưa nhập nội dung ${sign ? "ký duyệt" : reject ? "từ chối" : "phê duyệt"
                            }.`,
                        },
                      ],
                    })(<PageInChargeTextArea rows={4} />)}
                  </Form.Item>
                </Col>
              )}
            </PageInchargeContainer>

            <Row
              type="flex"
              justify="center"
              gutter={20}
              style={{ margin: "10px 0px 10px 0px" }}
            >
              <Col>
                <ButtonAnt
                  // htmlType="submit"
                  onClick={this.onSubmit}
                >
                  {sign ? "Ký duyệt" : reject ? "Từ chối" : "Phê duyệt"}
                </ButtonAnt>
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
}

export const ModalReject = Form.create({})(Reject);
