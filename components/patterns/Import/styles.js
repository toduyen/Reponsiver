import React from "react";
import styled from "styled-components";
import { Row, Col, Button as AntButton } from "antd";

const FormWrapper = styled(Col)``;

const PageWrapper = styled.div`
  flex: 1;
  .cum-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    margin: 5px 0 0 0;
    background-color: #e9e9e9;
    & > span {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .cum-header {
    height: 75px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    &-title {
      display: flex;
      align-items: center;
      & > svg {
        margin-right: 5px;
      }
      & > span {
        font-size: 14px;
        font-weight: 500;
        color: #915716;
      }
    }
  }
  .cum-search {
    &-header {
      font-size: 16px;
      font-weight: 500;
      &-middle {
        text-align: center;
      }
    }
  }
  .cum-table {
    margin-top: 20px;
  }
  .cum-footer {
    margin: 10px 0;
  }
  .cum-form {
    padding: 0 20px 20px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  }
  .cum-body {
    padding: 20px 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: #fff;
  }
`;

const NoBorderButton = styled(AntButton)`
  border: 0;
  background-color: transparent;
  box-shadow: none;
`;

export { PageWrapper, FormWrapper, NoBorderButton };
