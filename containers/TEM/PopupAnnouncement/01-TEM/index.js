import { Col, Row } from "antd";
import { pageSignBox } from "components/";
import { withConnect } from "hocs";
import moment from "moment";
import { withRouter } from "next/router";
import React from "react";
import { formatCurrencyNumber } from "utils/";
import { handleCKS } from "utils/helper";
import { Checkbox, DataItem, Modal, ViewDataWrapper } from "./styles";
import { LOAI_DK } from "consts";

const renderCKSBox = (data) => {
  if (!data.nntcks) {
    return <div style={{ height: 150 }}></div>;
  }
  const ngay = moment(data.ngayGui, "DD/MM/YYYY HH:mm:ss");
  const ntao = moment(handleCKS(data.nntcks).nky || ngay);

  return (
    <div className="ft-sign">
      <div className="sign-dx only-one-sign">
        <span style={{ textAlign: "center" }}>
          {data?.diaDanh || "..."},{" "}
          {ntao.format("[ngày] DD [tháng] MM [năm] YYYY")}
        </span>
        <strong style={{ fontSize: "14pt" }}>
          NGƯỜI NỘP THUẾ hoặc ĐẠI DIỆN HỢP PHÁP CỦA NGƯỜI NỘP THUẾ
        </strong>
        <p>
          <i>(Chữ ký số, chữ ký điện tử của người nộp thuế)</i>
        </p>
        {pageSignBox(data?.nntcks)}
      </div>
      <div className="appendix"></div>
    </div>
  );
};

const ContractForm = ({ data, height }) => {
  const formatDate = (date) => {
    return (date || "").match(/\d{2}\/\d{2}\/\d{4}/);
  };
  return (
    <ViewDataWrapper
      // style={{ height: height || "39vw " }}
      className="wrapper-content custom-viewdata"
    >
      <div className="heading-content">
        <b className="code-ms">Mẫu số: 01/TEM</b>
        <div className="kh-ch">
          <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
          <span>Độc lập - Tự do - Hạnh phúc </span>
          <span>---------------</span>
        </div>
        <div className="title-heading">
          <div className="main-title" style={{ fontSize: "14pt" }}>
            <strong style={{ marginBottom: "20px", fontSize: "14pt" }}>
              TỜ KHAI
            </strong>
          </div>
          <p style={{ textAlign: "center" }}>
            <strong style={{ marginBottom: "20px", fontSize: "14pt" }}>
              Đăng ký sử dụng tem điện tử
            </strong>
          </p>
          <p style={{ textAlign: "center", fontSize: "14pt" }}>
            {LOAI_DK[data?.loaiDk]}
          </p>
        </div>
      </div>
      <div className="content-info">
        <ul className="list-fill-out list-fill-out-margin-bottom">
          <li>
            <DataItem label="Tên người nộp thuế:">{data.ten}</DataItem>
          </li>
          <li>
            <DataItem label="Mã số thuế:">{data.mst}</DataItem>
          </li>
          <li>
            <DataItem label="Cơ quan thuế quản lý:">{data.tenCqt}</DataItem>
          </li>
          <li>
            <Row align="middle">
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Người liên hệ:">{data.nguoiLienHe}</DataItem>
              </Col>
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Điện thoại liên hệ:">
                  {data.dienThoai}
                </DataItem>
              </Col>
            </Row>
          </li>
          <li>
            <Row align="middle">
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Địa chỉ liên hệ:">{data.diaChi}</DataItem>
              </Col>
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Địa chỉ thư điện tử:">
                  {data.thuDienTu}
                </DataItem>
              </Col>
            </Row>
          </li>
        </ul>
        <ul className="list-fill-out list-fill-out-margin-bottom">
          <li>
            Căn cứ Giấy phép sản xuất sản phẩm thuốc lá hoặc Giấy phép sản xuất
            sản phẩm rượu số {data.soGiayPhep} do {data.noiCap} cấp ngày{" "}
            {formatDate(data.ngayCap)} (đính kèm theo Tờ khai này), trong đó có
            quy định:
          </li>
        </ul>
        <ul className="list-fill-out">
          <li>
            - Sản lượng thuốc lá hoặc sản lượng rượu được phép sản xuất để tiêu
            thụ trong nước là {formatCurrencyNumber(data.sanLuong)}.
          </li>
          <li>- Thời hạn được phép sản xuất là {formatDate(data.thoiHan)}.</li>
        </ul>
        <ul className="list-fill-out list-fill-out-margin-bottom">
          <li>
            Theo Thông tư số {data.soThongTu}{" "}
            {moment(data.ngayThongTu, "DD/MM/YYYY HH:mm:ss").format(
              "[ngày] DD [tháng] MM [năm] YYYY"
            )}{" "}
            của Bộ Tài chính, chúng tôi/tôi thuộc đối tượng sử dụng tem điện tử.
            Chúng tôi đăng ký/thay đổi thông tin đã đăng ký với cơ quan thuế về
            việc sử dụng tem điện tử như sau:
          </li>
        </ul>
        <ul className="list-fill-out">
          <li>
            - Áp dụng tem điện tử:
            <ul className="list-fill-out" style={{ paddingLeft: 20 }}>
              <Checkbox.Group value={[data.loaiAnChi]}>
                <li>
                  <Checkbox value={"TR"}>Tem điện tử rượu.</Checkbox>
                </li>
                <li>
                  <Checkbox value={"TTL"}>Tem điện tử thuốc lá.</Checkbox>
                </li>
              </Checkbox.Group>
            </ul>
          </li>
        </ul>
        <div>
          Chúng tôi cam kết hoàn toàn chịu trách nhiệm trước pháp luật về tính
          chính xác, trung thực của nội dung nêu trên và thực hiện theo đúng quy
          định của pháp luật.
        </div>
      </div>
      {/* <div className="ft-sign">
        <p style={{ textAlign: "right", paddingRight: "45px" }}>
          {data?.ddanh}, ngày {nlap.format("DD")} tháng {nlap.format("MM")} năm{" "}
          {nlap.format("YYYY")}
        </p>
        <div className="sign-dx only-one-sign">
          <h3 style={{ paddingRight: "60px" }}>
            <p>NGƯỜI NỘP THUẾ</p>
            <p>
              <i>(Chữ ký số người nộp thuế))</i>
            </p>
            {renderCKSBox(data)}
          </h3>
        </div>
        <div className="appendix"></div>
      </div> */}

      {renderCKSBox(data)}
    </ViewDataWrapper>
  );
};

@withConnect((state) => ({ ...state.authReducer }))
export class ViewDataPopup01TEM extends React.Component {
  render() {
    const { visible = true, onCancel, data } = this.props;
    return (
      <Modal
        visible={visible}
        footer={null}
        onCancel={onCancel}
        closable={true}
      >
        <ContractForm data={data} />
      </Modal>
    );
  }
}

@withRouter
export class ViewData extends React.Component {
  onClick = () => {
    const { router } = this.props;
    router.push("/");
  };
  render() {
    const { data, height } = this.props;
    return (
      <Row justify="center">
        <Col span={24}>
          <ContractForm data={data} height={height} />
        </Col>
      </Row>
    );
  }
}
