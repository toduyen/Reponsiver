import { Icon, Select as AntSelect, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";

export const BorderBottomSelect = styled(AntSelect)`
  width: 100%;
  .ant-select-selection {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent;
    &:hover {
      border-color: #915715;
      outline: 0;
    }
    &:focus {
      border-color: #915715;
      outline: 0;
      -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
      box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    }
  }
`;

const { Option } = BorderBottomSelect;

export class BorderBottomSelectSearch extends React.Component {
  state = {
    loading: false,
    state: "",
    search: "",
    list: [],
    total: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { maCqt } = this.props || {};

    if (!isEqual(prevProps.maCqt, maCqt)) {
      this.setState(
        {
          state: "",
        },
        this.fetchData
      );
    }
  }

  fetchData = () => {
    const { dispatch, jwt, callback, maCqt } = this.props;
    console.log("BorderBottomSelectSearch -> fetchData -> maCqt", maCqt);
    const { state, search, list, loading } = this.state;
    if (loading || !maCqt) {
      return;
    }
    const param = {
      state,
      search: { [`cqt=in`]: maCqt, ...search },
      size: 20,
      sort: { ten: "asc" },
    };
    this.setState({ loading: true }, async () => {
      try {
        const response = await dispatch(callback(jwt, param));
        if (!response) {
          return;
        }
        const { datas, state: stateRes, total } = response;
        this.setState({
          list: state ? [...list, ...datas] : [...datas],
          state: stateRes,
          total,
        });
      } finally {
        this.setState({ loading: false });
      }
    });
  };

  onPopupScroll = (event) => {
    const { target } = event;
    const { loading, total, list } = this.state;
    if (
      loading ||
      target.scrollTop + target.offsetHeight !== target.scrollHeight ||
      total <= list.length
    ) {
      return;
    }
    this.fetchData();
  };

  onSearch = (text) => {
    const { fieldSearch } = this.props;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState(
        { state: "", search: { [fieldSearch]: text || "" } },
        this.fetchData
      );
    }, 500);
  };

  onChange = (text) => {
    const {
      form: { setFieldsValue },
      fieldName,
      onChange = () => {},
    } = this.props;
    // if (text) {
    //   text = text.split("-")[0];
    // }
    if (!text) {
      this.onSearch("");
    }
    setFieldsValue({ [fieldName]: text || "" });
    onChange(text);
  };

  render() {
    const {
      disabled,
      fieldSearch,
      fieldIds,
      fieldName,
      form: { getFieldValue },
      allowClear = true,
    } = this.props;
    const { list, loading } = this.state;
    return (
      <BorderBottomSelect
        disabled={disabled}
        onPopupScroll={this.onPopupScroll}
        loading={loading}
        showSearch
        onSearch={this.onSearch}
        onChange={this.onChange}
        filterOption={false}
        allowClear={allowClear}
        value={getFieldValue(fieldName) || ""}
      >
        {list.map((item) => {
          const key = fieldIds && fieldIds.map((el) => item[el]).join("-");
          const value = fieldIds
            ? `${item[fieldSearch]} (${key})`
            : `${item[fieldSearch]}`;
          return (
            <Option key={key} value={value}>
              <Tooltip title={value}>{value}</Tooltip>
            </Option>
          );
        })}
        {loading && (
          <Option key="loading">
            <Icon type="loading" />
          </Option>
        )}
      </BorderBottomSelect>
    );
  }
}
