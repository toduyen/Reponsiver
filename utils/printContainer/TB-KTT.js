/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import moment from "moment";
import { STYLE_TB_MASTER_CSS } from "./style";
import { handleCKS } from "utils/helper";

const TBHD = (dataDetail) => {
  const title =
    dataDetail?.thop === 1
      ? "Về việc hết thời gian sử dụng hóa đơn điện tử có mã của cơ quan thuế không thu tiền và chuyển sang thông qua Cổng thông tin điện tử Tổng cục Thuế"
      : "Về việc không thuộc trường hợp sử dụng hóa đơn điện tử không có mã của cơ quan thuế";
  const content =
    dataDetail?.thop === 1
      ? "hết thời gian sử dụng hóa đơn điện tử có mã của cơ quan thuế không thu tiền và chuyển sang thông qua Cổng thông tin điện tử Tổng cục Thuế/qua ủy thác tổ chức cung cấp dịch vụ về hóa đơn điện tử"
      : "không thuộc trường hợp sử dụng hóa đơn điện tử không có mã của cơ quan thuế";

  const ntaoValue = moment(dataDetail.ntao);
  const tngayValue = moment(dataDetail.tngay);

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/TB-KTT ${moment().valueOf()}</title>
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
            <b class="code">Mẫu số: 01/TB-KTT</b>
            <div class="lg-plan">
                <div style="max-width: 45%">
                    <h5 style="font-size: 13pt; text-transform: uppercase" >
                        ${
                          dataDetail.tcqtctren != null &&
                          dataDetail.tcqtctren.toUpperCase()
                        }
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
                    <i>${dataDetail?.ddanh || "..."}, ${moment(
    handleCKS(dataDetail.bhcks).nky ||
      dataDetail.bhvtngay ||
      handleCKS(dataDetail.pdcks).nky ||
      dataDetail.pdldngay ||
      ntaoValue
  ).format("[ngày] DD [tháng] MM [năm] YYYY")}
                    </i>
                </p>
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
                ${title}
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
                Sau khi rà soát điều kiện thực hiện, cơ quan thuế thông báo
                người nộp thuế: ${dataDetail.tnnt} (MST: ${
    dataDetail.mst
  }) kể từ ngày${" "}
                ${tngayValue.format("DD")} tháng ${tngayValue.format(
    "MM"
  )} năm${" "}
                ${tngayValue.format(
                  "YYYY"
                )} ${content}, đề nghị người nộp thuế sử
                dụng hóa đơn điện tử có mã của cơ quan thuế thông qua tổ chức
                cung cấp dịch vụ về hóa đơn điện tử.
            </p>
            <p></p>
            <p class="p-space">Cơ quan thuế thông báo để người nộp thuế biết, thực hiện./.</p>
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
