import { Col, Row } from "antd";
import { pageSignBox } from "components/PagePattern";
import moment from "moment";
import React from "react";
import { formatCurrencyNumber } from "utils/";
import { Modal, ViewPopupWrapper } from "./styles";
import { handleCKS } from "utils/helper";

const KQUA = {
  1: "chấp nhận",
  0: "không chấp nhận",
};

class ViewDataPopup02TEM extends React.Component {
  render() {
    const { onCancel } = this.props;
    const {
      data,
      data: {
        pdcks,
        pdldngay,
        bhcks,
        bhvtngay,
        dangKyTem = "Đăng ký sử dụng tem điện tử",
        cqt: { tenqltctren, mtinh, ten },
      },
    } = this.props;
    const ngay = moment(data.ngayGui, "DD/MM/YYYY HH:mm:ss");
    const ntao = moment(
      handleCKS(data.bhcks).nky || handleCKS(data.pdcks).nky || ngay
    );

    // if (Object.keys(data).length <= 0) return "";

    return (
      <Modal visible={true} footer={null} onCancel={onCancel} closable={true}>
        <ViewPopupWrapper>
          <div className="wrap-pop">
            <div className="heading-ct">
              <div className="code">
                <b>Mẫu số: 02/TB/TEM</b>
              </div>
              <div className="lg-plan">
                <div
                  style={{
                    maxWidth: "45%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13pt",
                      textTransform: "uppercase",
                      marginBottom: 0,
                    }}
                  >
                    {tenqltctren}
                  </p>
                  <strong
                    style={{
                      fontSize: "13pt",
                      textTransform: "uppercase",
                      width: "100%",
                    }}
                    className="text-has-border"
                  >
                    {ten}
                  </strong>
                  <hr
                    style={{
                      textAlign: "center",
                      color: "black",
                      width: "50%",
                      marginTop: 0,
                    }}
                  />
                  <span>Số: {data?.soTbao || ""}</span>
                </div>
                {/* -- */}
                <div
                  style={{
                    // width: "55%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <h3 style={{ marginBottom: 0 }}> */}
                  <strong style={{ fontSize: "13pt" }}>
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </strong>
                  {/* </h3>
                <h3> */}
                  <strong style={{ fontSize: "13pt", width: "60%" }}>
                    Độc lập - Tự do - Hạnh phúc
                  </strong>
                  {/* </h3> */}
                  <hr
                    style={{
                      textAlign: "center",
                      color: "black",
                      width: "60%",
                      marginTop: 0,
                    }}
                  />
                  <i>
                    {mtinh || "..."}, ngày {ntao?.format("DD")} tháng{" "}
                    {ntao.format("MM")} năm {ntao.format("YYYY")}
                  </i>
                </div>
              </div>
            </div>
            <div className="pop-content">
              <div className="content-head">
                <div style={{ fontSize: "13pt" }}>
                  <strong style={{ marginBottom: "20px", fontSize: "14pt" }}>
                    THÔNG BÁO
                  </strong>
                </div>
                <div style={{ fontSize: "13pt" }}>
                  <strong style={{ marginBottom: "20px", fontSize: "14pt" }}>
                    Thông báo về việc {KQUA[data.ketQua]} {dangKyTem}
                  </strong>
                </div>
                <hr
                  style={{ textAlign: "center", color: "black", width: "50%" }}
                />
                <div>
                  Kính gửi: {data?.ten} ({"MST: "}
                  {data?.mst})
                </div>
              </div>
              <div className="content-info">
                <Row>
                  <Col span={24}>
                    <p className="p-space">
                      Căn cứ {dangKyTem} của Người nộp thuế (NNT) gửi tới cơ
                      quan thuế lúc{" "}
                      {moment(data.ngayGui, "DD/MM/YYYY HH:mm:ss").format(
                        "HH [giờ] mm [phút] ss [giây ngày] DD/MM/YYYY"
                      )}
                      .
                    </p>
                    <p className="p-space">
                      Cơ quan thuế thông báo {KQUA[data.ketQua]} {dangKyTem} của
                      NNT.
                    </p>
                    <p className="p-space">
                      {!!data.lyDo && `Lý do không chấp nhận: ${data.lyDo}`}
                    </p>
                    <p className="p-space">
                      Cơ quan thuế thông báo để người nộp thuế biết, thực
                      hiện./.
                    </p>
                  </Col>
                </Row>

                <div className="sign-row">
                  <div className="taken-place">
                    <p className="p-no-space">
                      <b>
                        <i>Nơi nhận:</i>
                      </b>
                    </p>
                    <p className="p-no-space">- Như trên;</p>
                    <p className="p-no-space">- Lưu: VT,</p>
                  </div>
                  {(!!pdcks || !!bhcks) && (
                    <div className="sign-flex">
                      <b className="tx-center tt-style">
                        {!!data.maHthuc && data.maHthuc !== 'KD' && `${(data.maHthuc || "").toUpperCase()}. ${(data.cdanhUquyen || "").toUpperCase()}`}
                      </b>
                      <b className="tx-center tt-style">
                        {(data.cdanh || "").toUpperCase()}
                      </b>
                      {/* <i>(Ký ghi rõ họ tên và đóng dấu)</i> */}
                      {pageSignBox(pdcks, pdldngay)}
                      {pageSignBox(bhcks, bhvtngay)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ViewPopupWrapper>
      </Modal>
    );
  }
}

export default ViewDataPopup02TEM;
