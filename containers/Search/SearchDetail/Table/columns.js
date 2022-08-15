import React from "react";
import { ButtonIcon } from "components/patterns";
import { Row } from "antd";
export const columns = function ({
  onClickChiTiet = () => {},
}) {
  return [
    {
      title: "Số hiệu block/thùng",
      dataIndex: "shBlock",
      key: "shBlock",
      align: "left",
      width: 50,
    },
    {
      title: "Mã QR",
      dataIndex: "qrCode",
      key: "qrCode",
      width: 150,
      align: "left",
    },
    {
      title: "Ký hiệu mẫu tem",
      dataIndex: "khmtem",
      key: "khtem",
      align: "left",
      width: 150,
    },
    {
      title: "Ký hiệu tem",
      dataIndex: "khtem",
      key: "khtem",
      align: "left",
      width: 150,
    },
    {
      title: "Năm phát hành",
      dataIndex: "namph",
      key: "namph",
      align: "left",
      width: 100,
    },
    {
      title: "Số nhảy tem đầu của Block/Thùng",
      dataIndex: "sntemdaublock",
      key: "sntemdaublock",
      align: "left",
      width: 150,
    },
    {
      title: "Số nhảy tem cuối của Block/Thùng",
      dataIndex: "sntemcuoiblock",
      key: "sntemcuoiblock",
      align: "left",
      width: 150,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "dvt",
      key: "dvt",
      align: "left",
      width: 150,
    },
    {
      title: "Thông tin sai",
      dataIndex: "tts",
      key: "tts",
      align: "left",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: "left",
      width: 150,
      render: (data) => (
          <Row type="flex" justify="center" gutter={20}>
            <ButtonIcon
                title="Sửa"
                icon="icon_sua"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickChiTiet(data);
                }}
            />
            <ButtonIcon
                title="Xóa"
                icon="icon_xoa_2"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickChiTiet(data);
                }}
            />
          </Row>
      ),
    },
  ];
};
