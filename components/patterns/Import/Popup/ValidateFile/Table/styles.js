import styled from "styled-components";
import { Table as AntTable, Button as AntButton } from "antd";

export const Table = styled(AntTable)`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
  }
  .ant-table-placeholder {
    width: calc(100% - 1px);
    &-empty {
    }
  }
`;

export const InputButtonWrap = styled.div`
  display: flex;
  flex: 1;
  button {
    margin-top: 10px;
    margin-left: 5px;
  }
`;

export const NoBorderButton = styled(AntButton)`
  /* border: 0; */
  background-color: transparent;
  box-shadow: none;
`;
