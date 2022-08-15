/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import { CQTQLY_SUPPORT } from "consts";
import moment from "moment";
import { handleCKS } from "utils/helper";
import { STYLE_TB_MASTER_CSS } from "./style";

const TCTBAO_CONSTANT = {
  1: "Hủy",
  2: "Điều chỉnh",
  3: "Thay thế",
  4: "Giải trình",
};

const TBHD = (dataDetail) => {
  const tdlap = moment(
    handleCKS(dataDetail.bhcks).nky ||
      handleCKS(dataDetail.pdcks).nky ||
      dataDetail.ntao
  );
  let nnhanValue = moment(dataDetail.nnhan);
  const thopValue = dataDetail.thop;

  const renderHTCD = () => {
    return `
        ${
          dataDetail?.["pdcks"]
            ? `<b class="tx-center tt-style">${dataDetail?.hthuc || ""}</b>`
            : ""
        }
        ${
          dataDetail?.["bhcks"]
            ? `<b class="tx-center tt-style">${dataDetail?.cdanh || ""}</b>`
            : ""
        }
      `;
  };

  const renderRowTable = () => {
    if (!dataDetail?.dshdon) return "";
    const html = dataDetail.dshdon.map((v, key) => {
      let strHtml = `
        <tr>
        <td class="tx-center">${key + 1}</td>
        <td style="max-width: 220px; word-break: break-all;">${
          v?.mhdon || ""
        }</td>
        <td>${v?.khmshdon || ""}${v?.khhdon || ""}</td>
        <td class="tx-center">${v?.shdon || ""}</td>
        <td class="tx-center">
        ${v.tdlap ? moment(v.tdlap).format("DD/MM/YYYY") : ""}
        </td>
        <td>${TCTBAO_CONSTANT[v.tctbao]}</td>
        <td>${v?.ldo || ""}</td>
        </tr>`;

      return strHtml;
    });
    return html.join("");
  };

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/TB-SSĐT ${moment().valueOf()}</title>
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
        <b class="code">Mẫu số: 01/TB-SSĐT</b>
        <div class="lg-plan">
        <div style="max-Width: 45%">
            <h5 style="font-size: 13pt; text-transform: uppercase; font-weight: 400;">
                ${dataDetail?.tcqtctren?.toUpperCase() || ""} <br />
            </h5>
            <h5
            class="text-bold"
            style="font-size: 13pt; text-transform:uppercase"
            >
            ${dataDetail.tcqt != null ? dataDetail.tcqt.toUpperCase() : ""}
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
            <i>${dataDetail?.ddanh || "..."}, ngày ${tdlap.format(
    "DD"
  )} tháng ${tdlap.format("MM")} năm ${tdlap.format("YYYY")}</i>
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
                    Về việc tiếp nhận và kết quả xử lý về việc hóa đơn điện tử đã
                    lập có sai sót
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
            Sau khi xem xét Thông báo hóa đơn điện tử có sai sót nhận ngày
            ${nnhanValue.format("DD/MM/YYYY")} của:
        </p>
        <p class="p-space">Người nộp thuế: ${dataDetail?.tnnt || ""}</p>
        <p class="p-space">Mã số thuế: ${dataDetail?.mst || ""}</p>
        <p class="p-space">Mã giao dịch điện tử: ${dataDetail?.mtdtchieu || ""}</p>

        ${
          [1].includes(thopValue)
            ? ` <p class="p-space">
            Cơ quan Thuế đã tiếp nhận Thông báo hóa đơn điện tử có sai sót nhận
            ngày ${nnhanValue.format("DD/MM/YYYY")} của quý công ty
          </p>`
            : ""
        }

        ${
          [0].includes(thopValue)
            ? `
              <p class="p-space">
                Cơ quan thuế thông báo không tiếp nhận hóa đơn điện tử đã
                lập có sai sót.
              </p>
              <p class="p-space">
                Đề nghị quý công ty kiểm tra, đối chiếu hóa đơn điện tử đã
                lập có sai sót do thông tin chưa chính xác.
              </p>
              <div>
                <table class="res-tb">
                  <thead>
                    <tr style="text-align: center">
                      <th class="tb-t1">STT</th>
                      <th class="tb-t2">Mã CQT cấp</th>
                      <th class="tb-t3">
                        Ký hiệu
                        <br />
                        mẫu hóa đơn
                        <br />
                        và ký hiệu
                        <br /> hóa đơn
                      </th>
                      <th class="tb-t4">
                        Số hóa đơn
                        <br />
                        điện tử
                      </th>
                      <th class="tb-t5">
                        Ngày lập
                        <br />
                        hóa đơn
                      </th>
                      <th class="tb-t6">
                        Hủy/ <br /> Điều chỉnh/
                        <br />
                        Thay Thế/ <br /> Giải trình
                      </th>
                      <th class="tb-t7">Lý do không tiếp nhận</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="text-align: center">
                      <td>(1)</td>
                      <td>(2)</td>
                      <td>(3)</td>
                      <td>(4)</td>
                      <td>(5)</td>
                      <td>(6)</td>
                      <td>(7)</td>
                    </tr>
                   ${renderRowTable()}
                  </tbody>
                </table>
              </div>
            `
            : ""
        }

          ${[2].includes(thopValue) ? `<p>Sai</p>` : ""}

          <p class="p-space">Cơ quan thuế thông báo để người nộp thuế biết, thực hiện./.</p>

          <div class="sign-row">
           <div style="height: 50px;"></div>
            ${
              !!dataDetail.pdcks || !!dataDetail.bhcks
                ? ` <div class="sign-content" style="text-align: center">
                  ${renderHTCD()}
                  <div class="tx-center">
                    ${pageSignBoxPrintPDF(
                      dataDetail.pdcks,
                      dataDetail.pdldngay,
                      10
                    )}
                    ${pageSignBoxPrintPDF(
                      dataDetail.bhcks,
                      dataDetail.bhvtngay,
                      10
                    )}
                  </div>
                </div>`
                : ""
            }
          </div>
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
