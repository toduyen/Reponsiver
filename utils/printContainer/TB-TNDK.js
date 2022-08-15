/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import { CQTQLY_SUPPORT } from "consts";
import moment from "moment";
import { STYLE_TB_MASTER_CSS } from "./style";

const TBHD = (dataDetail) => {
  const tdlap = moment(dataDetail?.ntao);
  const ngayGuiToiCqThue = moment(dataDetail?.nnhan);
  const ngayNhanToiCqThue = moment(dataDetail?.nhtktra);
  let isAccepted = dataDetail?.thop === 1;
  const hinhThucDky = dataDetail?.htdky;
  const getDsLoi = (objectLoi) => {
    if (objectLoi) {
      const objectTenLoi = objectLoi.map(({ ten }, key) => ten);
      return objectTenLoi.join(", ");
    }
  };
  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/TB-TNĐT ${moment().valueOf()}</title>
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
        <b class="code">Mẫu số: 01/TB-TNĐT</b>
        <div class="lg-plan">
        <div style="max-Width: 45%">
            <h5 style="font-size: 13pt; text-transform: uppercase; font-weight: 400">
                 BỘ TÀI CHÍNH <br />
            </h5>
            <h5
            class="text-bold"
            style="font-size: 13pt; text-transform:uppercase"
            >
            TỔNG CỤC THUẾ
            </h5>
            <h5
            class="text-bold"
            style="font-size: 13pt, text-transform: uppercase"
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
            <p>Số: ${dataDetail?.so || ""}/TB-HĐĐT</p>
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
            <i>Hà Nội, ngày ${tdlap.format("DD")} tháng ${tdlap.format("MM")} năm ${tdlap.format("YYYY")}</i>
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
                Về việc ${!isAccepted ? "không" : ""} tiếp nhận tờ khai
                ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử dụng
                hóa đơn điện tử
                </b>
            </p>

            <div>
                Kính gửi: ${dataDetail?.tnnt || ""} (${"MST: "}
                ${dataDetail?.mst || ""})
            </div>

            </div>
        </div>

        <div class="content-info">
        ${
          isAccepted
            ? `
            <p>
                Căn cứ Tờ khai
                ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử
                dụng hóa đơn điện tử Mẫu số 01/ĐKTĐ-HĐĐT - Ban hành kèm theo
                Nghị định số 123/2020/NĐ-CP của người nộp thuế (NNT) gửi tới
                cơ quan thuế lúc ${ngayGuiToiCqThue.format("HH")} giờ
                ${ngayGuiToiCqThue.format("mm")} phút ngày
                ${ngayGuiToiCqThue.format("DD")} tháng
                ${ngayGuiToiCqThue.format("MM")} năm
                ${ngayGuiToiCqThue.format("YYYY")}, cơ quan thuế tiếp nhận Tờ
                khai ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"}
                sử dụng hóa đơn điện tử của NNT, cụ thể như sau:
            </p>


            <div class="data-item">
                <div class="di-label">
                    <span>- Tên tờ khai: </span>
                </div>
                <div class="di-value">
                    <div>
                         ${dataDetail?.ttkhai || ""}
                    </div>
                </div>
            </div>

            <div class="data-item">
                <div class="di-label">
                    <span>- Mã giao dịch điện tử: </span>
                </div>
                <div class="di-value">
                    <div>
                         ${dataDetail?.mtdtchieu || ""}
                    </div>
                </div>
            </div>

            <p>
                Tờ khai
                ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử
                dụng hóa đơn điện tử của người nộp thuế đã được cơ quan thuế
                tiếp nhận vào lúc ${ngayGuiToiCqThue.format("HH")} giờ
                ${ngayGuiToiCqThue.format("mm")} phút ngày
                ${ngayGuiToiCqThue.format("DD")} tháng
                ${ngayGuiToiCqThue.format("MM")} năm
                ${ngayGuiToiCqThue.format("YYYY")} Tờ khai
                ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} sử
                dụng hóa đơn điện tử của người nộp thuế sẽ được cơ quan thuế
                tiếp tục kiểm tra.
            </p>
            <p>
                Trong thời gian 01 ngày làm việc kể từ ngày cơ quan thuế
                tiếp nhận Tờ khai ghi trên thông báo này, cơ quan thuế sẽ
                trả Thông báo Mẫu 01/TB-ĐKĐT ban hành kèm theo Nghị định số
                123/2020/NĐ-CP về việc chấp nhận hoặc không chấp nhận
                ${hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"} của
                NNT, trường hợp không chấp nhận, cơ quan thuế nêu rõ lý do
                không chấp nhận.
            </p>    
        `
            : ""
        }

        ${
          !isAccepted
            ? ` 
                <p>
                Căn cứ Tờ khai ${
                  hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"
                }
                sử dụng hóa đơn điện tử - Mẫu số 01/TB-TNĐT - Ban hành kèm theo Nghị
                định số 123/2020/NĐ-CP của người nộp thuế (NNT) gửi tới cơ quan thuế
                lúc ${ngayGuiToiCqThue.format("HH")} giờ
                ${ngayGuiToiCqThue.format("mm")} phút ngày
                ${ngayGuiToiCqThue.format(
                  "DD"
                )} tháng ${ngayGuiToiCqThue.format("MM")}
                năm ${ngayGuiToiCqThue.format(
                  "YYYY"
                )} cơ quan thuế không tiếp nhận Tờ
                khai Mẫu số ${
                  hinhThucDky === 1 ? "đăng ký" : "thay đổi thông tin"
                } sử
                dụng hóa đơn điện tử của NNT, cụ thể như sau:
                </p>

                <div class="data-item">
                    <div class="di-label">
                        <span>- Tên tờ khai:</span>
                    </div>
                    <div class="di-value">
                        <div>${dataDetail?.ttkhai || ""}</div>
                    </div>
                </div>

                <div class="data-item">
                    <div class="di-label">
                        <span>- Mã giao dịch điện tử: </span>
                    </div>
                    <div class="di-value">
                        <div>${dataDetail?.mtdtchieu || ""}</div>
                    </div>
                </div>

                <div class="data-item">
                    <div class="di-label">
                        <span>- Lý do không tiếp nhận: </span>
                    </div>
                    <div class="di-value">
                        <div>
                        ${dataDetail?.dsloi && getDsLoi(dataDetail?.dsloi)}
                        </div>
                    </div>
                </div>
            `
            : ""
        }

        <p>
            Trường hợp NNT/Quý đơn vị cần biết thêm thông tin chi tiết, xin
            vui lòng truy cập theo đường dẫn 
            <a href="https://hoadondientu.gdt.gov.vn" target="_blank">
            https://hoadondientu.gdt.gov.vn
            </a>
            hoặc liên hệ với ${CQTQLY_SUPPORT} để được hỗ trợ.
        </p>

        <p>Cơ quan thuế thông báo để người nộp thuế biết, thực hiện./.</p>

        <div class="sign-flex">
        ${
          dataDetail?.cks
            ? pageSignBoxPrintPDF(dataDetail.cks, dataDetail.ngay)
            : `<div style="height: 150"></div>`
        }
        </div>
        </div>
        </div>
        </div>
    </div>
`);
  w.document.write("</body></html>");
  setTimeout(() => {
    w.print();
  }, 500);
};

export default TBHD;
