/* eslint-disable react/react-in-jsx-scope */
import BigNumber from "bignumber.js";
import { DATE_FORMAT } from "components/patterns";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import ReactDOMServer from "react-dom/server";
import { QRCode } from "react-qr-svg";
import { encodeHTML, formatSignDate, getPlus, handleCKS } from "utils/helper";
import { formatCurrencyNumber, formatPercentage } from "..";
import { STYLE_HD_CSS } from "./style";
// npm install react-qr-svg --save

const HHDV_TCHAT = {
  1: "Hàng hóa, dịch vụ",
  2: "Khuyến mại",
  3: "Chiết khấu thương mại",
  4: "Ghi chú, diễn giải",
};

const TB01QTRHDDT = (invoiceData) => {
  const {
    nbcks,
    nmcks,
    khdon,
    khmshdon,
    tchat,
    hdon,
    tdlap,
    mstdvnunlhdon,
    tdvnunlhdon,
    dcdvnunlhdon,
  } = invoiceData || {};

  const convertQrToHtml = () => {
    if (!invoiceData?.qrcode) return;
    const html = ReactDOMServer.renderToString(
      <QRCode
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="L"
        style={{ width: 80 }}
        value={`${invoiceData?.qrcode}`}
      />
    );
    return html;
  };

  const renderTable = () => {
    if (!invoiceData?.hdhhdvu) return "";
    const html = invoiceData.hdhhdvu
      .sort((x, y) => (x?.stt > y?.stt ? 1 : -1))
      .map((v, key) => {
        let strHtml = `<tr>
          <td class="tx-center">${key + 1}</td>
          ${
            khmshdon === 1 || khmshdon === 2
              ? `<td>${HHDV_TCHAT[v.tchat]}</td>`
              : ""
          }
          <td>${encodeHTML(v?.ten) || ""}</td>
          <td>${v?.dvtinh || ""}</td>
          <td class="tx-center">${getPlus(invoiceData?.tchat, v.sluong)}${
          formatCurrencyNumber(v.sluong) || ""
        }</td>
          <td class="tx-center">${getPlus(
            invoiceData?.tchat,
            v.dgia
          )}${formatCurrencyNumber(v.dgia)}</td>
          <td class="tx-center">${getPlus(
            invoiceData?.tchat,
            v.stckhau
          )}${formatCurrencyNumber(v.stckhau)}</td>
          <td class="tx-center">
            ${
              !["KHAC"].includes(v.ltsuat)
                ? formatPercentage(v.ltsuat || "")
                : `${formatCurrencyNumber(
                    new BigNumber(v.tsuat || 0).multipliedBy(new BigNumber(100))
                  )}%`
            }
          </td>
          <td class="tx-center">${getPlus(
            invoiceData?.tchat,
            v.thtien
          )}${formatCurrencyNumber(v.thtien)}</td>
        </tr>`;

        return strHtml;
      });
    return html.join("");
  };

  const getCKS = (str) => {
    return handleCKS(str).ngky;
  };

  const getTitle = () => {
    const time = moment(tdlap || undefined);
    return `<div type="flex" justify="center" class="day">
        ${
          khdon === 1
            ? `<div class="mg-bottom">
            HOÁ ĐƠN GIÁ TRỊ GIA TĂNG DÀNH CHO TỔ CHỨC, CÁ NHÂN TRONG KHU PHI
            THUẾ QUAN
          </div>`
            : ""
        }
        ${
          khdon === 2 && hdon === "01"
            ? ` <div span={24} class="mg-bottom">
            HOÁ ĐƠN GIÁ TRỊ GIA TĂNG KIÊM TỜ KHAI HOÀN THUẾ
          </div>`
            : ""
        }
        ${
          [2, 3].includes(tchat)
            ? ` <div class="mg-bottom" style="text-align: center;">
            ${
              tchat === 2 ? "Thay thế" : "Điều chỉnh"
            } cho ký hiệu mẫu số hóa đơn
            <b>${invoiceData?.khmshdgoc || ""}</b>, ký hiệu hóa đơn
            <b>${invoiceData?.khhdgoc || ""}</b>, số hóa đơn <b>${
                invoiceData?.shdgoc || ""
              }</b>${
                invoiceData.tdlhdgoc
                  ? `, <span>ngày lập
                <b>${moment(invoiceData.tdlhdgoc).format("DD/MM/YYYY")}</b>
              </span>`
                  : ""
              }
          </div>`
            : ""
        }
        <div>
          <div style="display: flex; justify-content: center;">
            <div class="data-item-auto-w">
              <div class="di-label">
                <span>Ngày</span>
              </div>
              <div class="di-value">
                <div>${time.isValid() ? time.format("DD") : "__"}&nbsp;</div>
              </div>
            </div>

            <div class="data-item-auto-w">
              <div class="di-label">
                <span>tháng</span>
              </div>
              <div class="di-value">
                <div>${time.isValid() ? time.format("MM") : "__"}&nbsp;</div>
              </div>
            </div>

            <div class="data-item-auto-w">
              <div class="di-label">
                <span>năm</span>
              </div>
              <div class="di-value">
                <div>${time.isValid() ? time.format("YYYY") : "____"}</div>
              </div>
            </div>
          </div>
          
          ${
            invoiceData.hthdon !== 0
              ? `<div style="display: flex; justify-content: center; margin-top: 10;">
              <div>
                <div class="data-item">
                  <div class="di-label">
                    <span>MCCQT:</span>
                  </div>
                  <div class="di-value">
                    <div>${invoiceData?.mhdon || ""}</div>
                  </div>
                </div>
              </div>
             </div>`
              : ""
          }

        </div>
      </div>`;
  };

  const renderDelegation = () => {
    if (!mstdvnunlhdon) {
      return null;
    }
    return `
      <li>
          <div class="vip-divide" style="margin: 5px 0;" }}></div>
      </li>
      <li>
        <div class="data-item">
          <div class="di-label">
              <span>Mã số thuế đơn vị nhận ủy nhiệm:</span>
          </div>
          <div class="di-value">
              <div>${mstdvnunlhdon}</div>
          </div>
        </div>
      </li>
      <li>
        <div class="data-item">
          <div class="di-label">
              <span>Tên đơn vị nhận ủy nhiệm:</span>
          </div>
          <div class="di-value">
              <div>${tdvnunlhdon}</div>
          </div>
        </div>
      </li>
      <li>
        <div class="data-item">
          <div class="di-label">
              <span>Địa chỉ đơn vị nhận ủy nhiệm:</span>
          </div>
          <div class="di-value">
              <div>${dcdvnunlhdon}</div>
          </div>
        </div>
      </li>
    `;
  };

  const time = moment(invoiceData?.nky || invoiceData?.ntky);

  const w = window.open("");
  w.document.write(`
      <html><head><title>Mẫu số: 01 ${moment().valueOf()} </title><style>
        ${STYLE_HD_CSS}
      </style></head><body id="print-layout" class="A4">
    `);
  w.document.write(`
 <div class="print-page">
 <div class="bg-container"></div>
 <div class="main-page">
      <div class="heading-content">
        <div class="top-content">
          ${convertQrToHtml()}
          <div class="code-content">
            <b class="code-ms">Mẫu số 1</b>
            <b class="code-ms">
              Ký hiệu: ${`${invoiceData?.lhdon || ""}${
                invoiceData?.khhdon || ""
              }`}
            </b>
            <b class="code-ms">Số: ${invoiceData?.shdon || ""}</b>
          </div>
        </div>
        <div class="title-heading">
          <h2 class="main-title">HOÁ ĐƠN GIÁ TRỊ GIA TĂNG</h2>
          ${getTitle()}
        </div>
      </div>

      <div class="vip-divide"></div>

      <div class="content-info">
          <ul class="list-fill-out">
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Tên người bán:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbten || ""}</div>
                </div>
              </div>
            </li>
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Mã số thuế:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbmst || ""}</div>
                </div>
              </div>
            </li>
            ${
              invoiceData?.mhso
                ? `<li>
                <div class="data-item">
                  <div class="di-label">
                      <span>Mã hồ sơ:</span>
                  </div>
                  <div class="di-value">
                      <div>${invoiceData?.mhso || ""}</div>
                  </div>
                </div>
              </li>`
                : ""
            }
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Địa chỉ:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbdchi || ""}</div>
                </div>
              </div>
            </li>
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Điện thoại:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbsdthoai || ""}</div>
                </div>
              </div>
            </li>
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Số tài khoản:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbstkhoan || ""}&nbsp;&nbsp;&nbsp;
                    ${invoiceData?.nbtnhang || ""}</div>
                </div>
              </div>
            </li>
            ${renderDelegation()}
            <li>
               <div class="vip-divide" style="margin: 5px 0;" }}></div>
            </li>
            
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Tên người mua:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmten || ""}</div>
                </div>
              </div>
            </li>
            
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Họ tên người mua:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmtnmua || ""}</div>
                </div>
              </div>
            </li>
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Mã số thuế:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmmst || ""}</div>
                </div>
              </div>
            </li>
            
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Địa chỉ:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmdchi || ""}</div>
                </div>
              </div>
            </li>

            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Số tài khoản:</span>
                </div>
                <div class="di-value">
                    <div> ${invoiceData?.nmstkhoan || ""}&nbsp;&nbsp;&nbsp;
                    ${invoiceData?.nmtnhang || ""}</div>
                </div>
              </div>
            </li>

            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Hình thức thanh toán:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.thtttoan || ""}</div>
                </div>
              </div>
            </li>
            
            <li class="flex-li">
              <div class="data-item" style="width: 50%">
                <div class="di-label">
                    <span>Đơn vị tiền tệ:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.dvtte || ""}</div>
                </div>
              </div>
            ${
              invoiceData?.dvtte !== "VND"
                ? ` <div class="data-item" style="width: 50%">
                  <div class="di-label">
                    <span>Tỷ giá:</span>
                  </div>
                  <div class="di-value">
                    <div>${formatCurrencyNumber(invoiceData?.tgia || "")}</div>
                  </div>
                </div>`
                : ""
            }
            </li>

            <li class="flex-li">
              <div class="data-item" style="width: 50%">
                <div class="di-label">
                    <span>Số bảng kê:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.dksbke || ""}</div>
                </div>
              </div>

              <div class="data-item" style="width: 50%">
                <div class="di-label">
                    <span>Ngày bảng kê:</span>
                </div>
                <div class="di-value">
                    <div> ${
                      invoiceData.dknlbke
                        ? moment(invoiceData.dknlbke).format(DATE_FORMAT)
                        : ""
                    }</div>
                </div>
              </div>
            </li>
          </ul>

            <table class="res-tb">
            <thead style="text-align: center;">
              <tr>
                <th class="tb-stt">STT</th>
                ${
                  khmshdon === 1 || khmshdon === 2
                    ? `<th class="tb-stt">Tính chất</th>`
                    : ""
                }
                <th class="tb-thh">Tên hàng hóa, dịch vụ</th>
                <th class="tb-dvt">Đơn vị tính</th>
                <th class="tb-sl">Số lượng</th>
                <th class="tb-dg">Đơn giá</th>
                <th class="tb-dg">Chiết khấu</th>
                <th class="tb-ts">Thuế suất</th>
                <th class="tb-ttct">Thành tiền chưa có thuế GTGT</th>
              </tr>
            </thead>
            <tbody>
            ${renderTable()}
            </tbody>
          </table>

            <div class="table-horizontal-wrapper">
                <div style="margin-right: 10;">
                ${
                  !isEmpty(invoiceData.thttlphi)
                    ? `<table class="res-tb">
                      <thead style="text-align: center">
                        <tr>
                          <th>STT</th>
                          <th>Tên loại phí</th>
                          <th>Tiền phí</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${invoiceData.thttlphi
                          ?.map(
                            ({ tlphi, tphi }, key) =>
                              `<tr>
                            <td class="tx-center">${key + 1}</td>
                            <td class="tx-center">${tlphi || ""}</td>
                            <td class="tx-center">
                              ${getPlus(invoiceData?.tchat, tphi)}
                              ${formatCurrencyNumber(tphi)}
                            </td>
                          </tr>`
                          )
                          .join("")}
                      </tbody>
                    </table>`
                    : ""
                }
                    <table class="res-tb">
                      <thead style="text-align: center" >
                        <tr>
                          <th>Thuế suất</th>
                          <th>Tổng tiền chưa thuế</th>
                          <th>Tổng tiền thuế</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${
                        invoiceData.thttltsuat
                          ? invoiceData.thttltsuat
                              ?.map(
                                (v) =>
                                  `<tr>
                          <td class="tx-center">
                          ${
                            !["KHAC"].includes(v.tsuat)
                              ? formatPercentage(v.tsuat || "")
                              : `${formatCurrencyNumber(v?.tsuat)}%`
                          }
                         </td>
                          <td class="tx-center">
                          ${getPlus(
                            invoiceData?.tchat,
                            v.thtien
                          )}${formatCurrencyNumber(v.thtien)}
                          </td>
                          <td class="tx-center">
                          ${getPlus(
                            invoiceData?.tchat,
                            v.tthue
                          )}${formatCurrencyNumber(v.tthue)}
                          </td>
                        </tr>`
                              )
                              .join("")
                          : ""
                      }
                      </tbody>
                    </table>
                </div>
                <div style="flex: 1">
                  <table class="res-tb">
                    <tbody>
                      <tr>
                        <td class="tx-center">
                          Tổng tiền chưa thuế
                          <br />
                          (Tổng cộng thành tiền chưa có thuế)
                        </td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px;">
                        ${getPlus(invoiceData?.tchat, invoiceData.tgtcthue)}${
    formatCurrencyNumber(invoiceData.tgtcthue) || ""
  }
                        </td>
                      </tr>
                      <tr>
                        <td class="tx-center">
                          Tổng tiền thuế (Tổng cộng tiền thuế)
                        </td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px">
                          ${getPlus(invoiceData?.tchat, invoiceData.tgtthue)}${
    formatCurrencyNumber(invoiceData.tgtthue) || ""
  }
                        </td>
                      </tr>
                      <tr>
                        <td class="tx-center">Tổng tiền phí</td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px">
                          ${getPlus(invoiceData?.tchat, invoiceData.tgtphi)}${
    formatCurrencyNumber(invoiceData.tgtphi) || ""
  }
                        </td>
                      </tr>
                      <tr>
                        <td class="tx-center">
                            Tổng tiền chiết khấu thương mại
                        </td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px">
                          ${getPlus(invoiceData?.tchat, invoiceData.ttcktmai)}${
    formatCurrencyNumber(invoiceData.ttcktmai) || ""
  }
                        </td>
                      </tr>
                      <tr>
                        <td class="tx-center">
                          Tổng tiền thanh toán bằng số
                        </td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px">
                          ${getPlus(invoiceData?.tchat, invoiceData.tgtttbso)}${
    formatCurrencyNumber(invoiceData.tgtttbso) || ""
  }
                        </td>
                      </tr>
                      <tr>
                        <td class="tx-center" >
                          Tổng tiền thanh toán bằng chữ
                        </td>
                        <td class="tx-center" style="min-width: 200px; max-width: 300px">${
                          invoiceData.tgtttbchu || ""
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

      <div class="vip-divide"></div>

      <div class="ft-sign">
        <div class="sign-dx">
          <h3>
            <p>NGƯỜI MUA HÀNG</p>
              <p>
                <i>(Chữ ký số (nếu có))</i>
              </p>
                ${
                  nmcks
                    ? `<div class="sign-box">
                  <span>Signature Valid</span>
                  <span>Ký bởi ${getCKS(nmcks)}</span>
                  <span>Ký ngày: ${formatSignDate(time)}</span>
                </div>`
                    : ""
                }
          </h3>

          <h3>
            <p>NGƯỜI BÁN HÀNG</p>
            <p>
              <i>(Chữ ký điện tử, chữ ký số)</i>
            </p>
              ${
                nbcks
                  ? `<div class="sign-box">
                <span>Signature Valid</span>
                <span>Ký bởi ${getCKS(nbcks)}</span>
                <span>Ký ngày: ${formatSignDate(time)}</span>
              </div>`
                  : ""
              }
          </h3>
          </div>

          <div class="fd-end">
            <p>
              <i>(Cần kiểm tra, đối chiếu khi lập, nhận hóa đơn)</i>
            </p>
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

export default TB01QTRHDDT;
