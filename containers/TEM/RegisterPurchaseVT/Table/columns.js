import { DATE_FORMAT } from "components/patterns";
import { LOAI_DK, TTXLY_TEM } from "consts";
import moment from "moment";
import React from "react";
import { formatCurrencyNumber } from "utils";
import { Button } from "antd";

export const columns = function ({
  startIndex,
  onViewProposal = () => {},
  onViewAnnouncement = () => {},
}) {
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, row, index) => <span>{startIndex + index + 1}</span>,
      align: "center",
      width: 50,
    },
    {
      title: "Mã số thuế",
      dataIndex: "mst",
      key: "mst",
      align: "center",
      width: 150,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      // align: "center",
      width: 150,
    },
    {
      title: "Mã CQT",
      dataIndex: "maCqt",
      key: "maCqt",
      align: "center",
      width: 100,
    },
    {
      title: "Tên CQT",
      dataIndex: "tenCqt",
      key: "tenCqt",
      // align: "center",
      width: 150,
    },
    {
      title: "Ngày gửi",
      dataIndex: "ngayGui",
      key: "ngayGui",
      align: "center",
      width: 150,
    },
    {
      title: "Số giấy phép",
      dataIndex: "soGiayPhep",
      key: "soGiayPhep",
      align: "center",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      // align: "center",
      render: (text) => TTXLY_TEM[text],
      width: 150,
    },
    {
      title: "Lý do",
      dataIndex: "lyDo",
      key: "lyDo",
      align: "center",
      // render: (text) => moment(text).format(DATE_FORMAT),
      width: 200,
    },
    {
      title: "Năm",
      dataIndex: "nam",
      key: "nam",
      align: "center",
      // render: (text) => moment(text).format(DATE_FORMAT),
      width: 80,
    },
    {
      title: "Đề nghị",
      dataIndex: "",
      key: "btnProposal",
      align: "center",
      width: 130,
      render: (data) => (
        <Button
          className="btn-link"
          onClick={(e) => {
            e.stopPropagation();
            onViewProposal(data);
          }}
          type="link"
          block
        >
          <text underline>Xem đề nghị</text>
        </Button>
      ),
    },
    {
      title: "Thông báo",
      dataIndex: "",
      key: "btnAnnouncement",
      align: "center",
      width: 130,
      render: (data) => (
        <Button
          className="btn-link"
          onClick={(e) => {
            e.stopPropagation();
            onViewAnnouncement(data);
          }}
          type="link"
          block
          hidden={!data?.toKhaiId}
        >
          <text underline>Xem thông báo</text>
        </Button>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "btnThaoTac",
      align: "center",
      width: 130,
      render: (data) => (
        <Row type="flex" justify="center" gutter={20}>
          <ButtonIcon
            disabled={
              _.isEmpty(data) || ![5].includes(data.trangThai)
            }
            title="Ký ban hành"
            icon="icon_phe_duyet_va_ky"
            onClick={() => onClickKyBH(data)}
          />
        </Row>
      ),
    },
  ];
};
