import React from "react";
import styled from "styled-components";
import { Row, Input as AntInput, Modal, Form } from "antd";
const { TextArea: AntTextArea } = AntInput;

export const PageInchargeModal = styled(Modal)`
  .ant-modal-body {
    padding: 10px 0px;
    margin: 10px 0px;
  }
`;

const PageInChargeTitle = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 15px;
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
    color: #000000;
    padding-left: 75px;
  }
`;

export const PageInChargeTitleWrapper = ({ children }) => (
  <PageInChargeTitle>
    <h3>{children}</h3>
  </PageInChargeTitle>
);

export const PageInchargeContainer = styled.div`
  border-top: 3px solid #915715;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  h3 {
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
  }
  .ant-radio-group {
    width: 100%;
  }
`;

export const PageInChargeRowList = styled(Row)`
  height: 150px;
  background: #efeeee;
  overflow: auto;
  margin: -5px 0px !important;
  ::-webkit-scrollbar {
    width: 5px;
  }
  .ant-radio-wrapper {
    white-space: nowrap;
    width: 150px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PageInChargeRowListNoneContent = styled(Row)`
  margin: -5px -12px !important;
`;

export const PageInChargeTextArea = styled(AntTextArea)`
  border-radius: 0;
  border: 1px solid #efeeee;
  &:hover {
    border-color: rgba(145, 87, 21, 0.5);
    outline: 0;
    // border-right-width: 4px !important;
  }
  &:focus {
    // border-right-width: 4px !important;
    border-color: rgba(145, 87, 21, 0.5);
    outline: 0;
    box-shadow: none;
  }
`;

export const PageInchargeFormItem = styled(Form.Item)`
  margin: 0px;
`;

// modal style 

const ModalContainer = styled.div`
  padding: 15px
`;
const FormWrapper = styled.div`
  padding-left: 10px
  padding-right: 10px
`;
const ModalFormWrapper = styled.div`
  padding-left: 10px
  padding-right: 10px
`;

const ModalHeaderStyled = styled.div`
  position: relative;
  background: #fff;
  border-bottom: 2px solid #915716;
  margin-bottom: 35px;
  margin-left: -24px;
  width: calc(100% + 24px + 24px);
  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 30%;
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
    padding-left: 80px;
  }
`;

const ModalHeaderWrapper = ({ children }) => (
  <ModalHeaderStyled>
    <h3>{children}</h3>
  </ModalHeaderStyled>
);

const ModalTitleStyled = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  border-bottom: 2px solid #915716;

  & > h3 {
    font-size: 16px;
    font-weight: bold;
    color: #4d2a02;
  }
`;

const ModalTitleWrapper = ({ children }) => (
  <ModalTitleStyled>
    <h3>{children}</h3>
  </ModalTitleStyled>
);

const ModalContentStyled = styled.div`
  background: #efeeee;
  padding: 2px 10px;
  margin-bottom: 20px;
`;

const ModalContentWrapper = ({ children }) => (
  <ModalContentStyled>{children}</ModalContentStyled>
);
export {
  ModalContainer,
  FormWrapper,
  ModalFormWrapper,
  ModalHeaderWrapper,
  ModalTitleWrapper,
  ModalContentWrapper,
};