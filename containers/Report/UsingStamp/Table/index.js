import { Table as AntTable } from "components";
import React from "react";
import { columns, columns1 } from "./columns";

export const Table1 = React.forwardRef(
  ({ getFieldDecorator, startIndex, ...props }, ref) => (
    <AntTable
      {...props}
      ref={ref}
      columns={columns1({ getFieldDecorator, startIndex })}
      bordered
      pagination={false}
    />
  )
);

export const TableReport = React.forwardRef(
  ({ getFieldDecorator, startIndex, handleRender, ...props }, ref) => (
    <AntTable
      {...props}
      ref={ref}
      columns={columns({ getFieldDecorator, startIndex, handleRender })}
      bordered
      pagination={false}
    />
  )
);
