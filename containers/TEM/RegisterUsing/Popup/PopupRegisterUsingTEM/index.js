import { getTEMUsingDetail } from "actions";
import { Col, Form, Row } from "antd";
import {
  FormInputsWrapper,
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTitleWrapper,
} from "components";
import {
  AlignBottomItem,
  BorderBottomDatePicker,
  BorderBottomInput,
  BorderBottomSelect,
  CurrencyInput,
} from "components/patterns";
import { LOAI_DK, TTXLY_TEM } from "consts";
import { withConnect } from "hocs";
import moment from "moment";
import React from "react";
import { normalizeCurrency } from "utils";

const { Option } = BorderBottomSelect;

const SPAN = {
  24: {
    colon: false,
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
    // hasFeedback: true,
  },
  12: {
    colon: false,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    // hasFeedback: true,
  },
  8: {
    colon: false,
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
    // hasFeedback: true,
  },
};

@withConnect((state) => ({ ...state.authReducer }))
class Popup extends React.Component {
  async componentDidMount() {
    const { dispatch, jwt } = this.props;
    const {
      selectedRow,
      form: { setFieldsValue },
    } = this.props;
    if (selectedRow) {
      const data = await dispatch(getTEMUsingDetail(jwt, selectedRow));
      console.log("Popup -> componentDidMount -> data", data);
      if (data) {
        setFieldsValue({
          ...data,
        });
      }
    }
  }

  validatorMST = (rule, value, cb) => {
    if (!value) {
      return cb("Bạn chưa nhập mã số thuế.");
    }
    if (this.mstMessage) {
      return cb(this.mstMessage);
    }
    return cb();
  };

  renderDatePicker = ({ label, key, rules = [], span = SPAN[12] }) => {
    const { form, unfix } = this.props;
    const { getFieldDecorator } = form;
    if (label.includes("(*)")) {
      rules = [
        {
          required: true,
          message: `Bạn chưa chọn ${label
            .split("(*)")[0]
            .trim()
            .toLowerCase()}.`,
        },
      ];
    }
    return (
      <Col span={span}>
        <AlignBottomItem label={label} {...SPAN[span]}>
          {getFieldDecorator(key, {
            rules,
          })(
            unfix ? (
              <BorderBottomDatePicker open={false} allowClear={false} />
            ) : (
              <BorderBottomDatePicker />
            )
          )}
        </AlignBottomItem>
      </Col>
    );
  };

  renderInput = ({
    label,
    key,
    rules = [],
    span = SPAN[12],
    readOnly = false,
    normalize,
    validator,
    ...props
  }) => {
    const { form, unfix } = this.props;
    const { getFieldDecorator } = form;
    if (label.includes("(*)")) {
      rules = [
        {
          required: !validator,
          message: `Bạn chưa nhập ${label
            .split("(*)")[0]
            .trim()
            .toLowerCase()}.`,
        },
        { validator },
      ];
    }
    return (
      <Col span={span}>
        <AlignBottomItem
          label={label}
          {...SPAN[span]}
          style={key === "cqthue" && { marginBottom: 0 }}
        >
          {getFieldDecorator(key, {
            normalize,
            rules,
          })(<BorderBottomInput readOnly={unfix || readOnly} {...props} />)}
        </AlignBottomItem>
      </Col>
    );
  };

  renderInputNumber = ({ label, key, rules = [], span, readOnly = false }) => {
    const { form, unfix } = this.props;
    const { getFieldDecorator } = form;
    if (label.includes("(*)")) {
      rules = [
        {
          required: true,
          message: `Bạn chưa nhập ${label
            .split("(*)")[0]
            .trim()
            .toLowerCase()}.`,
        },
      ];
    }
    return (
      <Col span={span}>
        <AlignBottomItem label={label} {...SPAN[span]}>
          {getFieldDecorator(key, {
            normalize: normalizeCurrency(21, 6),
            rules,
          })(<CurrencyInput readOnly={unfix || readOnly} />)}
        </AlignBottomItem>
      </Col>
    );
  };

  render() {
    const {
      title,
      unfix,
      form,
      form: { getFieldDecorator },
      renderBtn = () => {},
    } = this.props;

    return (
      <PageInchargeModal
        visible
        centered
        width="85%"
        footer={null}
        // onCancel={onCancel}
        closable={false}
      >
        <PageInChargeTitleWrapper className="title-search">
          {title}
        </PageInChargeTitleWrapper>

        <PageInchargeContainer>
          <FormInputsWrapper>
            <Form className="cni-popup" labelAlign="left" colon={false}>
              <Row gutter={20}>
                <Col span={24}>
                  <AlignBottomItem label="Loại đăng ký" {...SPAN[24]}>
                    {getFieldDecorator(`loaiDk`, { initialValue: 0 })(
                      <BorderBottomSelect open={false} allowClear={false}>
                        {Object.entries(LOAI_DK).map(([key, value]) => (
                          <Option key={key} value={+key}>
                            {value}
                          </Option>
                        ))}
                      </BorderBottomSelect>
                    )}
                  </AlignBottomItem>
                </Col>
                {this.renderInput({
                  label: "Mã số thuế",
                  key: "mst",
                  span: 12,
                  onBlur: this.onBlurMST,
                  validator: this.validatorMST,
                  normalize: (value, preValue) =>
                    /^[-\d]*$/.test(value) ? value : preValue,
                  maxLength: 14,
                })}
                {this.renderInput({
                  label: "Tên",
                  key: "ten",
                  span: 12,
                  maxLength: 100,
                })}
                {this.renderInput({
                  label: "Mã CQT",
                  key: "maCqt",
                  span: 12,
                  maxLength: 100,
                })}
                {this.renderInput({
                  label: "Tên CQT",
                  key: "tenCqt",
                  span: 12,
                  maxLength: 100,
                })}
                {this.renderInput({
                  label: "Ngày gửi",
                  key: "ngayGui",
                  span: 12,
                })}
                {this.renderInput({
                  label: "Số giấy phép",
                  key: "soGiayPhep",
                  span: 12,
                })}
                {this.renderInputNumber({
                  label: "Sản lượng",
                  key: "sanLuong",
                  span: 12,
                })}
                {this.renderInput({
                  label: "Thời hạn",
                  key: "thoiHan",
                  span: 12,
                })}
                {/* <Col span={12}>
                  <AlignBottomItem label="Loại ấn chỉ" {...SPAN[12]}>
                    {getFieldDecorator(`loaiAnChi`, { initialValue: "0" })(
                      <BorderBottomSelect open={false} allowClear={false}>
                        {Object.entries(LOAI_DK).map(([key, value]) => (
                          <Option key={key} value={key}>
                            {value}
                          </Option>
                        ))}
                      </BorderBottomSelect>
                    )}
                  </AlignBottomItem>
                </Col> */}
                <Col span={12}>
                  <AlignBottomItem label="Trạng thái" {...SPAN[12]}>
                    {getFieldDecorator(`trangThai`, { initialValue: 0 })(
                      <BorderBottomSelect open={false} allowClear={false}>
                        {Object.entries(TTXLY_TEM).map(([key, value]) => (
                          <Option key={key} value={+key}>
                            {value}
                          </Option>
                        ))}
                      </BorderBottomSelect>
                    )}
                  </AlignBottomItem>
                </Col>
                {this.renderInput({
                  label: "Năm",
                  key: "nam",
                  span: 12,
                  maxLength: 10,
                })}
              </Row>
              {renderBtn(form)}
            </Form>
          </FormInputsWrapper>
        </PageInchargeContainer>
      </PageInchargeModal>
    );
  }
}

export default Form.create()(Popup);
