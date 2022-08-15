import React from "react";
import styled from "styled-components";
import { Modal as AntModal, Row, Col } from "antd";

export const Modal = styled(AntModal)`
  width: 900px !important;
  top: 0;
  .ant-modal-body {
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box !important;
  }
  .vip-divide {
    width: 100%;
    height: 0;
    border-bottom: 1px solid rgba(145, 87, 21, 0.69);
  }
`;

export const ViewPopupWrapper = styled.div`
  min-height: 100vh;
  width: 800px;
  padding: 20px;
  padding-bottom: 10px;
  margin: 20px auto 20px auto;
  line-height: 1.5;
  font-family: "Times New Roman";
  font-size: 13pt;
  margin: auto;
  color: black;
  background-image: url("/static/images/viewinvoice-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 250%;
  border: 3px double rgba(145, 87, 21, 0.69);
  line-height: 1.5;
  -webkit-box-shadow: 0px 0px 9px 2px rgba(222, 226, 230, 0.7);
  box-shadow: 0px 0px 9px 2px rgba(222, 226, 230, 0.7);
  .wrap-pop::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  .wrap-pop::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 7px;
  }

  .heading-ct {
    width: 100%;
  }
  .heading-ct .code {
    display: flex;
    justify-content: flex-end;
    text-align: center;
    font-size: 13pt;
    margin-bottom: 5px;
    width: 100%;

    b {
      // width: 220px;
    }
  }
  .heading-ct .lg-plan {
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
  }
  .heading-ct .lg-plan div {
    text-align: center;
  }
  .heading-ct h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
  }

  .pop-content {
    padding-top: 30px;
    line-height: 1.6;
  }
  .pop-content .content-head {
    text-align: center;
  }
  .pop-content .content-head h5 {
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  .p-space {
    margin-bottom: 10px;
  }

  .p-no-space {
    margin-bottom: 0;
  }

  .pop-content .content-head h5 i {
    font-weight: normal;
  }
  .pop-content .content-info {
    padding-top: 15px;
  }
  .pop-content .content-info p {
    text-indent: 30pt;
    font-size: 13pt;
  }
  .pop-content .content-info ul {
    list-style: none;
    padding: 0;
  }
  .pop-content .content-info .sign-end {
    display: block;
    text-align: right;
  }

  .dvt {
    display: flex;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 576px) {
    .pop-content .content-info .sign-flex .tx-center {
      width: 100%;
    }
  }

  .res-tb {
    border-collapse: collapse;
    border-spacing: 0;
    // display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    margin: 10px 0px;
    min-width: 250px;
  }
  .res-tb tr td {
    border: 1px solid black;
    padding: 6px 4px 6px 4px;
    vertical-align: baseline;
  }
  .res-tb tr td.tx-center {
    text-align: center;
    min-width: 50px;
  }
  .res-tb thead tr th {
    border: 1px solid black;
    vertical-align: middle;
    padding: 6px 4px 6px 4px;
  }

  .sign-box {
    width: 310px;
    padding: 3px;
    border: 2px solid #23b709;
    background-image: url("/static/images/sign-check.jpg");
    background-repeat: no-repeat;
    background-position: 125px 9px;
    background-size: 70px 60px;
    margin-top: 8px;
  }
  .sign-box span {
    color: #23b709;
    font-size: 12pt;
    text-align: left;
    display: block;
  }

  .sign-row {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    // padding-left: 40px;
    // padding-right: 40px;

    .sign-flex {
      text-align: center;
      // padding-top: 14px;
    }
    .sign-flex .tx-center {
      text-align: center;
      display: block;
    }

    .tt-style {
      text-transform: uppercase;
    }
  }
`;

export const DataItemStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  // font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 10px;
  .di-label {
    min-height: 25px;
    border-bottom: 1px dashed transparent;
    display: flex;
    align-items: flex-start;
  }
  .di-value {
    min-height: 25px;
    box-sizing: border-box;
    flex: 1;
    border-bottom: 1px dashed #e8e8e8;
    display: flex;
    align-items: flex-start;
    padding-left: 10px;
    justify-content: flex-start;
  }
`;

export const DataItem = ({
  label,
  children,
  justifyContent = "flex-start",
}) => {
  return (
    <DataItemStyle>
      <div className="di-label">
        <span>{label}</span>
      </div>
      <div className="di-value" style={{ justifyContent, height: "auto" }}>
        <span style={{ wordBreak: "break-all" }}>{children}</span>
      </div>
    </DataItemStyle>
  );
};
