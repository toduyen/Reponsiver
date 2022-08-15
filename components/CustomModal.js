import { Modal as AntModal } from "antd";
import React from "react";
import styled from "styled-components";
const { confirm } = AntModal;

const ModalStyled = styled(AntModal)`
//   .ant-modal-content {
//     background: none;
//     box-shadow: 0 0px 0px rgb(0 0 0 / 15%);
//   }
    position: relative;
    .ant-modal-header {
        border-bottom: 2px solid #915715;
    }
    .ant-modal-confirm-body .anticon.anticon-question-circle {
        display: none !important;
    }
`;

const ModalConfirmStyled = styled(confirm)`
    .ant-modal-confirm-body .anticon.anticon-question-circle {
        display: none;
    }
    .ant-modal-confirm-title {
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

export const CustomModal = class extends React.Component {
    ref = React.createRef();
    static confirm(obj) {
        return ModalStyled.confirm(obj);
    }
    render() {
        return (
            <ModalStyled
                centered
                maskClosable={false}
                footer={null}
                closable={false}
                // maskClosable
                {...this.props}
                ref={this.ref}
                title={(
                    <ModalTitleStyled>
                        <span style={{ marginLeft: 10 }}>{this.props.title}</span>
                    </ModalTitleStyled>
                )}
            >
                {this.props.children}
            </ModalStyled>
        );
    }
};
