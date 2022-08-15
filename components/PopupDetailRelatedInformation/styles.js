import { Layout } from "antd";
import styled from "styled-components";
import { ModalApp as AntModal } from "components";

const FormWrapper = styled(Layout)`
  width: 100%;
  // background-color: #fff;
  // overflow: auto;
  // background-image: url("/static/images/viewinvoice-bg.jpg");
  // background-repeat: no-repeat;
  // background-size: auto;
  // background-position: center;
  // background-size: 180%;
  padding: 0 20px;
  p {
    font-size: 1rem;
  }
`;

const Modal = styled(AntModal)`
  width: 80% !important;
  top: 0;
  .ant-modal-body {
    max-height: calc(100vh - 60px);
    overflow-y: scroll;
    box-sizing: border-box !important;
    padding-bottom: 0 !important;
    background-color: #fff;
    padding-left: 32px;
  }
`;

export { FormWrapper, Modal };
