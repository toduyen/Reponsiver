import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { CustomModal as AntModal } from 'components';

export const Modal = styled(AntModal)`
  .cni-popup {
  }
`;

const ColLabel = styled(Col)`
  height: 32px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: flex-end;
  & > span {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const ColData = styled(Col)`
  height: 32px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: flex-end;
  & > span {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
`;

export const DataItem = ({ label, children, labelCol, wrapperCol }) => {
  return (
    <Row>
      <ColLabel {...labelCol}>
        <span>{label}</span>
      </ColLabel>
      <ColData {...wrapperCol}>
        <span>{children}</span>
      </ColData>
    </Row>
  );
};

export const HeadTab = styled.div`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
  margin-bottom: 20px;
`;
