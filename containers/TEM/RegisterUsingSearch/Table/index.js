import React from "react";
import { Table as AntTable } from "components";
import { columns } from "./columns";

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
