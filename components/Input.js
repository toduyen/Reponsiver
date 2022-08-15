import styled from "styled-components";
import { Input as AntInput } from "antd";

export const Input = styled(AntInput)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
`;

export const InputNumber = styled(AntInput)`
  ${(props) => props.transparent && "background-color: transparent !important;"}
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
`;
