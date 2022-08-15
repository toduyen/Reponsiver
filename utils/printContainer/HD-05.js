/* eslint-disable react/react-in-jsx-scope */
import { isEmpty } from "lodash";
import moment from "moment";
import ReactDOMServer from "react-dom/server";
import { QRCode } from "react-qr-svg";
import { encodeHTML, formatSignDate, getPlus, handleCKS } from "utils/helper";
import { formatCurrencyNumber } from "..";
import { STYLE_HD_CSS } from "./style";
// npm install react-qr-svg --save

const HHDV_TCHAT = {
  1: "Hàng hóa, dịch vụ",
  2: "Khuyến mại",
  3: "Chiết khấu thương mại",
  4: "Ghi chú, diễn giải",
};

const TB01QTRHDDT = (invoiceData) => {
  const { nbcks, nmcks, khdon, khmshdon, tchat, hdon, tdlap } =
    invoiceData || {};

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

  const getNBCKS = (str) => {
    return handleCKS(str).ngky;
  };

  const getTitle = () => {
    const time = moment(tdlap || undefined);
    return `<div type="flex" justify="center" class="day">
        ${
          khdon === 1
            ? `<div class="mg-bottom">
            PHIẾU XUẤT KHO GỬI BÁN HÀNG ĐẠI LÝ DÀNH CHO TỔ CHỨC, CÁ NHÂN TRONG
            KHU PHI THUẾ QUAN
          </div>`
            : ""
        }
        ${
          khdon === 2 && hdon === "01"
            ? ` <div span={24} class="mg-bottom">
            PHIẾU XUẤT KHO GỬI BÁN HÀNG ĐẠI LÝ KIÊM TỜ KHAI HOÀN THUẾ
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
              }</b>${invoiceData.tdlhdgoc
                ? `, <span>
                ngày lập
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

  const time = moment(invoiceData?.nky || invoiceData?.ntky);

  const w = window.open("");
  w.document.write(`
      <html><head><title>Mẫu số: 03 ${moment().valueOf()} </title><style>
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
            <b class="code-ms">Mẫu số 3</b>
            <b class="code-ms">
              Ký hiệu: ${`${invoiceData?.lhdon || ""}${
                invoiceData?.khhdon || ""
              }`}
            </b>
            <b class="code-ms">Số: ${invoiceData?.shdon || ""}</b>
          </div>
        </div>
        <div class="title-heading">
          <h2 class="main-title">HÓA ĐƠN BÁN TÀI SẢN CÔNG</h2>
          ${getTitle()}
        </div>
      </div>

      <div class="vip-divide"></div>

      <div class="content-info">
          <ul class="list-fill-out">
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Đơn vị bán tài sản NN:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbten || ""}</div>
                </div>
              </div>
            </li>
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


            <li class="flex-li">
              <div class="data-item" style="width: 50%">
                <div class="di-label">
                    <span>Điện thoại:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbsdthoai || ""}</div>
                </div>
              </div>
             
               <div class="data-item" style="width: 50%">
                  <div class="di-label">
                    <span>MST/MSĐVCQHVNS:</span>
                  </div>
                  <div class="di-value">
                    <div>${
                      invoiceData?.nbmst || invoiceData?.nbmdvqhnsach || ""
                    }</div>
                  </div>
               </div>
             </li>

            <li class="flex-li">
              <div class="data-item" style="width: 50%">
                <div class="di-label">
                    <span>Số tài khoản:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbstkhoan || ""}</div>
                </div>
              </div>
             
               <div class="data-item" style="width: 50%">
                  <div class="di-label">
                    <span>Tại:</span>
                  </div>
                  <div class="di-value">
                    <div>${invoiceData?.nbtnhang || ""}</div>
                  </div>
               </div>
             </li>

             <li class="flex-li">
              <div class="data-text"> 
                 Bán theo Quyết định số ${
                   invoiceData?.nbsqdinh || `<span class="space"></span>`
                 }
                 ngày
                 ${
                   invoiceData.nbncqdinh
                     ? moment(invoiceData.nbncqdinh).format("DD")
                     : `<span class="space"></span>`
                 }
                 tháng
                 ${
                   invoiceData.nbncqdinh
                     ? moment(invoiceData.nbncqdinh).format("MM")
                     : `<span class="space"></span>`
                 }
                 năm
                 ${
                   invoiceData.nbncqdinh
                     ? moment(invoiceData.nbncqdinh).format("YYYY")
                     : `<span class="space"></span>`
                 }
                 của 
                 ${
                   invoiceData.nbcqcqdinh
                     ? invoiceData?.nbcqcqdinh
                     : `<span class="space"></span>`
                 }
              </div>
            </li>

            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Hình thức bán:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nbhtban || ""}</div>
                </div>
              </div>
            </li>
            

            <li>
               <div class="vip-divide" style="margin: 5px 0;" }}></div>
            </li>
            
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Người mua tài sản NN:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmtnmua || ""}</div>
                </div>
              </div>
            </li>
            
            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Đơn vị:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmten || ""}</div>
                </div>
              </div>
            </li>

            <li class="flex-li">
              <div class="data-item"  style="width: 50%">
                <div class="di-label">
                    <span>Số tài khoản:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmstkhoan || ""}</div>
                </div>
              </div>

              <div class="data-item"  style="width: 50%">
                <div class="di-label">
                    <span>Tại</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmtnhang || ""}</div>
                </div>
              </div>
            </li>

            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>MST/MSĐVCQHVNS:</span>
                </div>
                <div class="di-value">
                    <div>${
                      invoiceData?.nmmst || invoiceData?.nmmdvqhnsach || ""
                    }</div>
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
                invoiceData?.dvtte && invoiceData?.dvtte !== "VND"
                  ? `<div class="data-item" style="width: 50%">
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

            <li>
              <div class="data-item">
                <div class="di-label">
                    <span>Địa điểm vận chuyển đến:</span>
                </div>
                <div class="di-value">
                    <div>${invoiceData?.nmddvchden || ""}</div>
                </div>
              </div>
           </li>

            <li class="flex-li">
              <div class="data-text"> 
                 Thời gian vận chuyển: Từ ngày 
                 ${
                   invoiceData.nmtgvchdtu
                     ? moment(invoiceData.nmtgvchdtu).format("DD")
                     : `<span class="space"></span>`
                 }
                 tháng
                 ${
                   invoiceData.nmtgvchdtu
                     ? moment(invoiceData.nmtgvchdtu).format("MM")
                     : `<span class="space"></span>`
                 }
                 năm
                 ${
                   invoiceData.nmtgvchdtu
                     ? moment(invoiceData.nmtgvchdtu).format("YYYY")
                     : `<span class="space"></span>`
                 }
                 đến ngày
                 ${
                   invoiceData.nmtgvchdden
                     ? moment(invoiceData.nmtgvchdden).format("DD")
                     : `<span class="space"></span>`
                 }
                 tháng
                 ${
                   invoiceData.nmtgvchdden
                     ? moment(invoiceData.nmtgvchdden).format("MM")
                     : `<span class="space"></span>`
                 }
                 năm
                 ${
                   invoiceData.nmtgvchdden
                     ? moment(invoiceData.nmtgvchdden).format("YYYY")
                     : `<span class="space"></span>`
                 }
              </div>
            </li>

          </ul>
          
          <div class="vip-divide"></div>

          <table class="res-tb">
            <thead style="text-align: center">
              <tr>
                 <th className="tb-stt">STT</th>
                  <th className="tb-stt">Tính chất</th>
                  <th className="tb-thh">Tên tài sản</th>
                  <th className="tb-dvt">Đơn vị tính</th>
                  <th className="tb-sl">Số lượng</th>
                  <th className="tb-dg">Đơn giá</th>
                  <th className="tb-ts">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
            ${
              invoiceData.hdhhdvu
                ? invoiceData.hdhhdvu
                    ?.map(
                      (v, key) =>
                        `<tr>
                <td class="tx-center">${key + 1}</td>
                <td>${HHDV_TCHAT[v.tchat]}</td>
                <td>${encodeHTML(v?.ten) || ""}</td>
                <td>${v?.dvtinh || ""}</td>
                <td class="tx-center">${getPlus(
                  invoiceData?.tchat,
                  v?.sluong
                )}${formatCurrencyNumber(v?.sluong) || ""}</td>
                <td class="tx-center">
                ${getPlus(invoiceData?.tchat, v?.dgia)}${formatCurrencyNumber(
                          v.dgia
                        )}
                </td>
                <td class="tx-center">
                ${getPlus(invoiceData?.tchat, v?.thtien)}${formatCurrencyNumber(
                          v.thtien
                        )}
                </td>
              </tr>`
                    )
                    .join("")
                : ""
            }
            </tbody>
          </table>

          <div class="table-horizontal-wrapper">
          <div style="margin-right: 10; flex: 1">
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
                  ${invoiceData?.thttlphi
                    .map(
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
          </div>
            <div >
              <table class="res-tb">
                <tbody>
                  <tr>
                    <td class="tx-center">Tổng tiền phí</td>
                    <td class="tx-center" style="min-width: 170px;">
                    ${getPlus(invoiceData?.tchat, invoiceData?.tgtphi)}${
    formatCurrencyNumber(invoiceData.tgtphi) || "0"
  }
                    </td>
                  </tr>
                  <tr>
                    <td class="tx-center">
                      Tổng tiền thanh toán bằng số
                    </td>
                    <td class="tx-center" style="min-width: 170px;">
                    ${getPlus(invoiceData?.tchat, invoiceData?.tgtttbso)}${
    formatCurrencyNumber(invoiceData.tgtttbso) || "0"
  }
                    </td>
                  </tr>
                  <tr>
                    <td class="tx-center" >
                      Tổng tiền thanh toán bằng chữ
                    </td>
                    <td class="tx-center" style="min-width: 170px;">${
                      invoiceData.tgtttbchu || ""
                    }</td>
                  </tr>
                </tbody>
              </table>
            </div>
      </div>

      <div class="ft-sign">
        <div class="sign-dx">
          <h3>
            <p>NGƯỜI MUA HÀNG</p>
              <p>
                <i>(Chữ ký số (nếu có))</i>
              </p>
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
                <span>Ký bởi ${getNBCKS(nbcks)}</span>
                <span>Ký ngày: ${formatSignDate(time)}</span>
              </div>`
                 : ""
             }
          </h3>
          </div >

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
