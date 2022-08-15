import styled from "styled-components";
import { Table as AntTable } from "antd";

// export const Table = styled(AntTable)`
//   .ant-table-body {
//     margin-top: 20px;
//   }
//   .ant-table-thead > tr > th {
//     text-align: center;
//     padding: 5px;
//   }
//   .ant-table-tbody > tr > td {
//     padding: 5px;
//   }
//   .ant-selected-row {
//     background-color: #e6f6ff;
//   }
// `;

const TableWrapper = styled.div`
  padding: 15px;

  .ant-table-scroll {
    max-height: 400px;
  }

  .ant-table-body {
    max-height: fit-content !important;
  }
`;

export { TableWrapper };
