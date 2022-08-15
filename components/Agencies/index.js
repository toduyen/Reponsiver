import { getCQBH, getDetailCQBH } from "actions";
import { Col, Row } from "antd";
import { AlignBottomItem, BorderBottomInput } from "components/patterns";
import { withAuth, withConnect } from "hocs";
import _ from "lodash";
import React, { Component } from "react";
import PopupSearch from "./PopUpSearch";

const ITEM_COL = {
  colon: false,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // hasFeedback: true,
};

const MODE = {
  GENERAL_DEPARTMENT: 0,
  DEPARTMENT: 1,
  SUB_DEPARTMENT: 2,
};

@withAuth([], true)
@withConnect((state) => ({
  ...state.authReducer,
}))
class Agencies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDepartment: [],
      listSubDepartment: [],
      department: "",
      subDepartment: "",
      departmentSearch: "",
      subDepartmentSearch: "",
      isShowPopup: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      jwt,
      detail,
      user: { groupId },
      form: { setFieldsValue },
      detailData,
    } = this.props;

    if (detail || detailData) return;
    dispatch(getDetailCQBH(jwt, groupId))
      .then((response) => {
        const { ten, matms } = response || {};
        setFieldsValue({ cqbhanh: ten, mcqbhanh: matms });
      })
      .catch((err) => {});
  }

  onChange = (cqbhanh) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const { matms, ten } = cqbhanh || {};
    setFieldsValue({ cqbhanh: ten, mcqbhanh: matms });
  };

  onSearch = (fieldName) => (value) => {
    this.setState({
      [`${fieldName}`]: value,
    });
  };

  checkUser = (groupId = "") => {
    const mode = ["0000", "0010"].includes(groupId)
      ? MODE.GENERAL_DEPARTMENT
      : (groupId || "").endsWith("00") || (groupId || "").endsWith("01")
      ? MODE.DEPARTMENT
      : MODE.SUB_DEPARTMENT;
    return mode;
  };

  togglePopup = (isShowPopup) => {
    const {
      detail,
      user: { groupId },
    } = this.props;
    if (detail) return;
    if (this.checkUser(groupId) === 2) return;
    this.setState({ isShowPopup });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      user: { groupId },
      detail,
      labelCol,
      wrapperCol,
      disabled,
      title = "Cơ quan ban hành",
    } = this.props;
    const { isShowPopup } = this.state;

    const cqbhanh = getFieldValue(`cqbhanh`) || "";
    const mcqbhanh = getFieldValue(`mcqbhanh`) || "";
    // const mcqtctren = listSubDepartment.find((el) => el.mcqt === cqbhanh)?.mcqtctren || "";
    return (
      <>
        {getFieldDecorator(`mcqbhanh`, {
          rules: [],
        })(<BorderBottomInput type="hidden" />)}

        <AlignBottomItem
          label={detail ? `${title}` : `${title} (*)`}
          colon={false}
          labelCol={labelCol ? labelCol : { span: 8 }}
          wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        >
          {getFieldDecorator(`cqbhanh`, {
            rules: [
              {
                required: true,
                message: "Bạn chưa nhập cơ quan ban hành.",
              },
            ],
          })(
            <Row gutter={20}>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <BorderBottomInput
                      readOnly
                      disabled={disabled}
                      onClick={() => this.togglePopup(true)}
                      value={cqbhanh}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </AlignBottomItem>
        {isShowPopup && (
          <PopupSearch
            onCancel={() => this.togglePopup(false)}
            cqbhanh={cqbhanh}
            mcqbhanh={mcqbhanh}
            setV={this.onChange}
            checkUser={this.checkUser}
          />
        )}
      </>
    );
  }
}

export default Agencies;
