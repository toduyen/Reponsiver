/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import moment from "moment";
import { handleCKS } from "utils/helper";
import { STYLE_TB_MASTER_CSS } from "./style";

const TBHD = (dataDetail) => {
  let ngayXemXet = moment(dataDetail?.nlap);
  const ntaoValue = moment(dataDetail?.ntao);

  // ttChapNhan: 1 chấp nhận, 0 ko chấp nhận
  const ttChapNhan = dataDetail?.ttxnhan;
  //  hinhThucDky: 1 Đăng ký,  2 thay đổi thong tin (maybe :D)
  const hinhThucDky = dataDetail?.htdky;

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/TB-ĐKĐT ${moment().valueOf()}</title>
            <style>
                ${STYLE_TB_MASTER_CSS}
            </style>
        </head>
        <body id="print-layout" class="A4">
    `);
  w.document.write(`
  <div class="print-page">
  <div class="bg-container"></div>
  <div class="main-page">
    <div class="heading-ct">
      <b class="code">Mẫu số: 01/TB-ĐKĐT</b>
      <div class="lg-plan">
        <div style="max-Width: 45%">
        
          <h5 style="font-size: 13pt; text-transform: uppercase; font-weight: 400;">
              ${dataDetail?.tcqtctren?.toUpperCase() || ""} <br />
          </h5>
            <h5
              class="text-bold"
              style="font-size: 13pt; text-transform: uppercase"
            >
            ${dataDetail?.tcqt || ""}
            </h5>
            <hr
              style="
                  text-align: center;
                  color: black;
                  width: 35%;
                  margin-top: 0px;
              "
            />
            <p>Số: ${dataDetail?.so || ""}</p>
        </div>

        <div>
          <h5 class="text-bold" style="font-size: 13pt">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </h5>
          <h5 class="text-bold" style="font-size: 13pt">
            Độc lập - Tự do - Hạnh phúc
          </h5>
          <hr
            style="
                text-align: center;
                color: black;
                width: 35%;
                margin-top: 0px;"
          />
          <p>
          <i>
          ${dataDetail?.ddanh || "..."},
          ${moment(
            handleCKS(dataDetail.bhcks).nky ||
              dataDetail?.bhvtngay ||
              handleCKS(dataDetail.pdcks).nky ||
              dataDetail?.pdldngay ||
              ntaoValue
          ).format("[ngày] DD [tháng] MM [năm] YYYY")}
          </i>
          </p>
      </div>
    </div>
  </div>
  <div class="pop-content">
  <div class="content-head">
      <div style="font-size: 13pt">
          <h3 class="text-bold" style="font-size: 14pt">
              THÔNG BÁO
          </h3>
      <p>
          <b>
          Về việc ${ttChapNhan == 1 ? "chấp nhận" : "không chấp nhận"}${" "}
          ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử
          dụng hóa đơn điện tử
          </b>
      </p>

      <div>
          Kính gửi: ${dataDetail?.tnnt || ""} (${"MST: "}
          ${dataDetail?.mst || ""})
      </div>

      </div>
  </div>
      <div class="content-info">
    <p class="p-space">
      Sau khi xem xét tờ khai${" "}
      ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử dụng
      hóa đơn điện tử ngày ${ngayXemXet.format("DD/MM/YYYY")}.
    </p>
    <p class="p-space">
      Cơ quan thuế thông báo${" "}
      ${ttChapNhan == 1 ? "chấp nhận" : "không chấp nhận"} đề nghị${" "}
      ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử dụng
      hóa đơn điện tử của đơn vị.
    </p>

    ${
      ttChapNhan == 1
        ? `
        <p class="p-space">
          Tài khoản đã được gửi đến hộp thư điện tử của người nộp
          thuế/điện thoại liên hệ, đề nghị người nộp thuế thực hiện
          khai báo các thông tin liên quan theo nội dung hướng dẫn
          của cơ quan thuế tại thư điện tử này.
        </p>
        <p class="p-space">
          Trường hợp người nộp thuế đăng ký sử dụng hóa đơn điện tử
          có mã không trả tiền dịch vụ theo quy định tại khoản 1
          Điều 14 Nghị định số 123/2020/NĐ-CP, cơ quan thuế thông
          báo người nộp thuế đăng ký giao dịch sử dụng hóa đơn điện
          tử miễn phí qua tổ chức cung cấp dịch vụ hóa đơn điện tử.
          Thông tin tổ chức cung cấp dịch vụ hóa đơn điện tử do Tổng
          cục Thuế ủy thác tại Cổng thông tin điện tử của Tổng cục
          Thuế
        </p>
        `
        : ""
    }
    ${
      ttChapNhan == 2
        ? `
        <p class="p-space">
          Cơ quan thuế không chấp nhận người nộp thuế${" "}
          ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử
          dụng hóa đơn điện tử. Lý do:
        </p>
        <div style="width: 100%; display: grid" >
          <table class="res-tb">
            <thead>
              <tr style = "text-align: center">
                <th class="tb-t1">STT</th>
                <th class="tb-t2">Tiêu chí lỗi</th>
                <th class="tb-t3">Lý do không chấp nhận</th>
              </tr>
            </thead>
            <tbody>
              <tr style = "text-align: center">
                <td>(1)</td>
                <td>(2)</td>
                <td>(3)</td>
              </tr>
              ${dataDetail?.ldo
                ?.filter((item) => item.kqua === 0)
                .map(
                  (v, key) => `
                  <tr key=${key}>
                    <td class="tx-center">
                      ${key + 1}
                    </td>
                    <td>${`${v.ten || ""}`}</td>
                    <td>${`${v.tloi || ""}`}</td>
                  </tr>
                `
                )}
            </tbody>
          </table>
        </div>
        `
        : ""
    }
        <p></p>
        <p class="p-space">
          Cơ quan thuế thông báo để người nộp thuế biết, thực hiện./.
        </p>

        <div class="sign-row">
        <div style="height: 50px;"></div>
         ${
           !!dataDetail.pdcks || !!dataDetail.bhcks
             ? ` <div class="sign-content" style="text-align: center">
               <b class="tx-center tt-style">
                 ${(dataDetail.hthuc || "").toUpperCase()}
               </b>
               <b class="tx-center tt-style">
                 ${(dataDetail.cdanh || "").toUpperCase()}
               </b>
               <div class="tx-center">
                 ${pageSignBoxPrintPDF(dataDetail.pdcks, dataDetail.pdldngay)}
                 ${pageSignBoxPrintPDF(dataDetail.bhcks, dataDetail.bhvtngay)}
               </div>
             </div>`
             : ""
         }
       </div>
     </div>
  </div>
  </div>
`);
  w.document.write("</body></html>");
  setTimeout(() => {
    w.print();
    // w.close();
  }, 500);
};

export default TBHD;
