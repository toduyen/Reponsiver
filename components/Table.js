import { Table as AntTable } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const TableStyled = styled(AntTable)`
  .ant-table table {
    border-collapse: separate;
    border-spacing: 0;
    .ant-btn-link {
      color: #915715;
      span,
      text {
        white-space: initial;
      }
    }
    .ant-btn-link-disabled,
    .ant-btn-link.disabled,
    .ant-btn-link[disabled],
    .ant-btn-link-disabled:hover,
    .ant-btn-link.disabled:hover,
    .ant-btn-link[disabled]:hover,
    .ant-btn-link-disabled:focus,
    .ant-btn-link.disabled:focus,
    .ant-btn-link[disabled]:focus,
    .ant-btn-link-disabled:active,
    .ant-btn-link.disabled:active,
    .ant-btn-link[disabled]:active,
    .ant-btn-link-disabled.active,
    .ant-btn-link.disabled.active,
    .ant-btn-link[disabled].active {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  .ant-table-header {
    background-color: transparent;
    overflow-y: ${(props) => (props.isScrollY ? "" : "auto")} !important;
    overflow-x: ${(props) =>
      props.dataSource && props.dataSource.length > 0
        ? "hidden"
        : "auto"} !important;
    // margin-bottom: ${(props) =>
      !props.isScrollY ? "-20px  !important" : "unset"};
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
    // padding-bottom: ${(props) =>
      !props.isScrollY
        ? props.isScrollX
          ? "15px  !important"
          : "20px  !important"
        : "unset"};
  }
  .ant-table-thead {
    text-align: center !important;
  }
  .ant-table-thead > tr > th {
    text-align: center !important;
    background-color: #bab0a5;
    font-weight: bold;
    padding: 9px 7px;
    border-color: #707070;
  }
  @media (max-width: 1270px) {
    .ant-table-thead > tr > th:first-child {
      width: 7%;
      text-align: center !important;
      background-color: #bab0a5;
      font-weight: bold;
      padding: 9px 7px;
    }
    .ant-table-tbody > tr > td:first-child {
      width: 7%;
      border-right-color: #707070;
      border-bottom: 1px solid rgb(139, 139, 139);
      padding: 8px 8px;
    }
  }
  .ant-table-tbody > tr:nth-child(even) {
    background-color: #efeeee;
  }
  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #ffffff;
  }

  .ant-table-thead > tr > th {
    border-right-color: #707070;
  }
  .ant-table-tbody > tr:hover > td {
    background-color: #bab0a598 !important;
  }
  .ant-table-body {
    overflow: auto !important;

    ::-webkit-scrollbar {
      height: 10px;
    }
  }
  .ant-table-tbody > tr > td {
    border-right-color: #707070;
    border-bottom: 1px solid rgb(139, 139, 139);
    padding: 8px 8px;
  }
  .ant-select {
    width: 100% !important;
  }
  .ant-selected-row {
    background-color: #bab0a598 !important;
  }
  .ant-table.ant-table-bordered .ant-table-footer {
    border: 1px solid #707070;
  }
  .ant-table-footer {
    background: #c8c8c8;
  }
  .ant-table-bordered .ant-table-thead > tr:not(:last-child) > th {
    border-bottom: 1px solid #707070;
  }
  .ant-table-bordered .ant-table-thead > tr > th:last-child {
    border-right-color: #707070 !important;
  }
  .ant-table-bordered .ant-table-header > table,
  .ant-table-bordered .ant-table-body > table,
  .ant-table-bordered .ant-table-fixed-left table,
  .ant-table-bordered .ant-table-fixed-right table {
    border-color: #707070;
  }
  .ant-table-placeholder {
    color: #000;
    border-radius: unset !important;
    border: 1px solid #707070 !important;
  }
  .ant-table-footer {
    border-radius: unset !important;
  }
  .ant-btn-link {
    color: "#904E1E";
    text-decoration: underline;
    text {
      color: "#904E1E";
    }
  }
  .ant-btn-link.ant-btn-block {
    display: contents;
  }
  .ant-select-selection__rendered {
    display: ${(props) => (props.selectCenter ? "flex" : "block")} !important;
    justify-content: center;
    padding-left: ${(props) => (props.selectCenter ? "11px" : "0px")};
  }
  .ant-table-tbody > tr.ant-table-row-selected td {
    background: #bab0a598;
  }
`;

// useless
export const TableScrollWrapper = styled.div``;

export const Table = class extends React.Component {
  state = {
    isVisibleScrollY: false,
    isVisibleScrollX: false,
  };
  ref = React.createRef();
  hasScrollbarY = () => {
    let domNode = ReactDOM.findDOMNode(this.ref.current);
    if (domNode) {
      const elements = ReactDOM.findDOMNode(
        this.ref.current
      ).getElementsByClassName("ant-table-body");
      if (elements && elements.length > 0) {
        return elements[0].offsetWidth > elements[0].clientWidth;
      }
    }
    return false;
  };
  hasScrollbarX = () => {
    let domNode = ReactDOM.findDOMNode(this.ref.current);
    if (domNode) {
      const elements = ReactDOM.findDOMNode(
        this.ref.current
      ).getElementsByClassName("ant-table-body");
      if (elements && elements.length > 0) {
        return elements[0].offsetHeight > elements[0].clientHeight;
      }
    }
    return false;
  };
  checkScroll = () => {
    this.setState({
      isVisibleScrollY: this.hasScrollbarY(),
      isVisibleScrollX: this.hasScrollbarX(),
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.checkScroll);
    const { onEndReached = () => {} } = this.props;
    var tableContents = document.querySelectorAll(".ant-table-body");
    tableContents.forEach((tableContent) => {
      tableContent.addEventListener("scroll", (event) => {
        // checking whether a selector is well defined
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop;
        if (currentScroll === maxScroll) {
          onEndReached();
        }
      });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.checkScroll);
  }
  componentDidUpdate(prevProps) {
    const isVisibleY = this.hasScrollbarY();
    const isVisibleX = this.hasScrollbarX();
    const { isVisibleScrollY, isVisibleScrollX } = this.state;
    if (isVisibleY != isVisibleScrollY) {
      this.setState({ isVisibleScrollY: isVisibleY });
    }
    if (isVisibleX != isVisibleScrollX) {
      this.setState({ isVisibleScrollX: isVisibleX });
    }
  }
  render() {
    const { maxHeight = 1000, maxWidth = 300 } = this.props;
    const locale = {
      emptyText: <div style={{ color: "#000" }}>Không có dữ liệu hiển thị</div>,
    };
    const { isVisibleScrollY, isVisibleScrollX } = this.state;
    return (
      <TableStyled
        ref={this.ref}
        locale={locale}
        scroll={{ y: maxHeight, x: maxWidth }}
        isScrollY={isVisibleScrollY}
        isScrollX={isVisibleScrollX}
        {...this.props}
      />
    );
  }
};
