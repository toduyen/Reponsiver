import { Col, Form, Row } from "antd";
import {
  AlignBottomItem,
  BorderBottomInput,
  BorderBottomSelect,
  ButtonAnt,
  ColLabel,
} from "components/patterns";
import { BorderBottomDatePicker } from "components/patterns/DatePicker";
import { TTXLY_TEM } from "consts/convention";
import moment from "moment";
import "moment-timezone";
import React from "react";
import { disabledFromDate, disabledToDate } from "utils/helper";

const { Option } = BorderBottomSelect;

const ITEM_COL = {
  colon: false,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // hasFeedback: true,
};

const TTXLY = [0, 1, 2, 3, 4, 5, 6];

class SearchForm extends React.Component {
  componentDidMount() {
    this.onSubmit();
  }

  onSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.tuNgayGui = values.tuNgayGui
          ? values.tuNgayGui.format("YYYY-MM-DD")
          : "";
        values.denNgayGui = values.denNgayGui
          ? values.denNgayGui.format("YYYY-MM-DD")
          : "";
        values.trangThai = values.trangThai ? [+values.trangThai] : TTXLY;
        const data = Object.entries(values).reduce((prev, [key, value]) => {
          if (value || value === 0) {
            return { ...prev, [key]: value };
          }
          return prev;
        }, {});
        console.log("SearchForm -> onSubmit -> data", data);
        this.props.handleSearch(data);
      }
    });
  };

  handleCancelSearch = () => {
    this.props.form.resetFields();
    this.onSubmit();
  };

  datePickerField(title, key1, key2) {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const col = {
      colon: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Row gutter={20}>
        <ColLabel span={6}>
          <label>{title}</label>
        </ColLabel>
        <Col span={9}>
          <AlignBottomItem label="Từ ngày" {...col}>
            {getFieldDecorator(key1, {
              initialValue: moment().add(-1, "months"),
              rules: [
                {
                  required: true,
                  message: "Bạn chưa chọn ngày",
                },
              ],
            })(
              <BorderBottomDatePicker
                placeholder="Chọn ngày"
                disabledDate={disabledFromDate(getFieldValue(key2))}
              />
            )}
          </AlignBottomItem>
        </Col>
        <Col span={9}>
          <AlignBottomItem label="Đến ngày" {...col}>
            {getFieldDecorator(key2, {
              initialValue: moment(),
              rules: [
                {
                  required: true,
                  message: "Bạn chưa chọn ngày",
                },
              ],
            })(
              <BorderBottomDatePicker
                placeholder="Chọn ngày"
                disabledDate={disabledToDate(getFieldValue(key1))}
              />
            )}
          </AlignBottomItem>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form labelAlign="left" onSubmit={this.onSubmit}>
        <Row gutter={36} align="bottom">
          <Col span={12}>
            <AlignBottomItem label="Mã số thuế" {...ITEM_COL}>
              {getFieldDecorator(`mst`, {
                initialValue: "",
                normalize: (value, preValue) =>
                  /^[0-9-]*$/.test(value) ? value : preValue,
                rules: [
                  {
                    required: false,
                    message: "Bạn chưa nhập mã số thuế",
                  },
                ],
              })(<BorderBottomInput maxLength={14} />)}
            </AlignBottomItem>
          </Col>
          <Col span={12}>
            {this.datePickerField("Ngày gửi", "tuNgayGui", "denNgayGui")}
          </Col>
          <Col span={12}>
            <AlignBottomItem label="Trạng thái" {...ITEM_COL}>
              {getFieldDecorator(`trangThai`, {
                initialValue: "",
                rules: [],
              })(
                <BorderBottomSelect>
                  <Option value={""}>Chọn</Option>
                  {TTXLY.map((key) => (
                    <Option key={key} value={key}>
                      {TTXLY_TEM[key]}
                    </Option>
                  ))}
                </BorderBottomSelect>
              )}
            </AlignBottomItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={30}>
          <Col>
            <ButtonAnt htmlType="submit" text="Tìm kiếm" />
          </Col>
          <Col>
            <ButtonAnt onClick={this.handleCancelSearch} text="Bỏ tìm kiếm" />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
