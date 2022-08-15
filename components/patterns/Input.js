import styled from "styled-components";
import {
  Input as AntInput,
  AutoComplete,
  InputNumber as AntInputNumber,
  Select,
} from "antd";
import React from "react";

const { TextArea: AntTextArea, Password: AntPassword } = AntInput;
const FLOAT_REGEX = /\d+(\.\d{1,2})?/;

export const BorderBottomInput = styled(AntInput)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  background-color: transparent;
  &:hover {
    border-color: #915715;
    outline: 0;
  }
  &:focus {
    border-color: #915715;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
  }
`;

export const BorderBottomAutoComplete = styled(AutoComplete)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  background-color: transparent;
  &:hover {
    border-color: #915715;
    outline: 0;
  }
  &:focus {
    border-color: #915715;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
  }
`;
export const BorderBottomInputPassword = styled(AntPassword)`
  &:hover > input {
    border-color: #915715 !important;
    outline: 0;
  }
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent !important;
    &:hover {
      border-color: #915715 !important;
      outline: 0;
    }
    &:focus {
      border-color: #915715 !important;
      outline: 0;
      -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
      box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    }
  }
`;
export const BorderBottomTextArea = styled(AntTextArea)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  background-color: transparent;

  &:hover {
    border-color: #915715;
    outline: 0;
  }
  &:focus {
    border-color: #915715;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
  }
`;

export const BorderTextArea = styled(AntTextArea)`
  border-radius: 0;
  background-color: transparent;
  &:hover {
    border-color: #915715;
    outline: 0;
  }
  &:focus {
    border-color: #915715;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
  }
`;

export const AntInputNumberStyled = styled(AntInputNumber)`
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  background-color: transparent;
  &:hover {
    border-color: #915715;
    outline: 0;
  }
  &:focus {
    border-color: #915715;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
  }
`;

export const numberValidator = ({ pattern = FLOAT_REGEX, range, message }) => (
  rule,
  value,
  callback
) => {
  console.log(pattern.test(value), value);
  if (value || value === 0) {
    if (!pattern.test(value)) return callback(message);
    for (let { compare, compareValue } of range) {
      if (compare === "gt" && value <= compareValue) return callback(message);
      else if (compare === "ge" && value < compareValue)
        return callback(message);
      else if (compare === "lt" && value >= compareValue)
        return callback(message);
      else if (compare === "le" && value > compareValue)
        return callback(message);
    }
    return callback();
  }
  callback();
};

export const BorderBottomInputNumber = (props) => {
  return (
    <AntInputNumberStyled
      // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      formatter={(value) =>
        `${value}`
          .replace(/\./g, ",")
          .replace(
            (value || "").toString().includes(".")
              ? /\B(?=(\d{3})+(,))/g
              : /\B(?=(\d{3})+(?!\d))/g,
            "."
          )
      }
      parser={(value) =>
        value
          .replace(/[^,\d]/g, "")
          .replace(/,(?=.*,)/, "")
          .replace(/(\.)/g, "")
          .replace(/,/g, ".")
      }
      {...props}
    />
  );
};
