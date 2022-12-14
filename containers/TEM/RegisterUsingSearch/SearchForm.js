import { Col, Form, Row } from "antd";
import {
  AlignBottomItem,
  BorderBottomInput,
  BorderBottomSelect,
  ButtonAnt,
  ColLabel,
} from "components/patterns";
import { BorderBottomDatePicker } from "components/patterns/DatePicker";
import { LOAI_DK, TTXLY_TEM } from "consts/convention";
import _ from "lodash";
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
        values.loaiDk = values.loaiDk ? [+values.loaiDk] : [0, 1];
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
          <AlignBottomItem label="T??? ng??y" {...col}>
            {getFieldDecorator(key1, {
              initialValue: moment().add(-1, "months"),
              rules: [
                {
                  required: true,
                  message: "B???n ch??a ch???n ng??y",
                },
              ],
            })(
              <BorderBottomDatePicker
                placeholder="Ch???n ng??y"
                disabledDate={disabledFromDate(getFieldValue(key2))}
              />
            )}
          </AlignBottomItem>
        </Col>
        <Col span={9}>
          <AlignBottomItem label="?????n ng??y" {...col}>
            {getFieldDecorator(key2, {
              initialValue: moment(),
              rules: [
                {
                  required: true,
                  message: "B???n ch??a ch???n ng??y",
                },
              ],
            })(
              <BorderBottomDatePicker
                placeholder="Ch???n ng??y"
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
            <AlignBottomItem label="M?? s??? thu???" {...ITEM_COL}>
              {getFieldDecorator(`mst`, {
                initialValue: "",
                normalize: (value, preValue) =>
                  /^[0-9-]*$/.test(value) ? value : preValue,
                rules: [
                  {
                    required: false,
                    message: "B???n ch??a nh???p m?? s??? thu???",
                  },
                ],
              })(<BorderBottomInput maxLength={14} />)}
            </AlignBottomItem>
          </Col>
          <Col span={12}>
            {this.datePickerField("Ng??y g???i", "tuNgayGui", "denNgayGui")}
          </Col>
          <Col span={12}>
            <AlignBottomItem label="Lo???i ????ng k??" {...ITEM_COL}>
              {getFieldDecorator(`loaiDk`, {
                initialValue: "",
                rules: [
                  // {
                  //   required: true,
                  //   message: "B???n ch??a ch???n lo???i ????ng k??",
                  // },
                ],
              })(
                <BorderBottomSelect>
                  <Option value="">T???t c???</Option>
                  {Object.entries(LOAI_DK).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value}
                    </Option>
                  ))}
                </BorderBottomSelect>
              )}
            </AlignBottomItem>
          </Col>
          <Col span={12}>
            <AlignBottomItem label="Tr???ng th??i" {...ITEM_COL}>
              {getFieldDecorator(`trangThai`, {
                initialValue: "",
                rules: [],
              })(
                <BorderBottomSelect>
                  <Option value={""}>Ch???n</Option>
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
            <ButtonAnt htmlType="submit" text="T??m ki???m" />
          </Col>
          <Col>
            <ButtonAnt onClick={this.handleCancelSearch} text="B??? t??m ki???m" />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
