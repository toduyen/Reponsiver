import { Col, Row } from "antd";
import { pageSignBox } from "components/PagePattern";
import moment from "moment";
import React from "react";
import { formatCurrencyNumber } from "utils/index";
import { Modal, ViewPopupWrapper } from "./styles";
import { handleCKS } from "utils/helper";

class ViewDataPopup07TEM extends React.Component {
  render() {
    const { onCancel } = this.props;
    const {
      data,
      data: { nntcks, ngayGui },
    } = this.props;
    const ngay = moment(ngayGui, "DD/MM/YYYY HH:mm:ss");
    const ntao = moment(handleCKS(data.nntcks).nky || ngay);

    const formatDate = (date) => {
      return (date || "").match(/\d{2}\/\d{2}\/\d{4}/);
    };

    if (Object.keys(data).length <= 0) return "";

    return (
      <Modal visible={true} footer={null} onCancel={onCancel} closable={true}>
        <ViewPopupWrapper>
          <div className="wrap-pop">
            <div className="heading-ct">
              <div className="code">
                <b>Mẫu số: 07/TEM</b>
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
                    {/* {data?.tenCqt} */}
                  </p>
                  <strong
                    style={{
                      fontSize: "13pt",
                      textTransform: "uppercase",
                      width: "100%",
                    }}
                    className="text-has-border"
                  >
                    {data?.ten}
                  </strong>
                  <hr
                    style={{
                      textAlign: "center",
                      color: "black",
                      width: "50%",
                      marginTop: 0,
                    }}
                  />
                  <span>Số: {data?.toKhaiId || ""}</span>
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
                    {data?.diaDanh || "..."}, ngày {ntao?.format("DD")} tháng{" "}
                    {ntao.format("MM")} năm {ntao.format("YYYY")}
                  </i>
                </div>
              </div>
            </div>
            <div className="pop-content">
              <div className="content-head">
                <div style={{ fontSize: "13pt" }}>
                  <strong style={{ marginBottom: "20px", fontSize: "14pt" }}>
                    ĐƠN ĐỀ NGHỊ MUA TEM ĐIỆN TỬ THUỐC LÁ HOẶC TEM ĐIỆN TỬ RƯỢU
                    SẢN XUẤT ĐẾ TIÊU THỤ TRONG NƯỚC
                  </strong>
                </div>
                <div>Kính gửi: {data?.tenCqt}</div>
              </div>
              <div className="content-info">
                <Row>
                  <Col span={24}>
                    <p className="no-space">Tên tổ chức, cá nhân: {data.ten}</p>
                    <p className="no-space">Mã số thuế: {data.mst}</p>
                    <p className="no-space">Địa chỉ: {data.diaChi}</p>
                    <p className="no-space">
                      Điện thoại: {data.dienThoai}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fax: {data.fax}
                    </p>
                    <p className="no-space">
                      Giấy phép sản xuất: {data.soGiayPhep}
                    </p>
                    <p className="no-space">
                      Tên người được giới thiệu đến mua tem: {data.nguoiLienHe}
                    </p>
                    <p className="no-space">
                      Số CMND/Căn cước/Hộ chiếu: {data.soGiayTo}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngày cấp:{" "}
                      {formatDate(data.ngayCap)}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nơi cấp: {data.noiCap}
                    </p>
                  </Col>
                  <Col span={24}>
                    <p className="p-space">
                      Căn cứ kế hoạch đăng ký nhận tem, Chúng tôi đề nghị mua
                      tem như sau:
                    </p>
                  </Col>

                  <Col span={24}>
                    <div className="dvt">
                      <i>Đơn vị tính: Tem</i>
                    </div>
                    <table className="res-tb">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th className="tb-stt">STT</th>
                          <th className="tb-thh">Tên loại tem điện tử</th>
                          <th className="tb-dvt">Ký hiệu mẫu tem</th>
                          <th className="tb-sl">Số lượng tem tồn đầu kỳ</th>
                          <th className="tb-sl">Số lượng tem mua kỳ này</th>
                          <th className="tb-sl">Số lượng tem được sử dụng</th>
                          <th className="tb-sl">Lý do</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="tx-center">(1)</td>
                          <td className="tx-center">(2)</td>
                          <td className="tx-center">(3)</td>
                          <td className="tx-center">(4)</td>
                          <td className="tx-center">(5)</td>
                          <td className="tx-center">(6=4+5)</td>
                          <td className="tx-center">(7)</td>
                        </tr>
                        {(data?.chitiet || []).map((el, idx) => (
                          <tr>
                            <td className="tx-center">{idx + 1}</td>
                            <td>{el.ten}</td>
                            <td>{el.kyHieuMau}</td>
                            <td className="tx-center">
                              {formatCurrencyNumber(el.slTon)}
                            </td>
                            <td className="tx-center">
                              {formatCurrencyNumber(el.slMua)}
                            </td>
                            <td className="tx-center">
                              {formatCurrencyNumber(el.slSuDung)}
                            </td>
                            <td>{el.lyDo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <p className="p-space">
                      Tôi xin cam kết hoàn toàn chịu trách nhiệm trước pháp luật
                      về việc quản lý, sử dụng tem điện tử thuốc lá hoặc tem
                      điện tử rượu theo đúng quy định./.
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
                  {!!nntcks && (
                    <div className="sign-flex">
                      <b className="tx-center tt-style">
                        NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT
                      </b>
                      <div
                        style={{ textAlign: "center", marginBottom: "10px" }}
                      >
                        <i>(Chữ ký số, chữ ký điện tử của người nộp thuế)</i>
                      </div>
                      {/* <b className="tx-center tt-style">
                        {(data.hthuc || "").toUpperCase()}
                      </b>
                      <b className="tx-center tt-style">
                        {(data.cdanh || "").toUpperCase()}
                      </b> */}
                      {/* <i>(Ký ghi rõ họ tên và đóng dấu)</i> */}
                      {pageSignBox(nntcks)}
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

export default ViewDataPopup07TEM;
