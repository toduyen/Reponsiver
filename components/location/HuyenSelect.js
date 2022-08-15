import React, { useState, useEffect } from "react";
import { Form, Input as AntInput, Select } from "antd";
import { getHuyen, layoutToggleLoading } from "actions";
import { withConnect } from "hocs";
import { BorderBottomSelect, Button } from "components/patterns";
import { isEmpty } from "lodash";

const { Option } = Select;

@withConnect((state) => ({
  ...state.authReducer,
  jwt: state.authReducer.jwt,
  huyens: state.commonReducer.huyens,
}))
class HuyenSelect extends React.Component {
  state = {
    datas: [],
    time: 0,
    total: 0,
    listState: [],
    value: null,
  };
  async componentDidMount() {
    const { tinh, onChange } = this.props;
    if (tinh) {
      this.getAllDistricts(tinh);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tinh !== this.props.tinh) {
      this.getAllDistricts(this.props.tinh);
    }
  }

  async getAllDistricts(tinhPassIn) {
    const { dispatch, jwt, onChange, value, disabled } = this.props;

    if (isEmpty(tinhPassIn)) {
      this.setState({
        value: "",
      });
      onChange("");
      return;
    }

    const response = await dispatch(getHuyen(jwt, tinhPassIn));
    if (!response) {
      return;
    }
    const { datas = [], time, total } = response;
    const check = datas.some((el) => el.ma === value);

    this.setState({
      datas,
      time,
      total,
      value: check ? value : "TC",
    });
    onChange(check ? value : "TC");
  }

  renderHuyenSelect() {
    const {
      form: { getFieldDecorator },
      huyens,
      onChange,
      value,
      disabled = false,
    } = this.props;

    return (
      <BorderBottomSelect
        onChange={(e) => {
          this.setState({ value: e });
          onChange(e);
        }}
        value={this.state?.value}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={disabled}
      >
        <Option value={"TC"}>Tất cả</Option>

        {this.state.datas.map((d) => (
          <Option key={d.ma} value={d.ma}>
            {d.ten}
          </Option>
        ))}
      </BorderBottomSelect>
    );
  }

  render() {
    return <>{this.renderHuyenSelect()}</>;
  }
}
export default Form.create()(HuyenSelect);
