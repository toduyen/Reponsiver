import { Table as AntTable } from "components";
import React from "react";
import { columns, columnsDetail } from "./columns";

export const Table = React.forwardRef(
  ({ startIndex, onViewTK, onViewAnnouncement, onClickChiTiet, ...props }, ref) => (
    <AntTable
      {...props}
      ref={ref}
      columns={columns({ startIndex, onViewTK, onViewAnnouncement, onClickChiTiet })}
      bordered
      pagination={false}
    />
  )
);

export const TableDetail = React.forwardRef(
  ({ startIndex = 0, ...props }, ref) => (
    <AntTable
      {...props}
      ref={ref}
      columns={columnsDetail({ startIndex })}
      bordered
      pagination={false}
    />
  )
);
