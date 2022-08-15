import React from "react";
import styled from "styled-components";
import { Form, Row, Col } from "antd";
import _isString from "lodash/isString";

const { Item: AntItem } = Form;

const ColLabelCenter = styled(Col)`
  height: 40px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: center;
  & > label {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const ColLabel = styled(Col)`
  min-height: 40px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: flex-end;
  & > label {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const ColLabelTop = styled(Col)`
  min-height: 35px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  & > label {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const ColLabelWarning = styled(Col)`
  min-height: 40px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: flex-end;
  & > label {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: red;
  }
`;
export const NoMarginBottomItem = styled(AntItem)`
  margin-bottom: 5px;
`;

export const AlignBottomItem = ({
  label,
  labelCol,
  wrapperCol,
  children,
  gutter = 0,
  bold = false,
  ...props
}) => {
  if (_isString(label) && label.includes("(*)")) {
    const title = label.split("(*)")[0].trim();
    label = (
      <span>
        {title} <span style={{ color: "red" }}>(*)</span>
      </span>
    );
  }
  return (
    <Row gutter={gutter}>
      <ColLabel {...labelCol}>
        {bold ? <h3>{label}</h3> : <label>{label}</label>}
      </ColLabel>
      <Col {...wrapperCol}>
        <AntItem {...props}>{children}</AntItem>
      </Col>
    </Row>
  );
};

export const AlignTopItem = ({
  label,
  labelCol,
  wrapperCol,
  children,
  gutter = 0,
  ...props
}) => {
  if (_isString(label) && label.includes("(*)")) {
    const title = label.split("(*)")[0].trim();
    label = (
      <span>
        {title} <span style={{ color: "red" }}>(*)</span>
      </span>
    );
  }
  return (
    <Row style={{ marginTop: "20px" }} gutter={gutter}>
      <ColLabelTop {...labelCol}>
        <label>{label}</label>
      </ColLabelTop>
      <Col {...wrapperCol}>{children}</Col>
    </Row>
  );
};

export const AlignTextItem = ({
  label,
  labelCol,
  wrapperCol,
  children,
  content,
  ...props
}) => {
  return (
    <Row>
      <ColLabel {...labelCol}>
        <label>{label}</label>
      </ColLabel>
      <ColLabel {...wrapperCol}>
        <label>{content}</label>
      </ColLabel>
    </Row>
  );
};

export const AlignTextItemWarning = ({
  label,
  labelCol,
  wrapperCol,
  children,
  content,
  ...props
}) => {
  return (
    <Row>
      <ColLabelWarning {...labelCol}>
        <label color="red">{label}</label>
      </ColLabelWarning>
      <ColLabelWarning {...wrapperCol}>
        <label>{content}</label>
      </ColLabelWarning>
    </Row>
  );
};
