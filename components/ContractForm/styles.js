import React from "react";
import styled from "styled-components";
import { Modal as AntModal, Checkbox as AntCheckBox } from "antd";

export const Modal = styled(AntModal)`
  width: 900px !important;
  top: 0;
  .ant-modal-body {
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box !important;
  }
`;

export const ViewDataWrapper = styled.div`
  overflow-y: scroll;
  max-width: 800px;
  padding: 20px;
  padding-bottom: 10px;
  margin: 0px auto 20px auto;
  background-image: url("/static/images/viewinvoice-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 250%;
  border: 3px double rgba(145, 87, 21, 0.69);
  line-height: 1.5;
  -webkit-box-shadow: 0px 0px 9px 2px rgba(222, 226, 230, 0.7);
  box-shadow: 0px 0px 9px 2px rgba(222, 226, 230, 0.7);
  font-family: Times New Roman;
  .di-label {
    @media (max-width: 1360px) {
      height: auto !important;
      padding: 5px;
    }
    .custom-viewdata_field {
    }
  }
  .kh-ch {
    text-align: center;
    h3 {
      font-size: 13pt;
      font-weight: bold;
      line-height: 1.6;
      margin-bottom: 0;
    }
  }
  .title-heading {
    margin-top: 20px;
  }
  .kh-ch span {
    display: block;
  }

  .heading-content {
    border-bottom: 1px solid rgba(145, 87, 21, 0.69);
    padding-bottom: 20px;
  }
  .heading-content .main-title {
    font-size: 14pt;
    text-align: center;
    display: block;
    font-weight: bold;
    margin-bottom: 0;
  }
  .heading-content .dear-ct {
    display: flex;
    justify-content: center;
  }
  .heading-content .dear-ct div {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 10px;
  }
  .heading-content p {
    font-size: 16px;
    text-align: right;
  }
  .heading-content p.day {
    text-align: center;
    display: block;
  }
  .heading-content .code-ms {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
  }

  .content-info {
    padding-top: 20px;
  }
  .content-info label {
    font-weight: bold;
    padding: 7px 0px;
    display: block;
  }
  .content-info .list-fill-out {
    list-style: none;
    padding-inline-start: 0;
  }
  .content-info .list-fill-out li {
    font-size: 16px;
  }
  .content-info .list-fill-out li.flex-li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .content-info .has-sq {
    padding-left: 20px;
  }
  .content-info .has-sq li {
    font-size: 16px;
  }
  .content-info .has-sq li ul {
    padding-left: 30px;
  }
  .content-info .tx-money {
    text-align: right;
  }
  .content-info .square-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 0px;
  }
  .content-info .square-list.no-pd {
    padding: 0px;
  }
  .content-info .square-list.has-mg {
    margin-left: 5px;
  }
  .content-info .square-list ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 25px;
  }
  .content-info .square-list ul li {
    width: 30px;
    height: 30px;
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-info .square-list ul li:last-child {
    border-right: 1px solid #000;
  }

  .res-tb {
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    width: max-content;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    padding: 10px 0px;
  }
  .scroll-ct-tb {
    overflow-x: scroll;
  }
  #style-scr1::-webkit-scrollbar {
    height: 10px;
    border-radius: 5px;
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
  .res-tb thead tr th.tb-slv {
    width: 220px;
    padding: 0;
  }
  .res-tb thead tr th .tb-name-s {
    width: 250px;
  }
  .res-tb thead tr th.tb-hdct {
    width: 350px;
    padding: 0;
  }
  .res-tb thead tr th.tb-tnh {
    width: 250px;
  }
  .res-tb thead tr th.tb-dg {
    width: 150px;
  }
  .res-tb thead tr th.tb-name {
    width: 300px;
  }
  .res-tb thead tr th .sl-x-2 {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid black;
    height: 35px;
  }
  .res-tb thead tr th .sl-x-2 span {
    flex: 0 0 49%;
    display: block;
  }
  .res-tb thead tr th .sl-x-2 span:first-child {
    border-right: 1px solid black;
  }

  .ft-sign {
    padding: 30px 0;
  }
  .ft-sign .sign-dx {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .ft-sign .sign-dx.only-one-sign {
    justify-content: flex-end;
  }
  .ft-sign .sign-dx.center-sign {
    justify-content: center;
  }
  .ft-sign .sign-dx.multi-sign h3 {
    font-size: 16px;
  }
  .ft-sign .sign-dx.multi-sign h3 p {
    text-align: center;
  }
  .ft-sign .sign-dx.multi-sign h3 p:nth-child(2) {
    font-size: 14px;
    font-weight: normal;
  }
  .ft-sign .sign-dx h3 p {
    text-align: center;
  }
  .ft-sign .sign-dx h3 p:nth-child(2) {
    font-size: 14px;
    font-weight: normal;
  }
  .ft-sign .sign-dx h3 p:nth-child(3) {
    font-size: 14px;
    font-weight: normal;
  }
  .ft-sign .fd-end {
    padding-top: 120px;
    text-align: center;
  }
  .ft-sign .appendix {
    padding-top: 20px;
  }
  .ft-sign .appendix .apen-ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .ft-sign .appendix .apen-ul li {
    margin-right: 25px;
  }
  .ft-sign .appendix .apen-ul li:last-child {
    margin-right: unset;
  }

  .sign-box {
    width: 230px;
    padding: 3px;
    border: 2px solid rgb(35, 183, 9);
    background-image: url("/static/images/sign-check.jpg");
    background-repeat: no-repeat;
    background-position: 125px 9px;
    background-size: 70px 60px;
    margin-top: 8px;
  }
  .sign-box span {
    color: rgb(35, 183, 9);
    font-size: 13px;
    text-align: left;
    display: block;
  }

  .heading-ct {
    width: 100%;
  }
  .heading-ct .code {
    display: block;
    text-align: right;
  }
  .heading-ct .lg-plan {
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
  }
  .heading-ct .lg-plan div {
    text-align: center;
  }
  .heading-ct .lg-plan div span {
    display: block;
  }
  .heading-ct h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
  }

  .ms-ct-con {
    display: flex;
    justify-content: flex-end;
    padding-right: 28px;
  }

  .ms-ct-con div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const DataItemStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 10px;
  .di-label {
    height: 25px;
    border-bottom: 1px dashed transparent;
    display: flex;
    align-items: flex-start;
  }
  .di-value {
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
      <div className="di-value" style={{ justifyContent }}>
        <span>{children}</span>
      </div>
    </DataItemStyle>
  );
};

export const Checkbox = styled(AntCheckBox)`
  font-weight: normal !important;
`;
