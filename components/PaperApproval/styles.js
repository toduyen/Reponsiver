import React from "react";
import styled from "styled-components";
import { Modal, Col } from "antd";

export const ModalCustom = styled(Modal)`
  .ant-modal-content {
   
  }
`;

export const FormWrapper = styled(Col)`
  .error-invoice-sending-approval-form,
  .error-invoice-refecting-form,
  .error-invoice-signature-form {
    .require-item {
      label::after {
        content: " (*)" !important;
        color: red !important;
      }
    }
  }
  .title-heading {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .form-radio-group {
    width: 100%;
    margin: 10px 0;
  }
`;

export const HeadTab = styled.div`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
  margin-bottom: 20px;
`;

export const TableWrapper = styled.div`
  .ant-table-thead tr th {
    text-align: center !important;
  }
`;