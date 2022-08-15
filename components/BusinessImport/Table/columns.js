import { Form, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { BorderBottomInput } from "../../../components/patterns/Input";
import { HANDLE_STATUS } from "../../../consts/convention";
import { DATE_FORMAT } from "../../../components/patterns";
import { ButtonTable } from "../../../components";
import { formatToDate } from "utils/helper";

const { Item } = Form;

export const columnsDNVN = function () {
  return [
    {
      title: "STT",
      width: 64,
      dataIndex: "stt",
      key: "stt",
      render: (name, row, index) => <span>{index + 1}</span>,
      align: "center",
    },
    {
      title: <span>Mã số thuế</span>,
      dataIndex: "mst",
      key: "mst",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "mst" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
    {
      title: <span>Tên người nộp thuế</span>,
      dataIndex: "tnnt",
      key: "tnnt",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "tnnt" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
  ]
};

export const columnsDNRR = function () {
  return [
    {
      title: "STT",
      width: 64,
      dataIndex: "stt",
      key: "stt",
      render: (name, row, index) => <span>{index + 1}</span>,
      align: "center",
    },
    {
      title: <span>Mã số thuế</span>,
      dataIndex: "mst",
      key: "mst",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "mst" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
    {
      title: <span>Tên người nộp thuế</span>,
      dataIndex: "tnnt",
      key: "tnnt",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "tnnt" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
    {
      title: <span>Địa chỉ đăng ký</span>,
      dataIndex: "dchi",
      key: "dchi",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "dchi" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
    {
      title: <span>Lý do</span>,
      dataIndex: "ldo",
      key: "ldo",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "ldo" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
  ]
};

export const columnsDNBTH = function () {
  return [
    {
      title: "STT",
      width: 64,
      dataIndex: "stt",
      key: "stt",
      render: (name, row, index) => <span>{index + 1}</span>,
      align: "center",
    },
    {
      title: <span>Mã số thuế</span>,
      dataIndex: "mst",
      key: "mst",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "mst" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
    {
      title: <span>Ngành nghề kinh doanh</span>,
      dataIndex: "nnkdoanh",
      key: "nnkdoanh",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "nnkdoanh" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },

    {
      title: <span>Từ ngày</span>,
      dataIndex: "tngay",
      key: "tngay",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{formatToDate(value)}</span><br />
            { errorInfo[0]?.fieldName === "tngay" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },

    {
      title: <span>Đến ngày</span>,
      dataIndex: "dngay",
      key: "dngay",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{formatToDate(value)}</span><br />
            { errorInfo[0]?.fieldName === "dngay" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
  ]
};

export const columnsDSDNCM = function () {
  return [
    {
      title: "STT",
      width: 64,
      dataIndex: "stt",
      key: "stt",
      render: (name, row, index) => <span>{index + 1}</span>,
      align: "center",
    },
    {
      title: <span>Mã số thuế</span>,
      dataIndex: "mst",
      key: "mst",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{value}</span><br />
            { errorInfo[0]?.fieldName === "mst" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },

    {
      title: <span>Từ ngày</span>,
      dataIndex: "tngay",
      key: "tngay",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{formatToDate(value)}</span><br />
            { errorInfo[0]?.fieldName === "tngay" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },

    {
      title: <span>Đến ngày</span>,
      dataIndex: "dngay",
      key: "dngay",
      align: "center",
      render: (value, row, index) => {
        let errorInfo = row?.errors;

        return (
          <>
            <span>{formatToDate(value)}</span><br />
            { errorInfo[0]?.fieldName === "dngay" && <span style={{ color:'red' }}>{ errorInfo[0]?.errorName}</span>}
          </>
        );
      },
    },
  ]
};
