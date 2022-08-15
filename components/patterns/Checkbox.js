import styled from "styled-components";
import { Checkbox } from "antd";

export const BorderBottomCheckbox = styled(Checkbox)`
  .ant-checkbox {
    // vertical-align: bottom;
  }
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
