import React from "react";
import styled from "styled-components";
import { Upload as AntUpload, Row, Icon } from "antd";
import { BorderBottomInput } from "./Input";

const StyledUpload = styled(AntUpload)``;

export const BorderBottomUpload = () => {
  return (
    <StyledUpload>
      <BorderBottomInput readOnly />
    </StyledUpload>
  );
};
