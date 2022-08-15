import { Col, Row } from "antd";
import { ButtonAnt, DATE_FORMAT } from "components/patterns";
import { withConnect } from "hocs";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { FormWrapper, Modal } from "./styles";

const TC_HD = {
  1: "Hoá đơn mới",
  2: "Hoá đơn thay thế",
  3: "Hoá đơn điều chỉnh",
};
const TT_HD = {
  1: "Hoá đơn mới",
  2: "Hoá đơn thay thế",
  3: "Hoá đơn điều chỉnh",
  4: "Hoá đơn đã bị thay thế",
  5: "Hoá đơn đã bị điều chỉnh",
  6: "Hoá đơn đã bị xoá/huỷ bỏ",
};
const TT_HDLQ_ACTION = {
  2: "Thay thế cho hóa đơn",
  3: "Điều chỉnh cho hóa đơn",
  4: "Bị thay thế bởi hóa đơn có",
  5: "Bị điều chỉnh bởi hóa đơn có",
};
const TT_HDLQ_ACTION_TTHAI_4 = {
  2: "Bị thay thế bởi hóa đơn có",
  1: "Thay thế cho hóa đơn",
};
const TTXLY_HDON_TO_CONTENT = {
  0: "Tổng cục Thuế đã nhận", //
  1: "Đang tiến hành kiểm tra điều kiện cấp mã", //
  2: "CBT từ chối hóa đơn theo từng lần phát sinh", //
  3: "Hóa đơn chưa được cấp mã", // Hóa đơn đủ điều kiện cấp mã
  4: "Hóa đơn không đủ điều kiện cấp mã", //
  5: "Đã cấp mã hóa đơn", //
  6: "", // Tổng cục thuế đã nhận không mã
  7: "", // Đã kiểm tra định kỳ HĐĐT không có mã
};

@withConnect((state) => ({ ...state.authReducer, ...state.commonReducer }))
class Popup extends React.Component {
  renderMaLoi = () => {
    const { invoiceData = {} } = this.props;
    if (isEmpty(invoiceData?.kqcht)) return;
    return <p>{invoiceData?.kqcht}.</p>;
  };

  renderTTHD = (ttxly) => {
    const { invoiceData = {} } = this.props;
    if ([6, 7].includes(ttxly)) return;
    return (
      <p>
        <div>
          Trạng thái xử lý hoá đơn: {TTXLY_HDON_TO_CONTENT[ttxly]} <br />
          {[2, 4].includes(ttxly) &&
            !isEmpty(invoiceData?.pdndungs) &&
            invoiceData?.pdndungs.length === 1 &&
            "Lý do: " + invoiceData?.pdndungs?.toString() + "."}
          {[2, 4].includes(ttxly) &&
            !isEmpty(invoiceData?.pdndungs) &&
            invoiceData?.pdndungs?.length > 1 && (
              <>
                <p style={{ margin: 0 }}>Lý do:</p>
                <ul>
                  {invoiceData?.pdndungs.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
      </p>
    );
  };

  renderTbRaSoatItem = (item, key) => {
    const TCTBAO = {
      1: "Huỷ",
      2: "Điều chỉnh",
      3: "Thay thế",
      4: "Giải trình",
    };
    const KQTN = ["Không tiếp nhận", "Tiếp nhận"];
    if (isEmpty(item)) return;

    if ([0].includes(item?.loai)) {
      return (
        <p key={key}>
          Hóa đơn có thông báo rà soát số {item?.so}, ngày thông báo{" "}
          {item?.ngay && moment(item?.ngay).format(DATE_FORMAT)}
          {item?.ldo ? `, lý do: ${item?.ldo}` : "."}
        </p>
      );
    }

    if ([1, 2].includes(item?.loai)) {
      return (
        <>
          {item.ttxly !== 8 && (
            <p key={key}>
              Hóa đơn có {item?.ten} ngày{" "}
              {item?.ngay && moment(item?.ngay).format(DATE_FORMAT)}. Tính chất{" "}
              {TCTBAO[item?.tctbao]}
              {item?.ldo ? `, lý do ${item?.ldo}` : ``}. Cán bộ thuế đang xử lý.
            </p>
          )}
          {item.ttxly === 8 && item?.kqtnhan == 0 && (
            <p key={key}>
              Hóa đơn có {item?.ten} ngày{" "}
              {item?.ngay && moment(item?.ngay).format(DATE_FORMAT)}. Tính chất{" "}
              {TCTBAO[item?.tctbao]}
              {item?.ldo ? `, lý do ${item?.ldo}` : ``}. Cơ quan thuế không tiếp
              nhận{item?.gchu ? `, lý do ${item?.gchu}` : "."}
            </p>
          )}
          {item.ttxly === 8 && item?.kqtnhan == 1 && (
            <p key={key}>
              Hóa đơn có {item?.ten} ngày{" "}
              {item?.ngay && moment(item?.ngay).format(DATE_FORMAT)}. Tính chất{" "}
              {TCTBAO[item?.tctbao]}
              {item?.ldo ? `, lý do ${item?.ldo}` : ""}. Cơ quan thuế tiếp nhận.
            </p>
          )}
        </>
      );
    }
  };

  renderKyHieuMs = () => {
    const { invoiceData = {} } = this.props;
    return (
      !isEmpty(invoiceData?.hdonLquans) &&
      invoiceData?.hdonLquans?.map(
        ({ khmshdon, khhdon, shdon, tchat, ttxly }) => (
          <>
            {[5, 6, 7].includes(ttxly) && (
              <>
                {invoiceData?.tthai === 4 && (
                  <p>
                    {TT_HDLQ_ACTION_TTHAI_4[tchat]} ký hiệu mẫu số{" "}
                    <b>{khmshdon}</b>, ký hiệu hóa đơn <b>{khhdon}</b>, số hóa
                    đơn <b>{shdon}</b>.
                  </p>
                )}
                {invoiceData?.tthai !== 4 && (
                  <p>
                    {TT_HDLQ_ACTION[invoiceData?.tthai]} ký hiệu mẫu số{" "}
                    <b>{khmshdon}</b>, ký hiệu hóa đơn <b>{khhdon}</b>, số hóa
                    đơn <b>{shdon}</b>.
                  </p>
                )}
              </>
            )}
          </>
        )
      )
    );
  };

  render() {
    const { invoiceData = {}, onCancel = () => {} } = this.props;
    return (
      <Modal
        visible={true}
        closable={false}
        footer={null}
        onCancel={onCancel}
        title="Xem chi tiết thông tin liên quan"
      >
        <FormWrapper>
          {!isEmpty(invoiceData) ? (
            <>
              <p />
              {this.renderMaLoi()}
              {/* {this.renderTTHD(invoiceData?.ttxly)} */}

              {/* Bỏ tính chất  */}
              {/* <p hidden={invoiceData?.tchat === 1}>  
              Tính chất hóa đơn: {TC_HD[invoiceData?.tthai]}
            </p> */}

              {!isEmpty(invoiceData?.hdtbssrses) &&
                invoiceData?.hdtbssrses.map((item, idx) =>
                  this.renderTbRaSoatItem(item, idx)
                )}

              {/* <p hidden={invoiceData?.tthai === 1}>
                Trạng thái hóa đơn: {TT_HD[invoiceData?.tthai]}.
              </p> */}

              {this.renderKyHieuMs()}
            </>
          ) : (
            <p hidden={invoiceData !== null}>
              Không tồn tại hóa đơn có thông tin trùng khớp với các thông tin tổ
              chức, cá nhân tìm kiếm.
            </p>
          )}
        </FormWrapper>
        <Row
          type="flex"
          justify="center"
          gutter={10}
          style={{ margin: "20px 0" }}
        >
          <Col>
            <ButtonAnt text="Đóng" onClick={onCancel} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export const PopupDetailRelatedInformation = Popup;
