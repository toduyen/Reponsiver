/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import moment from "moment";
import { handleCKS, formatToDate } from "utils/helper";
import { STYLE_TB_MASTER_CSS } from "./style";
import _isEmpty from "lodash/isEmpty";

const TBHD = (data) => {
  const ngayGuiHS = moment(data?.nghso);
  const ntao = moment(data?.ntao);

  // 1 uỷ nhiệm, 2 nhận uỷ nhiệm
  const loaiUyNhiem = data?.lunhiem;

  // 0 từ chối, 1 chấp nhận
  const kqua0 = data?.ndung.filter((el) => el.kqua === 0);
  const kqua1 = data?.ndung.filter((el) => el.kqua === 1);

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
              ${data?.tcqtctren?.toUpperCase() || ""} <br />
          </h5>
            <h5
              class="text-bold"
              style="font-size: 13pt; text-transform: uppercase"
            >
            ${data?.tcqt || ""}
            </h5>
            <hr
              style="
                  text-align: center;
                  color: black;
                  width: 35%;
                  margin-top: 0px;
              "
            />
            <p>Số: ${data?.so || ""}</p>
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
            ${data?.ddanh || data?.dccqthue || "..."}, ngày${" "}
            ${ntao?.format("DD")} tháng ${ntao?.format("MM")} năm${" "}
            ${ntao?.format("YYYY")}
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
          Về việc kết quả xử lý đăng ký${" "}
          ${data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"} hóa đơn
          điện tử
        </b>
        <hr
          style="text-align: center; color: black; width: 50%"
        />
      </p>

      <div>
        Kính gửi: ${data?.tnnt} (MST: 
        ${data?.mst})
      </div>

      </div>
    </div>
    <div class="content-info">
      <Row>
        <p class="p-space">
          Sau khi xem xét tờ khai đăng ký${" "}
          ${data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"} hóa đơn
          điện tử cơ quan thuế tiếp nhận ngày${" "}
          ${formatToDate(data?.nnhan)}, cơ quan thuế thông báo kết quả
          xử lý đăng ký${" "}
          ${data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"} hóa đơn
          điện tử của đơn vị như sau:
        </p>

        <Col span={24}>
          ${
            !_isEmpty(kqua1)
              ? `
            <p class="p-space">
              Kết quả cặp mã số thuế${" "}
              ${data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"}${" "}
              được cơ quan thuế chấp nhận:
            </p>
            <div class="scroll-ct-tb" id="style-scr1">
              <table class="res-tb">
                <thead>
                  <tr style="text-align: center">
                    <th rowSpan="2" class="tb-rs-nb">
                      STT
                    </th>
                    <th rowSpan="2" class="tb-rs-kh">
                      Mã số thuế
                      <br />${" "}
                      ${
                        data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"
                      }${" "}
                    </th>
                    <th rowSpan="2" class="tb-rs-shd">
                      Ngày nhận đăng ký
                      <br />
                      bên nhận${" "}
                      ${
                        data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"
                      }${" "}
                    </th>
                    <th rowSpan="2" class="tb-rs-nhd">
                      Ký hiệu mẫu
                      <br />
                      số hóa đơn
                    </th>
                    <th rowSpan="2" class="tb-rs-nhd">
                      Ký hiệu
                      <br />
                      hóa đơn
                    </th>
                    <th colSpan="2" class="tb-hdct">
                      Thời hạn ủy nhiệm
                    </th>
                  </tr>
                  <tr class="txt-center">
                    <th>Từ ngày</th>
                    <th>Đến ngày</th>
                  </tr>
                </thead>
                <tbody>
                  ${kqua1
                    ?.map(
                      (el1, idx) => `
                    <tr class="txt-center" style="text-align: center">
                      <td>${idx + 1}</td>
                      <td>${el1?.mst}</td>
                      <td>${formatToDate(el1?.nnhan)}</td>
                      <td>${el1?.khmshdon}</td>
                      <td>${el1?.khhdon}</td>
                      <td>${formatToDate(el1?.tngay)}</td>
                      <td>${formatToDate(el1?.dngay)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
              : ""
          }
        </Col>

        <Col span="24">
          ${
            !_isEmpty(kqua0)
              ? `
            <p class="p-space">
              Kết quả cặp mã số thuế${" "}
              ${data?.lunhiem === 1 ? "ủy nhiệm" : "nhận ủy nhiệm"}${" "}
              được cơ quan thuế không chấp nhận:
            </p>
            <table class="res-tb">
              <thead>
                <tr style="text-align: center">
                  <th class="tb-rs-nb">STT</th>
                  <th class="tb-rs-kh">
                    Mã số thuế ủy nhiệm
                    <br />/ nhận ủy nhiệm
                  </th>
                  <th class="tb-rs-shd">
                    Ngày nhận đăng ký
                    <br />
                    bên ủy nhiệm/ nhận ủy nhiệm
                  </th>
                  <th class="tb-rs-nhd">Mô tả lỗi</th>
                  <th class="tb-rs-nhd">
                    Hướng dẫn
                    <br />
                    xử lý
                  </th>
                  <th class="tb-rs-lap">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr class="txt-center" style="text-align: center">
                ${kqua0
                  ?.map(
                    (el0, idx) => `
                  <td>${idx + 1}</td>
                  <td>${el0?.mst}</td>
                  <td>${formatToDate(el0?.nnhan)}</td>
                  <td>
                    ${el0?.mloi ? el0?.mloi : ""}-${el0?.tloi ? el0?.tloi : ""}
                  </td>
                  <td>${el0?.hdgquyet ? el0?.hdgquyet : ""}</td>
                  <td>${el0?.gchu ? el0?.gchu : ""}</td>
                </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          `
              : ""
          }
        </Col>
      </Row>
      <p class="p-space">
        Cơ quan thuế thông báo để người nộp thuế biết, thực hiện./.
      </p>
      <div class="sign-row">
        <div style="height: 50px;"></div>
        ${
          !!data.pdcks || !!data.bhcks
            ? ` <div class="sign-content" style="text-align: center">
              <b class="tx-center tt-style">
                ${(data.hthuc || "").toUpperCase()}
              </b>
              <b class="tx-center tt-style">
                ${(data.cdanh || "").toUpperCase()}
              </b>
              <div class="tx-center">
                ${pageSignBoxPrintPDF(data.pdcks, data.pdldngay)}
                ${pageSignBoxPrintPDF(data.bhcks, data.bhvtngay)}
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
