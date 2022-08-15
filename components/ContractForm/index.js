import React from "react";
import { withConnect } from "hocs";
import { Row, Col, Button } from "antd";
import { Modal, DataItem, ViewDataWrapper, Checkbox } from "./styles";
import moment from "moment";
import { withRouter } from "next/router";
import { formatCksSignDate, handleCKS } from "utils/helper";
import { pageSignBox } from "..";

const dayNow = moment().format("DD");
const monthNow = moment().format("MM");
const yearNow = moment().format("YYYY");
const convertMoment = (moment) => {
  return moment(moment).format("DD/MM/YYYY");
};

const htdkOptions = {
  1: "Thêm mới",
  2: "Gia hạn",
  3: "Ngừng sử dụng",
};
const getNBCKS = (nnt_signature) => {
  return handleCKS(nnt_signature).ngky;
};

const renderCKSBox = (data) => {
  if (data?.nnt_signature) {
    let CKSData = JSON.parse(data?.nnt_signature);
    let snTime = moment(CKSData?.SigningTime);
    const nlap = moment(data.nlap);

    return (
      // <div className="sign-box">
      //   <span>Signature Valid</span>
      //   <span>Ký bởi {getNBCKS(CKSData)}</span>
      //   <span>
      //     Ký ngày:{" "}
      //     {CKSData?.SigningTime ? moment(CKSData?.SigningTime).format("YYYY-MM-DD[T]HH:mm:ss") : ""}
      //   </span>
      // </div>

      <div className="ft-sign">
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
            {/* <div className="sign-box">
              <span>Signature Valid</span>
              <span>Ký bởi {getNBCKS(CKSData)}</span>
              <span>
                Ký ngày:{" "}
                {CKSData?.SigningTime
                  ? snTime.format("YYYY-MM-DD[T]HH:mm:ss")
                  : ""}
              </span>
            </div> */}
            {pageSignBox(data?.nnt_signature, CKSData?.SigningTime)}
          </h3>
        </div>
        <div className="appendix"></div>
      </div>
    );
  }

  return <div style={{ height: 150 }}></div>;
};

const ContractForm = ({ data, height }) => {
  const nlap = moment(data.nlap, "YYYY-MM-DDTHH:mm:ss");
  return (
    <ViewDataWrapper
      style={{ height: height || "39vw " }}
      className="wrapper-content custom-viewdata"
    >
      <div className="heading-content">
        <b className="code-ms">Mẫu số: 01/ĐKTĐ-HĐĐT</b>
        <div className="kh-ch">
          <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
          <span>Độc lập - Tự do - Hạnh phúc </span>
          <span>---------------</span>
        </div>
        <div className="title-heading">
          <h2 className="main-title" style={{ fontSize: "35px" }}>
            TỜ KHAI
          </h2>
          <p style={{ textAlign: "center" }}>
            <b>
              {data?.hthuc == 1 ? "Đăng ký " : "Thay đổi "} thông tin sử dụng
              hóa đơn điện tử
            </b>
          </p>
          <p style={{ textAlign: "center" }}>
            {data?.hthuc == 1 ? "Đăng ký mới" : "Thay đổi thông tin"}
          </p>
        </div>
      </div>
      <div className="content-info">
        <ul className="list-fill-out list-fill-out-margin-bottom">
          <li>
            <DataItem label="Tên người nộp thuế:">{data.tnnt}</DataItem>
          </li>
          <li>
            <DataItem label="Mã số thuế:">{data.mst}</DataItem>
          </li>
          <li>
            <DataItem label="Cơ quan thuế quản lý:">{data.cqtqly}</DataItem>
          </li>
          <li>
            <Row align="middle">
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Người liên hệ:">{data.nlhe}</DataItem>
              </Col>
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Điện thoại liên hệ:">{data.dtlhe}</DataItem>
              </Col>
            </Row>
          </li>
          <li>
            <Row align="middle">
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Địa chỉ liên hệ:">{data.dclhe}</DataItem>
              </Col>
              <Col className="custom-viewdata_field" span={24}>
                <DataItem label="Thư điện tử:">{data.dctdtu}</DataItem>
              </Col>
            </Row>
          </li>
        </ul>
        <ul className="list-fill-out list-fill-out-margin-bottom">
          <li>
            Theo nghị định số 123/2020/NĐ-CP ngày 19 tháng 10 năm 2020 của Chính
            phủ, chúng tôi/tôi thuộc đối tượng sử dụng hóa đơn điện tử. Chúng
            tôi/tôi đăng ký/thay đổi thông tin đã đăng ký với cơ quan thuế về
            việc sử dụng hóa đơn điện tử như sau:
          </li>
        </ul>
        <label htmlFor>1. Hình thức hóa đơn:</label>
        {/* <Checkbox.Group 
          // value={[data?.cma]}
        > */}
        <ul className="list-fill-out">
          <li>
            <Checkbox checked={data?.cma == 1} value={1}>
              Có mã của cơ quan thuế
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.kma == 1} value={0}>
              Không có mã của cơ quan thuế
            </Checkbox>
          </li>
        </ul>
        {/* </Checkbox.Group> */}
        <label htmlFor>2. Hình thức gửi dữ liệu hóa đơn điện tử:</label>
        <ul className="list-fill-out">
          <li>
            a. Trường hợp sử dụng hóa đơn điện tử có mã không phải trả tiền dịch
            vụ theo khoản 1 Điều 14 của Nghị định:
            <ul className="list-fill-out" style={{ paddingLeft: 20 }}>
              <li>
                <Checkbox checked={data?.nntdbkkhan == 1}>
                  Doanh nghiệp nhỏ và vừa, hợp tác xã, hộ, cá nhân kinh doanh
                  tại địa bàn có điều kiện kinh tế xã hội khó khăn, địa bàn có
                  điều kiện kinh tế xã hội đặc biệt khó khăn.
                </Checkbox>
              </li>
              <li>
                <Checkbox checked={data?.nntktdnubnd == 1}>
                  Doanh nghiệp nhỏ và vừa khác theo đề nghị của Ủy ban nhân dân
                  tỉnh, thành phố trực thuộc trung ương gửi Bộ Tài chính trừ
                  doanh nghiệp hoạt động tại các khu kinh tế, khu công nghiệp,
                  khu công nghệ cao.
                </Checkbox>
              </li>
            </ul>
          </li>
          <li>
            b. Trường hợp sử dụng hóa đơn điện tử không có mã của cơ quan thuế:
            <ul className="list-fill-out" style={{ paddingLeft: 20 }}>
              <li>
                <Checkbox checked={data?.cdlttdcqt == 1}>
                  Chuyển dữ liệu hóa đơn điện tử trực tiếp đến cơ quan thuế
                  (điểm b1, khoản 3, Điều 22 của Nghị định).
                </Checkbox>
              </li>
              <li>
                <Checkbox checked={data?.cdlqtvan == 1}>
                  Thông qua tổ chức cung cấp dịch vụ hóa đơn điện tử (điểm b2,
                  khoản 3, Điều 22 của Nghị định).
                </Checkbox>
              </li>
            </ul>
          </li>
        </ul>
        <label htmlFor>3. Phương thức chuyển dữ liệu hóa đơn điện tử:</label>
        <ul className="list-fill-out">
          <li>
            <Checkbox checked={data.cddu == 1}>
              Chuyển đầy đủ nội dung từng hóa đơn.
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data.cbthop == 1}>
              Chuyển theo bảng tổng hợp dữ liệu hóa đơn điện tử (điểm a1, khoản
              3, Điều 22 của Nghị định).
            </Checkbox>
          </li>
        </ul>
        <label htmlFor>4. Loại hóa đơn sử dụng:</label>
        <ul className="list-fill-out">
          <li>
            <Checkbox checked={data?.hdgtgt == 1} value="HDGTGT">
              Hóa đơn GTGT
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.hdbhang == 1} value="HDBHang">
              Hóa đơn bán hàng
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.hdbtscong == 1} value="HDBTSCong">
              Hóa đơn bán tài sản công
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.hdbhdtqgia == 1} value="HDBHDTQGia">
              Hóa đơn bán hàng dự trữ quốc gia
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.hdkhac == 1} value="HDKhac">
              Các loại hóa đơn khác
            </Checkbox>
          </li>
          <li>
            <Checkbox checked={data?.ctu == 1} value="CTu">
              Các chứng từ được in, phát hành, sử dụng và quản lý như hóa đơn.
            </Checkbox>
          </li>
        </ul>
        <label htmlFor>5. Danh sách chứng thư số sử dụng</label>
        <div className="scroll-ct-tb" id="style-scr1">
          <table className="res-tb">
            <thead>
              <tr className="kh-ch">
                <th className="tb-stt">STT</th>
                <th rowSpan={2} className="tb-name-s">
                  Tên tổ chức cơ quan <br /> chứng thực/cấp/công nhận <br /> chữ
                  ký số, chữ ký điện tử
                </th>
                <th>Số sê-ri chứng thư</th>
                <th colSpan={2} className="tb-hdct">
                  <span>Thời hạn sử dụng chứng thư số</span>
                  <div className="sl-x-2">
                    <span>Từ ngày</span>
                    <span>Đến ngày</span>
                  </div>
                </th>
                <th>
                  Hình thức đăng ký <br /> (Thêm mới, gia hạn, ngừng sử dụng
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.dsctssdung?.map((item, index) => (
                <tr>
                  <td className="tx-center">{index + 1}</td>
                  <td>{item.ttchuc}</td>
                  <td className="tx-center">{item.seri}</td>
                  <td className="tx-center">
                    {item.tngay && moment(item.tngay).format("DD/MM/YYYY")}
                  </td>
                  <td className="tx-center">
                    {item.dngay && moment(item.dngay).format("DD/MM/YYYY")}
                  </td>
                  <td>{item.hthuc && htdkOptions[item.hthuc]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
export class ViewDataPopup extends React.Component {
  render() {
    const { visible, onCancel, data } = this.props;
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
