import React from "react";
import styled from "styled-components";

const FormTitleWrapperStyled = styled.div`
  width: 100%;
  padding-top: 8px;
  border-bottom: ${(props) => (props.size === "large" ? "3px" : "2px")} solid
    rgb(145, 87, 22);
  & > h3 {
    font-size: ${(props) => (props.size === "large" ? "16px" : "15px")};
    font-weight: bold;
    color: rgb(77, 42, 2);
  }
`;

export const FormTitleWrapper = ({ size = "small", children, style = {} }) => {
  return (
    <FormTitleWrapperStyled size={size} style={style}>
      <h3>{children}</h3>
    </FormTitleWrapperStyled>
  );
};

export const FormInputsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2px 10px 10px 10px;
  background-color: rgb(239, 238, 238, 0.5);
`;
