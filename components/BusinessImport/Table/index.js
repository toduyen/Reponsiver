import React from "react";
import { columnsDNVN, columnsDNRR, columnsDNBTH, columnsDSDNCM } from "./columns";
import { Table as AntTable } from "components";
import { TableWrapper } from "./styles";

export const TableErrors = React.forwardRef(
  ({ getFieldDecorator, code, ...props }, ref) => {
    let cls = null;

    switch (code) {
      case "DNVN":
        cls = columnsDNVN;
        break;

      case "DNRR":
        cls = columnsDNRR;
        break;

      case "DNBTH":
        cls = columnsDNBTH;
        break;

      case "DSDNCM":
        cls = columnsDSDNCM;
        break;

      default:
        break;
    }

    return (
      <TableWrapper>
        <AntTable
          {...props}
          ref={ref}
          columns={cls()}
          bordered
          pagination={false}
        />
      </TableWrapper>
    );
  }
);
