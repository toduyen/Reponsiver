import React from "react";
import {Button } from "antd";

export const columnsList = function () {
  let columns = [
    {
      title: "STT",
      dataIndex: "order",
      key: "order",
      render: (name, row, index) => <span>{index + 1}</span>,
      align: "center",
      width: 80
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
  ];

  return columns;
};

