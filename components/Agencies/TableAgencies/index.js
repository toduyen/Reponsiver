import React from "react";
import { Table as AntTable } from "components";
import { columns1 } from "./columns";

export const TableAgencies = React.forwardRef(({ ...props }, ref) => (
  <AntTable
    {...props}
    ref={ref}
    columns={columns1({
      ...props,
    })}
    bordered
    pagination={false}
  />
));
