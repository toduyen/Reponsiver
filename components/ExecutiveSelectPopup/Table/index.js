import React from "react";
import { Table as AntTable } from "components";
import { columnsList } from "./columns";

export const ExecutiveTable = React.forwardRef(
  ({ ...props }, ref) => {
        return <AntTable
            {...props}
            ref={ref}
            columns={columnsList()}
            bordered
            pagination={false}
            maxHeight={800}
        />
  }
);
