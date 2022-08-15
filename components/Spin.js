import React from "react";
import { Spin as AntSpin, Modal as AntModal } from "antd";
import styled from "styled-components";

const SpinWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1440;
  width: 100%;
  height: 100vh;
  background-color: rgba(240, 250, 254, 0.5);
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const StyledSpin = styled(AntSpin)``;

export const Spin = (props) => {
  const { spinning } = props;
  return (
    <SpinWrapper visible={spinning}>
      <StyledSpin {...props} />
    </SpinWrapper>
  );
};
