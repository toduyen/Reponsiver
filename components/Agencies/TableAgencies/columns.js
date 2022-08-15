import { Form } from "antd";
import React from "react";

export const columns1 = function ({ startIndex }) {
  return [
    {
      title: "STT",
      key: "stt",
      dataIndex: "stt",
      render: (name, row, index) => <span>{startIndex + index + 1}</span>,
      align: "center",
      width: 100
    },
    {
      title: <span>Mã cơ quan ban hành</span>,
      key: "matms",
      dataIndex: "matms",
      align: "center",
      width: 200
    },
    {
      title: <span>Tên cơ quan ban hành</span>,
      key: "ten",
      dataIndex: "ten",
      align: "left",
    },
  ];
};
