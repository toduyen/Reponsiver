import React from "react";
import styled from "styled-components";
import { CaptchaReloadButton } from "./patterns/ButtonAnt";

const ImageWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    height: 32px;
    border: 1px solid ${(props) => props.borderColor} !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: #e5e5e5 !important;
  }
`;

const Image = styled.img`
  width: calc(100% - 32px);
  height: 32px;
  border: 1px solid ${(props) => props.borderColor};
  border-right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #e5e5e5;
`;

export const Captcha = ({
  src,
  alt = "",
  borderColor = "#d9d9d9",
  onReload = () => {},
}) => {
  return (
    <ImageWrapper borderColor={borderColor}>
      <Image src={src} alt={alt} borderColor={borderColor} />
      <CaptchaReloadButton onClick={onReload} />
    </ImageWrapper>
  );
};
