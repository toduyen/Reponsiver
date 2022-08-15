import { STATUS_REPORT } from "consts";
import moment from "moment";
import React from "react";
import { formatCurrencyNumber } from "utils";

export const columns1 = function ({ startIndex = 0 }) {
  const renderContent = (value, row, index) => {
    return formatCurrencyNumber(value || "0");
  };

  return [
    {
      title: "STT",
      width: 50,
      key: "stt",
      dataIndex: "stt",
      render: (value) => startIndex + value,
      align: "center",
    },
    {
      title: "Mã CQT",
      key: "mcqtqly",
      dataIndex: "mcqtqly",
      align: "center",
      width: 100,
    },
    {
      title: "Tên CQT",
      key: "tcqtqly",
      dataIndex: "tcqtqly",
      // align: "center",
      width: 250,
    },
    {
      title: "Số lượng lũy kế",
      children: [
        {
          title: "Tất cả",
          key: "tglke",
          dataIndex: "tglke",
          align: "center",
          render: renderContent,
          width: 150,
        },
        {
          title: "Chưa xử lý",
          key: "tk01",
          dataIndex: "tk01",
          align: "center",
          render: renderContent,
          width: 150,
        },
        {
          title: "Cán bộ đã rà soát trình Phụ trách bộ phận",
          key: "tk2367",
          dataIndex: "tk2367",
          align: "center",
          render: renderContent,
          width: 150,
        },
        {
          title: "Phụ trách bộ phận đã duyệt và trình Lãnh đạo Cơ quan thuế",
          key: "tk4",
          dataIndex: "tk4",
          align: "center",
          render: renderContent,
          width: 150,
        },
        {
          title:
            "Lãnh đạo cơ quan thuế đã duyệt, ký số và chuyển văn thư ban hành",
          key: "tk5",
          dataIndex: "tk5",
          align: "center",
          render: renderContent,
          width: 150,
        },
        {
          title: "Văn thư đã ký số cơ quan thuế và gửi thông báo cho NNT",
          key: "tk8",
          dataIndex: "tk8",
          align: "center",
          render: renderContent,
          width: 150,
        },
      ],
    },
    // {
    //   title: "Số lượng trong ngày",
    //   children: [
    //     {
    //       title: "Tất cả",
    //       key: "tca2",
    //       dataIndex: "tca2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //     {
    //       title: "Chưa xử lý",
    //       key: "cxly2",
    //       dataIndex: "cxly2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //     {
    //       title: "Cán bộ đã rà soát trình Phụ trách bộ phận",
    //       key: "cbdrsoat2",
    //       dataIndex: "cbdrsoat2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //     {
    //       title: (
    //         "Phụ trách bộ phận đã duyệt và trình Lãnh đạo Cơ quan thuế"
    //       ),
    //       key: "ptbpdpdvtldcqt2",
    //       dataIndex: "ptbpdpdvtldcqt2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //     {
    //       title: (
    //         "Lãnh đạo cơ quan thuế đã duyệt, ký số và chuyển văn thư ban hành"
    //       ),
    //       key: "ldcqtdd2",
    //       dataIndex: "ldcqtdd2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //     {
    //       title: (
    //         "Văn thư đã ký số cơ quan thuế và gửi thông báo cho NNT"
    //       ),
    //       key: "vtdkso2",
    //       dataIndex: "vtdkso2",
    //       align: "center",
    //       render: renderContent,
    //       width: 150,
    //     },
    //   ],
    // },
  ];
};

// export const columns = function ({ startIndex = 0, handleRender }) {
//   return [
//     {
//       title: "STT",
//       width: 50,
//       key: "stt",
//       dataIndex: "stt",
//       render: (name, row, index) => <span>{startIndex + index + 1}</span>,
//       align: "center",
//     },
//     {
//       title: "Tên tem",
//       key: "mta",
//       dataIndex: "mta",
//       width: 150,
//     },
//     {
//       title: "Ký hiệu mã tem",
//       key: "ntao",
//       dataIndex: "ntao",
//       render: (text) => text && moment(text).format("DD/MM/YYYY HH:mm:ss"),
//       align: "center",
//       width: 100,
//     },
//     {
//       title: "Số lượng tổ chức, cá nhân đăng ký sử dụng tem",
//       key: "ncnhat",
//       dataIndex: "ncnhat",
//       render: (text) => text && moment(text).format("DD/MM/YYYY HH:mm:ss"),
//       align: "center",
//       width: 100,
//     },
//     {
//       title: "Số lượng tổ chức, cá nhân nộp bảng tổng hợp",
//       key: "tthai",
//       dataIndex: "tthai",
//       render: (text) => STATUS_REPORT[text],
//       // align: "center",
//       width: 120,
//     },
//     {
//       title: "Số lượng tem sử dụng (số)",
//       key: "cbtao",
//       dataIndex: "cbtao",
//       // align: "center",
//       width: 100,
//     },
//     {
//       title: "Số lượng tem mất, cháy (số)",
//       key: "cbtao",
//       dataIndex: "cbtao",
//       // align: "center",
//       width: 100,
//     },
//     {
//       title: "Số lượng tem hủy (số)",
//       key: "cbtao",
//       dataIndex: "cbtao",
//       // align: "center",
//       width: 100,
//     },
//     {
//       title: "Tổng cộng",
//       key: "cbtao",
//       dataIndex: "cbtao",
//       // align: "center",
//       width: 100,
//     },
//     {
//       title: "Ghi chú",
//       key: "xkqua",
//       dataIndex: "xkqua",
//       render: (text, row, index) => handleRender(row),
//       align: "center",
//       width: 150,
//     },
//   ];
// };

//test cho ngày 10/8 di bao cao
export const columns = function ({ startIndex = 0, handleRender }) {
  return [
    {
      title: "STT",
      width: 50,
      key: "stt",
      dataIndex: "stt",
      render: (name, row, index) => <span>{startIndex + index + 1}</span>,
      align: "center",
    },
    {
      title: "Tên tem",
      key: "ten",
      dataIndex: "ten",
      width: 150,
    },
    {
      title: "Ký hiệu mã tem",
      key: "kyhieu",
      dataIndex: "kyhieu",
      // render: (text) => text && moment(text).format("DD/MM/YYYY HH:mm:ss"),
      align: "center",
      width: 100,
    },
    {
      title: "Số lượng tổ chức, cá nhân đăng ký sử dụng tem",
      key: "sldangky",
      dataIndex: "sldangky",
      // render: (text) => text && moment(text).format("DD/MM/YYYY HH:mm:ss"),
      align: "center",
      width: 100,
    },
    {
      title: "Số lượng tổ chức, cá nhân nộp bảng tổng hợp",
      key: "slnopbaocao",
      dataIndex: "slnopbaocao",
      // render: (text) => STATUS_REPORT[text],
      // align: "center",
      width: 120,
    },
    {
      title: "Số lượng tem sử dụng (số)",
      key: "slsudung",
      dataIndex: "slsudung",
      // align: "center",
      width: 100,
    },
    {
      title: "Số lượng tem mất, cháy (số)",
      key: "slmat",
      dataIndex: "slmat",
      // align: "center",
      width: 100,
    },
    {
      title: "Số lượng tem hủy (số)",
      key: "slhuy",
      dataIndex: "slhuy",
      // align: "center",
      width: 100,
    },
    {
      title: "Tổng cộng",
      key: "tongcong",
      dataIndex: "tongcong",
      // align: "center",
      width: 100,
    },
    {
      title: "Ghi chú",
      key: "ghichu",
      dataIndex: "ghichu",
      // render: (text, row, index) => handleRender(row),
      align: "center",
      width: 150,
    },
  ];
};
