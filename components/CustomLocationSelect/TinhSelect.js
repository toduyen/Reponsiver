import React, { useState, useEffect } from "react";
import { Form, Input as AntInput, Select } from "antd";
import { getTinh, layoutToggleLoading } from "actions";
import { withConnect } from "hocs";
import { render } from "nprogress";
import { BorderBottomSelect, Button } from "components/patterns";

const { Option } = Select;

@withConnect((state) => ({
  ...state.authReducer,
  jwt: state.authReducer.jwt,
  tinhs: state.commonReducer.tinhs,
}))
class TinhSelect extends React.Component {
  state = {
    datas: [],
    time: 0,
    total: 0,
    listState: [],
    valueState: null,
  };
  async componentDidMount() {
    this.getAllProvince();
  }

  async getAllProvince() {
    const { dispatch, jwt } = this.props;

    const response = await dispatch(getTinh(jwt));
    if (!response) {
      return;
    }
    const { datas = [], time, total } = response;
    this.setState({
      datas,
      time,
      total,
      valueState: "",
    });
  }

  renderTinh() {
    const {
      form: { getFieldDecorator },
      tinhs,
      onChange,
      value,
      disabled,
    } = this.props;

    if (disabled) {
      return (
        <div style={{ pointerEvents: "none" }}>
          <BorderBottomSelect
            onChange={onChange}
            showSearch
            showArrow={false}
            placeholder="Chọn"
            value={this.state.valueState || value}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {tinhs.map((d) => (
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
          onChange(e);
        }}
        showSearch
        placeholder="Chọn"
        value={this.state.valueState || value}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {tinhs.map((d) => (
          <Option key={d.ma} value={d.ma}>
            {d.ten}
          </Option>
        ))}
      </BorderBottomSelect>
    );
  }

  render() {
    return <>{this.renderTinh()}</>;
  }
}
export default Form.create()(TinhSelect);
