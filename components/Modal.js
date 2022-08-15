import { Modal as ModalCustom } from "antd";
import { Tabs } from "components/Tabs";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const { TabPane } = Tabs;

export const ModalModalCustomStyled = styled(ModalCustom)`
  .ant-modal-content {
    background: none;
    box-shadow: 0 0px 0px rgb(0 0 0 / 15%);
  }
`;

export const Modal = class extends React.Component {
  ref = React.createRef();
  render() {
    return (
      <ModalModalCustomStyled
        centered
        maskClosable={false}
        footer={null}
        closable={false}
        // maskClosable
        {...this.props}
        ref={this.ref}
      >
        {this.props.children}
        {/* <Tabs defaultActiveKey="1" size="small">
          <TabPane tab={<span>Xử lý</span>} key="1">
            
          </TabPane>
          <TabPane tab={<span>Lịch sử</span>} key="2">
            
          </TabPane>
        </Tabs> */}
      </ModalModalCustomStyled>
    );
  }
};

export const ModalStyled = styled(Modal)`
  position: relative;
  .ant-modal-header {
    border-bottom: 3.5px solid #915715;
  }
  .ant-modal-confirm-body .anticon.anticon-question-circle {
    display: none !important;
  }
  .ant-modal-footer {
    position: sticky;
    z-index: 1;
    background-color: #fff;
    bottom: 0;
    left: 0;
  }
`;

const ModalTitleStyled = styled.div`
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
  & > span {
    font-size: 16px;
    font-weight: bold;
    color: #4d2a02;
    padding-left: 60px;
    text-transform: capitalize;
    :first-letter {
      text-transform: uppercase;
    }
  }
`;

export const ModalApp = class extends React.Component {
  ref = React.createRef();
  static confirm(obj) {
    return ModalStyled.confirm(obj);
  }
  render() {
    return (
      <ModalStyled
        centered
        maskClosable={false}
        footer={this.props.footer}
        // closable={false}
        {...this.props}
        ref={this.ref}
        title={
          <ModalTitleStyled>
            <span style={{ marginLeft: 10 }}>{this.props.title}</span>
          </ModalTitleStyled>
        }
      >
        {this.props.children}
      </ModalStyled>
    );
  }
};
