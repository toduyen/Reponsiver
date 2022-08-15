/* eslint-disable react/react-in-jsx-scope */
import { pageSignBoxPrintPDF } from "components/PagePattern";
import moment from "moment";
import { handleCKS } from "utils/helper";
import { STYLE_TB_MASTER_CSS } from "./style";
import isEmpty from "lodash/isEmpty";

const TBHD = (dataDetail = {}, paymentMethods = []) => {
  const { nlap, ntao, npduyet } = dataDetail;

  const htdkOptions = {
    1: "Thêm mới",
    2: "Gia hạn",
    3: "Ngừng sử dụng",
  };

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/ĐKTĐ-HĐĐT ${moment().valueOf()}</title>
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
      <b class="code">Mẫu số: 01/ĐKTĐ-HĐĐT</b>
      <div class="lg-plan-center">
        <div style="font-size: 13pt">
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
          </p>
      </div>
    </div>
  </div>

  <div class="pop-content">
  <div class="content-head">
      <div style="font-size: 13pt">
          <h3 class="text-bold" style="font-size: 14pt">
             TỜ KHAI 
          </h3>
      <p>
          <b>
            Đăng ký thông tin sử dụng hóa đơn điện tử
          </b>
      </p>
      <p style="text-align: center, margin-bottom: 0">
          ${dataDetail.hthuc === 1 ? "Ủy nhiệm" : "Nhận ủy nhiệm"}
      </p>
      </div>
  </div>

 <div class="content-info">
    <div class="data-item">
      <div class="di-label">
          <span>Tên người nộp thuế: </span>
      </div>
      <div class="di-value">
          <div>
                ${dataDetail?.tnnt || ""}
          </div>
      </div>
    </div>

    <div class="data-item">
      <div class="di-label">
          <span>Mã số thuế: </span>
      </div>
      <div class="di-value">
          <div>
                ${dataDetail?.mst || ""}
          </div>
      </div>
    </div>

    <div class="data-item">
      <div class="di-label">
          <span>Cơ quan thuế quản lý: </span>
      </div>
      <div class="di-value">
          <div>
                ${dataDetail?.cqtqly || ""}
          </div>
      </div>
    </div>

    <div class="flex-li">
        <div class="data-item" style="width: 50%">
          <div class="di-label">
              <span>Người liên hệ:</span>
          </div>
          <div class="di-value">
              <div>${dataDetail?.nlhe || ""}</div>
          </div>
        </div>

        <div class="data-item" style="width: 50%">
            <div class="di-label">
              <span>Điện thoại liên hệ:</span>
            </div>
            <div class="di-value">
              <div>${dataDetail?.dtlhe || ""}</div>
            </div>
        </div>
    </div>

    <div class="flex-li">
        <div class="data-item" style="width: 50%">
          <div class="di-label">
              <span>Địa chỉ liên hệ:</span>
          </div>
          <div class="di-value">
              <div>${dataDetail?.dclhe || ""}</div>
          </div>
        </div>

        <div class="data-item" style="width: 50%">
            <div class="di-label">
              <span>Thư điện tử:</span>
            </div>
            <div class="di-value">
              <div>${dataDetail?.dctdtu || ""}</div>
            </div>
        </div>
    </div>
   
    ${
      !isEmpty(dataDetail?.dsctssdung)
        ? `
        <label htmlFor>5. Danh sách chứng thư số sử dụng:</label>
        <table class="res-tb font-size-custome-sm">
          <thead>
            <tr class="kh-ch">
              <th rowspan="2" class="tb-stt">
                STT
              </th>
              <th rowspan="2" class="tb-name-s">
                Tên tổ chức cơ quan chứng thực/cấp/công nhận <br/> chữ ký số, chữ
                ký điện tử
              </th>
              <th rowspan="2">Số sê-ri chứng thư</th>
              <th colSpan="2" class="tb-hdct">
                Thời hạn sử dụng chứng thư số
              </th>
              <th rowspan="2">
                Hình thức đăng ký <br/> (Thêm mới, gia hạn, ngừng sử dụng
              </th>
            </tr>
            <tr class="kh-ch">
              <th>Từ ngày</th>
              <th>Đến ngày</th>
            </tr>
          </thead>
          <tbody>
            ${
              dataDetail?.dsctssdung
                ? dataDetail?.dsctssdung
                    ?.map(
                      (item) =>
                        `<tr>
                <td class="tx-center">{item.stt}</td>
                <td>
                  <div style=" word-break: "break-word", min-width: 220">
                    ${item?.ttchuc || ""}
                  </div>
                </td>
                <td class="tx-center">
                  <div style=" word-break: "break-word", min-width: 220">
                    ${item?.seri || ""}
                  </div>
                </td>
                <td class="tx-center">
                  ${item?.tngay ? moment(item.tngay).format("DD/MM/YYYY") : ""}
                </td>
                <td class="tx-center">
                  ${item?.dngay ? moment(item.dngay).format("DD/MM/YYYY") : ""}
                </td>
                <td>${item?.hthuc ? htdkOptions[item.hthuc] : ""}</td>
              </tr>`
                    )
                    .join("")
                : ""
            }
          </tbody>
        </table>
    `
        : ""
    }
        
      <label htmlFor>
        6. Đăng ký ${dataDetail.hthuc === 1 ? "" : "nhận"} ủy nhiệm hóa đơn
      </label>
     <table class="res-tb font-size-custome-sm">
        <thead>
          <tr class="kh-ch">
            <th rowspan="2" class="tb-stt">
              STT
            </th>
            <th rowspan="2" class>
              Tên loại hóa đơn <br/> ủy nhiệm
            </th>
            <th rowspan="2" class>
              Ký hiệu mẫu <br/> hóa đơn
            </th>
            <th rowspan="2" class>
              Ký hiệu hóa đơn <br/> ủy nhiệm
            </th>
            <th rowspan="2">MST doanh nghiệp <br/> được ủy nhiệm</th>
            <th rowspan="2">Tên tổ chức <br/> được ủy nhiệm</th>
            <th rowspan="2">Mục đích <br/> ủy nhiệm</th>
            <th colSpan="2" class="tb-hdct">
              Thời hạn <br/> ủy nhiệm
            </th>
            <th rowspan="2">Phương thức thanh toán <br/> hóa đơn ủy nhiệm</th>
          </tr>
          <tr class="kh-ch">
            <th>Từ ngày</th>
            <th>Đến ngày</th>
          </tr>
        </thead>
        <tbody>
          ${
            dataDetail?.dsdkunhiem
              ? dataDetail?.dsdkunhiem
                  ?.map(
                    ({
                      stt,
                      tlhdon,
                      khmshdon,
                      khhdon,
                      mst,
                      ttchuc,
                      mdich,
                      tngay,
                      dngay,
                      pthuc,
                    }) =>
                      `<tr>
                <td class="tx-center">${stt || ""}</td>
                <td style="minWidth: 150">${tlhdon || ""}</td>
                <td class="tx-center">${khmshdon || ""}</td>
                <td class="tx-center">${khhdon || ""}</td>
                <td class="tx-center">${mst || ""}</td>
                <td>
                  <div style="word-break: "break-word", min-width: 110">
                    ${ttchuc || ""}
                  </div>
                </td>
                <td>${mdich || ""}</td>
                <td class="tx-center">
                  ${tngay ? moment(tngay).format("DD/MM/YYYY") : ""}
                </td>
                <td class="tx-center">
                  ${dngay ? moment(dngay).format("DD/MM/YYYY") : ""}
                </td>
                <td>
                  <div style="wordBreak: "break-word", minWidth: 110 ">
                    ${
                      paymentMethods.find(
                        (el) => el.ma.toString() === (pthuc || "").toString()
                      ).ten
                    }
                  </div>
                </td>
              </tr>`
                  )
                  .join("")
              : ""
          }
        </tbody>
      </table>

    <p class="">
      Chúng tôi cam kết hoàn toàn chịu trách nhiệm trước pháp luật về tính
      chính xác, trung thực của nội dung nêu trên và thực hiện theo đúng quy
      định của pháp luật.
    </p>

        <div class="sign-row">
        <div style="height: 50px;"></div>
          <div class="sign-content" style="text-align: center">
          <p style="text-align: right, padding-right: 45px">
               ${dataDetail?.ddanh || "..."}, ${moment(nlap || ntao).format(
    "[ngày] DD [tháng] MM [năm] YYYY"
  )}
              </p>
          <p>NGƯỜI NỘP THUẾ</p>

          <p>
            <i>(Chữ ký số người nộp thuế))</i>
          </p>    

          <div class="tx-center">
            ${pageSignBoxPrintPDF(dataDetail?.cks, npduyet)}
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
    // w.close();
  }, 500);
};

export default TBHD;
