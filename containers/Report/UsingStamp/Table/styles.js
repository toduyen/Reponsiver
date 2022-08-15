import styled from "styled-components";
import { Table as AntTable } from "antd";

export const Table = styled(AntTable)`
.ant-table-placeholder {
  z-index: 0
}
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
  }
  .ant-selected-row {
    background-color: #E6F6FF;
  }
`;
