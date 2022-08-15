/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import moment from "moment";
import { handleCKS } from "utils/helper";
import { STYLE_TB_MASTER_CSS } from "./style";

const LOAI_HS = {
  0: "hồ sơ đề nghị cấp hóa đơn điện tử có mã của cơ quan thuế",
  1: "chứng từ nộp thuế",
  2: "hóa đơn điện tử có mã của cơ quan thuế",
};

const TBHD = (dataDetail) => {
  const {
    pdcks,
    pdldngay,
    bhcks,
    bhvtngay,
    kqkthso,
    lhso,
    ttxly,
    hthuc,
    cdanh,
  } = dataDetail;

  const ngayGuiHS = moment(dataDetail?.nghso);
  const ntao = moment(
    handleCKS(bhcks).nky ||
      bhvtngay ||
      handleCKS(pdcks).nky ||
      pdldngay ||
      dataDetail?.ntao
  );

  const renderRowTable = () => {
    if (!dataDetail?.ndhdan) return "";
    const html = dataDetail.ndhdan.map((el, idx) => {
      let strHtml = `
        <tr>
          <td class="tx-center">${idx + 1}</td>
          <td>${el?.ten || ""}</td>
          <td>${el?.hdgquyet || ""}</td>
          <td>${el?.gchu || ""}</td>
        </tr>`;

      return strHtml;
    });
    return html.join("");
  };

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01-1/QTr-HĐĐT ${moment().valueOf()}</title>
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
        <div class="code">
          <b>Mẫu số: 01-1/QTr-HĐĐT</b>
        </div>
        <div class="lg-plan">
          <div
            style="
              max-width: 45%;
              display: flex;
              flex-direction: column;
              align-items: center
              justify-content: flex-start;">

              <h5
                style="font-size: 13pt; text-transform: uppercase;font-weight: 500;"
              >
                ${dataDetail?.tcqtctren || ""}
              </h5>

              <h5 
               class="text-bold"
               style="font-size: 13pt; 
               text-transform: uppercase;"
              >
                ${dataDetail?.cqthue || ""}
              </h5>
            <hr
              style="
                text-align: center;
                color: black;
                width: 50%;
                margin-top: 0;
              "
            />
            <span>
              Số: ${dataDetail?.so || ""}
            </span>
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
            <i>
              ${dataDetail?.ddanh || dataDetail?.dccqthue || "..."}, ngày
              ${ntao?.format("DD")} tháng ${ntao.format("MM")} năm
              ${ntao.format("YYYY")}
            </i>
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
              <b>Phản hồi về việc kết quả kiểm tra ${
                LOAI_HS[lhso]
              } theo từng lần phát sinh </b>
            </p>
          </div>
          
          <div>
            Kính gửi: ${dataDetail?.tnnt || ""} (${"MST: "}
            ${dataDetail?.mst || ""})
          </div>
        </div>
        <div class="content-info">
          <Row>
            <div>
              <p class="p-space">
                Căn cứ ${LOAI_HS[lhso]} theo từng lần phát sinh của người
                nộp thuế gửi tới cơ quan thuế vào ngày
                ${ngayGuiHS.format("DD")} tháng ${ngayGuiHS.format("MM")}
                năm ${ngayGuiHS.format("YYYY")}. Cơ quan thuế phản hồi kết
                quả như sau:
              </p>
            </div>

            ${
              kqkthso == "0"
                ? `<div >
                <p class="p-space">
                  Kết quả kiểm tra hồ sơ đề nghị cấp hóa đơn điện tử có mã
                  của cơ quan thuế theo từng lần phát sinh của người nộp
                  thuế là hợp lệ, đề nghị người nộp thuế thực hiện nộp
                  thuế và cung cấp chứng từ nộp thuế cho cơ quan thuế.
                </p>
              </div>`
                : ""
            }

            ${
              kqkthso === 1
                ? `<div >
                <p class="p-space">
                  Kết quả kiểm tra hồ sơ đề nghị cấp hóa đơn điện tử có mã
                  của cơ quan thuế theo từng lần phát sinh của người nộp
                  thuế là không hợp lệ.
                </p>
              </div>`
                : ""
            }

            ${
              kqkthso === 2
                ? `<div >
                <p class="p-space">
                  Kết quả kiểm tra chứng từ nộp thuế của người nộp thuế
                  không hợp lệ
                </p>
              </div>`
                : ""
            }

            ${
              kqkthso === 3
                ? `<div >
                <p class="p-space">
                  Kết quả kiểm tra nội dung hóa đơn điện tử cần cấp mã của
                  cơ quan thuế không hợp lệ.
                </p>
              </div>`
                : ""
            }

            ${
              kqkthso != "0"
                ? `<div>
              <p class="p-space">Lý do:</p>
              <table class="res-tb">
                <thead style="text-align: center">
                  <tr>
                    <th class="tb-stt">STT</th>
                    <th class="tb-thh">Nội dung</th>
                    <th class="tb-dvt">Hướng dẫn xử lý</th>
                    <th class="tb-sl">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tx-center">(1)</td>
                    <td class="tx-center">(2)</td>
                    <td class="tx-center">(3)</td>
                    <td class="tx-center">(4)</td>
                  </tr>
                  ${renderRowTable()}
                </tbody>
              </table>
            </div>`
                : ""
            }
          </Row>

          <Row>
            <div >
              <p class="p-space">
                Tổ chức, cá nhân cần biết thêm chi tiết xin vui lòng liên
                hệ với cơ quan thuế xử lý đề nghị cấp hóa đơn điện tử có
                mã theo từng lần phát sinh.
              </p>
              <p class="p-space">
                Cơ quan thuế thông báo để người nộp thuế biết và thực
                hiện./.
              </p>
            </div>
          </Row>

          <div class="sign-row">
            <div class="taken-place">
              <p class="p-no-space">
                <b>
                  <i>Nơi nhận:</i>
                </b>
              </p>
              <p class="p-no-space">- Như trên;</p>
              <p class="p-no-space">- Lưu: VT</p>
            </div>
            ${
              !!pdcks || !!bhcks
                ? ` <div class="sign-content" style="text-align: center">
                  <b class="tx-center tt-style">
                    ${(hthuc || "").toUpperCase()}
                  </b>
                  <b class="tx-center tt-style">
                    ${(cdanh || "").toUpperCase()}
                  </b>
                  <div class="tx-center">
                    ${pageSignBoxPrintPDF(pdcks, pdldngay)}
                    ${pageSignBoxPrintPDF(bhcks, bhvtngay)}
                  </div>
                </div>`
                : ""
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
    // w.close();
  }, 500);
};

export default TBHD;
