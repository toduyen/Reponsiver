import { Table as AntTable } from "components";
import React from "react";

export const TableReport = React.forwardRef(({ ...props }, ref) => (
  <AntTable {...props} ref={ref} bordered pagination={false} />
));
