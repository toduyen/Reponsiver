import {
  getChiCucThue,
  getCucThue,
  layoutToggleLoading,
  postNewReport,
} from "actions";
import { Col, Form, Row } from "antd";
import {
  AlignBottomItem,
  BorderBottomCheckbox,
  BorderBottomDatePicker,
  BorderBottomSelect,
  ButtonAnt,
  ColLabel,
} from "components/patterns";
import { HINH_THUC, TYPE_REPORT } from "consts";
import { withConnect } from "hocs";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import {
  onBlurDatePicker,
  removeAccents,
  validStartDate,
  validToDate,
} from "utils/helper";

const { Option } = BorderBottomSelect;

const ITEM_COL = {
  colon: false,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ITEM_COL_DATE_FT = {
  colon: false,
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@withConnect((state) => ({ ...state.authReducer }))
class ManagerSearchForm extends React.Component {
  state = {
    cucThue: {},
    chiCucThue: {},
    textSearch: "",
  };
  startDate = moment().add(-1, "month").add(1, "day");
  endDate = moment();

  componentDidMount() {
    const { jwt, dispatch } = this.props;
    dispatch(layoutToggleLoading(true));
    dispatch(getCucThue(jwt))
      .then((cucThue) => {
        this.setState({ cucThue });
        const keys = Object.keys(cucThue);
        if (keys.length === 1) {
          dispatch(getChiCucThue(jwt, { id: keys[0] })).then((chiCucThue) =>
            this.setState({ chiCucThue })
          );
        }
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  }

  onSearch = (textSearch = "") => {
    this.setState({ textSearch });
  };

  onSubmit = (e) => {
    e && e.preventDefault();
    const {
      dispatch,
      jwt,
      handleSearch,
      form: { validateFields },
    } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const {
          chiCucThue,
          cucThue,
          from,
          to,
          hthuc,
          // hkdoanh,
        } = values;
        const loai = chiCucThue
          ? "register-household-detail"
          : "register-household";
        const type = chiCucThue ? "detail" : "total";
        const param = {
          lbcao: "BCCTHKDDK",
          ten: "Báo cáo tổng hợp sử dụng tem điện tử của tổ chức cá nhân",
          loai,
          meta: JSON.stringify({
            cqt: chiCucThue || cucThue,
            from: from.startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
            to: moment(to)
              .add(1, "day")
              .startOf("day")
              .format("YYYY-MM-DDTHH:mm:ss"),
            type,
            hthuc: "1",
            // hkdoanh: hkdoanh ? "1" : "0",
          }),
        };
        const response = await dispatch(postNewReport(jwt, param));
        if (response) {
          handleSearch();
        }
      }
    });
  };

  handleCancelSearch = () => {
    this.props.form.resetFields();
    this.onSubmit();
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { cucThue, chiCucThue } = this.state;
    const entriesCucThue = Object.entries(cucThue)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([key, value]) => {
        if (key === "0") {
          return [key, value];
        }
        return [`'${key}'`, value];
      });
    const entriesChiCucThue = Object.entries(chiCucThue)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([key, value]) => {
        if (key === "0") {
          const arr = Object.keys(chiCucThue);
          arr.shift();
          return [arr.map((el) => `'${el}'`).join(","), value];
        }
        return [`'${key}'`, value];
      });

    return (
      <>
        <Form labelAlign="left" onSubmit={this.onSubmit}>
          <Row gutter={50} align="bottom" style={{display: "flex"}}>
            <Col span={16}>
              <Row gutter={32}>
                <Col span={10}>
                  <AlignBottomItem label="Từ ngày" {...ITEM_COL_DATE_FT}>
                    {getFieldDecorator(`from`, {
                      initialValue: this.startDate,
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa chọn ngày.",
                        },
                      ],
                    })(
                      <BorderBottomDatePicker
                        placeholder="Chọn ngày"
                        disabledDate={(current) =>
                          validStartDate(current, this.props.form, "to")
                        }
                        onBlur={onBlurDatePicker({
                          form: this.props.form,
                          key: "from",
                          keyChange: "to",
                          days: 30,
                        })}
                      />
                    )}
                  </AlignBottomItem>
                </Col>
                <Col span={10}>
                  <AlignBottomItem label="Đến ngày" {...ITEM_COL_DATE_FT}>
                    {getFieldDecorator(`to`, {
                      initialValue: this.endDate,
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa chọn ngày.",
                        },
                      ],
                    })(
                      <BorderBottomDatePicker
                        placeholder="Chọn ngày"
                        disabledDate={(current) =>
                          validToDate(current, this.props.form, "from")
                        }
                        onBlur={onBlurDatePicker({
                          form: this.props.form,
                          key: "to",
                          keyChange: "from",
                          days: -30,
                        })}
                      />
                    )}
                  </AlignBottomItem>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Row type="flex" justify="center" gutter={30}>
                <Col>
                  <ButtonAnt htmlType="submit" text="Tìm kiếm" />
                </Col>
                <Col>
                  <ButtonAnt
                    text="Bỏ tìm kiếm"
                    onClick={() => this.handleCancelSearch()}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default Form.create()(ManagerSearchForm);
