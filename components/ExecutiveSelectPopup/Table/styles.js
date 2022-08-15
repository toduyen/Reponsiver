import styled from "styled-components";
import { Table as AntTable } from "antd";

export const Table = styled(AntTable)`
  .ant-table-body {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 5px;
  }
`;
