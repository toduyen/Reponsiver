import { getAllOfficalCQBH, getDetailCQBH } from "actions";
import { Col, Row, Form } from "antd";
import { AlignBottomItem, BorderBottomInput } from "components/patterns";
import { withAuth, withConnect } from "hocs";
import _, { isEmpty } from "lodash";
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
class AgenciesForUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowPopup: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    const {
      dispatch,
      jwt,
      selectedRow,
      form: { setFieldsValue },
    } = this.props;
    if (prevProps.selectedRow !== this.props.selectedRow) {
      if (isEmpty(selectedRow) || !selectedRow.groupId) return;
      const res = await dispatch(getDetailCQBH(jwt, selectedRow?.groupId));
      if (!res) return;
      setFieldsValue({ groupIdName: res.ten, groupId: res.matms });
    }
  }

  onChange = (cqthue) => {
    const {
      form: { setFieldsValue, getFieldValue, resetFields },
    } = this.props;
    const { matms, ten } = cqthue || {};
    if (ten !== getFieldValue(`groupIdName`)) {
      setFieldsValue({
        groupIdName: ten,
        groupId: matms,
      });
      resetFields(["cdanh", "pban", "cbo", "tcbo"]);
    }
  };

  // checkUser = (groupId = "") => {
  //   const mode = ["0000", "0010"].includes(groupId)
  //     ? MODE.GENERAL_DEPARTMENT
  //     : (groupId || "").endsWith("00") || (groupId || "").endsWith("01")
  //     ? MODE.DEPARTMENT
  //     : MODE.SUB_DEPARTMENT;
  //   return mode;
  // };

  togglePopup = (isShowPopup) => {
    const {
      detail,
      user: { groupId },
    } = this.props;
    if (detail) return;
    // if (this.checkUser(groupId) === 2) return;
    this.setState({ isShowPopup });
  };

  render() {
    const {
      disabled,
      form: { getFieldValue },
    } = this.props;
    const { isShowPopup } = this.state;

    const groupIdName = getFieldValue(`groupIdName`) || "";
    const groupIdCode = getFieldValue(`groupId`) || "";
    return (
      <>
        <BorderBottomInput
          readOnly
          disabled={disabled}
          onClick={() => this.togglePopup(true)}
          value={groupIdName}
        />

        {isShowPopup && (
          <PopupSearch
            onCancel={() => this.togglePopup(false)}
            setV={this.onChange}
            groupIdName={groupIdName}
            checkUser={this.checkUser}
          />
        )}
      </>
    );
  }
}

export default AgenciesForUser;
