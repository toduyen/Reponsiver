import React, { Component } from "react";
import "./style.scss";
import { Select as SelectAnt } from "antd";
const { Option } = SelectAnt;

export default class Select extends Component {
  onChange = (e) => {
    const options = this.props.options.filter((item) => {
      return item.label == e.target.value;
    });
    if (options.length > 0 && this.props.onChange)
      this.props.onChange({
        ...e,
        target: {
          ...e.target,
          value: options[0].value,
        },
      });
  };

  renderOptions = (options) => {
    return options.map(({ label, value }, index) => {
      return this.props.search ? (
        <Option value={label} />
      ) : (
        <Option key={`${index}_${value}`} value={value}>
          {label}
        </Option>
      );
    });
  };

  render() {
    const { options, isError, ...props } = this.props;
    const _options = this.renderOptions(options || []);
    const iValue = options?.filter(
      (item) => item.value == this.props.defaultValue
    );
    const key = `selectList-${Math.random()}`;
    return (
      <div style={{ ...this.props.style }}>
        <SelectAnt
          {...props}
          // style={null}
          className="selectContainer"
        >
          {_options}
        </SelectAnt>
      </div>
    );
  }
}
