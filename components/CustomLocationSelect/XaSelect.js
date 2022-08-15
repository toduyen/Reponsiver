import React, { useState, useEffect } from "react";
import { Form, Input as AntInput, Select } from "antd";
import { getXa, layoutToggleLoading } from "actions";
import { withConnect } from "hocs";
import { BorderBottomSelect, Button } from "components/patterns";
import { isEmpty } from "lodash";

const { Option } = Select;

@withConnect((state) => ({
  ...state.authReducer,
  jwt: state.authReducer.jwt,
  xas: state.commonReducer.xas,
}))
class XaSelect extends React.Component {
  state = {
    datas: [],
    time: 0,
    total: 0,
    listState: [],
    value: null,
  };
  async componentDidMount() {
    const { huyen } = this.props;
    if (huyen) {
      this.getAllTowns(huyen);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.huyen !== this.props.huyen) {
      this.getAllTowns(this.props.huyen);
    }
  }
  async getAllTowns(huyenPassIn) {
    const { dispatch, jwt, onChange, value, disabled } = this.props;

    if (isEmpty(huyenPassIn)) {
      this.setState({
        value: "",
      });
      onChange("");
      return;
    }

    const response = await dispatch(getXa(jwt, huyenPassIn));
    if (!response) {
      return;
    }
    const { datas = [], time, total } = response;
    const check = datas && datas.some((el) => el.ma == value);
    this.setState({
      datas,
      time,
      total,
      value: check ? value : "TC",
    });
    onChange(check ? value : "TC");
  }

  renderXaSelect() {
    const {
      form: { getFieldDecorator },
      xas,
      value,
      onChange,
      disabled,
    } = this.props;

    if (disabled) {
      return (
        <div style={{ pointerEvents: "none" }}>
          <BorderBottomSelect
            onChange={(e) => {
              this.setState({ value: e });
              onChange(e);
            }}
            showSearch
            showArrow={false}
            value={value}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value={"TC"}>Tất cả</Option>
            {xas.map((d) => (
              <Option key={d.ma} value={d.ma}>
                {d.ten}
              </Option>
            ))}
          </BorderBottomSelect>
        </div>
      );
    }
    return (
      <BorderBottomSelect
        onChange={(e) => {
          this.setState({ value: e });
          onChange(e);
        }}
        showSearch
        value={this.state?.value}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value={"TC"}>Tất cả</Option>
        {xas.map((d) => (
          <Option key={d.ma} value={d.ma}>
            {d.ten}
          </Option>
        ))}
      </BorderBottomSelect>
    );
  }

  render() {
    return <>{this.renderXaSelect()}</>;
  }
}
export default Form.create()(XaSelect);
