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
  onClickXuLy = () => { },
  onClickDuyet = () => { },
  onClickKyDuyet = () => { },
  onClickTuChoi = () => { },
  onClickChiTiet = () => { },
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
      width: 230,
      render: (data) => (
        <Row type="flex" justify="center" gutter={20}>
          <ButtonIcon
            disabled={_.isEmpty(data)}
            title="Xử lý"
            icon="icon_xu_ly"
            onClick={(e) => {
              e.stopPropagation();
              onClickXuLy(data);
            }}
          />
          <ButtonIcon
            disabled={
              _.isEmpty(data) || ![0, 1].includes(data.trangThai)
            }
            title="Duyệt"
            icon="icon_phe_duyet_va_ky"
            onClick={() => onClickDuyet(data)}
          />
          <ButtonIcon
            disabled={
              _.isEmpty(data) || ![3].includes(data.trangThai)
            }
            title="Ký duyệt"
            icon="icon_phe_duyet_va_ky"
            onClick={() => onClickKyDuyet(data)}
          />
          <ButtonIcon
            disabled={
              _.isEmpty(data) || ![0, 1].includes(data.trangThai)
            }
            title="Từ chối"
            icon="icon_tu_choi"
            onClick={() => onClickTuChoi(data)}
          />
          <ButtonIcon
            title="Xem chi tiết"
            icon="icon_xem_chi_tiet"
            disabled={_.isEmpty(data)}
            onClick={() => onClickChiTiet(data)}
          />
        </Row>
      ),
    },
  ];
};

export const columnsDetail = function ({ startIndex }) {
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
      title: "Tên loại tem",
      dataIndex: "ten",
      key: "ten",
      // align: "center",
      width: 150,
    },
    {
      title: "Ký hiệu mẫu",
      dataIndex: "kyHieuMau",
      key: "kyHieuMau",
      // align: "center",
      width: 150,
    },
    {
      title: "Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
      align: "center",
      width: 100,
    },
    {
      title: "Số lượng tồn",
      dataIndex: "slTon",
      key: "slTon",
      align: "center",
      render: (text) => formatCurrencyNumber(text),
      width: 150,
    },
    {
      title: "Số lượng mua kỳ này",
      dataIndex: "slMua",
      key: "slMua",
      align: "center",
      render: (text) => formatCurrencyNumber(text),
      width: 150,
    },
    {
      title: "Số lượng được sử dụng",
      dataIndex: "slSuDung",
      key: "slSuDung",
      align: "center",
      render: (text) => formatCurrencyNumber(text),
      width: 150,
    },
  ];
};
