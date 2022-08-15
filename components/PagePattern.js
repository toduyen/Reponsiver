import moment from "moment";
import React from "react";
import styled from "styled-components";
import { handleCKS, formatCksSignDate } from "utils/helper";
import { TableScrollWrapper } from "./Table";

const PageTitleStyled = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 18px;
    background-image: url("/static/images/title_icon.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  & > h3 {
    font-size: 16px;
    font-weight: bold;
    color: #4d2a02;
    padding-left: 60px;
  }
`;

export const PageTitleWrapper = ({ children }) => (
  <PageTitleStyled>
    <h3>{children}</h3>
  </PageTitleStyled>
);

export const PageFormWrapper = styled.div`
  background: #efeeee80;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 35px;
  padding-right: 35px;
  // margin-top: 20px;
  display: flex;
  justify-content: center;
  form {
    width: 100%;
    margin: auto;
    padding: 10px;
  }
`;

export const PagePaginationWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 14px !important;
`;

const PageTableStyled = styled.div`
  width: 100%;
  padding: 0px 0px;
`;

export const PageTableWrapper = ({ maxHeight, children }) => (
  <PageTableStyled>
    <TableScrollWrapper maxHeight={maxHeight}>{children}</TableScrollWrapper>
  </PageTableStyled>
);

const SignBoxStyled = styled.div`
  .sign-box {
    width: 260px !important;
    min-height: auto !important;
    padding: 5px !important;
    border: 2px solid #23b709 !important;
    background-image: url("/static/images/sign-check.jpg") !important;
    background-repeat: no-repeat !important;
    background-position: right 45px bottom 10px !important;
    background-size: 70px 60px !important;
    margin: auto !important;
    margin-top: 10px !important;
  }
  .sign-box span {
    color: #23b709 !important;
    font-size: 13pt !important;
    text-align: left !important;
    display: block !important;
    font-weight: normal;
  }
`;

export const pageSignBox = (data, date) => {
  if (data) {
    const ngky = handleCKS(JSON.parse(data))?.ngky || "";
    return (
      <SignBoxStyled>
        <div className="sign-box">
          <span>Signature Valid</span>
          <span>Ký bởi {ngky}</span>
          <span>
            Ký ngày:{" "}
            {formatCksSignDate(
              JSON.parse(data)?.SigningTime ||
                moment(date).format("YYYY-MM-DD[T]HH:mm:ss")
            )}
          </span>
        </div>
      </SignBoxStyled>
    );
  }
  return <div style={{ height: 50 }}></div>;
};

export const pageSignBoxPrintPDF = (data, date, height = 50) => {
  if (data) {
    const { ngky, nky } = handleCKS(data);
    return `
        <div class="sign-box">
          <span>Signature Valid</span>
          <span>Ký bởi ${ngky || ""}</span>
          <span>
            Ký ngày: ${
              nky || moment(date).format("YYYY-MM-DD[T]HH:mm:ss") || ""
            }
          </span>
        </div>
      `;
  }
  return `<div style="height: ${height}"></div>`;
};
