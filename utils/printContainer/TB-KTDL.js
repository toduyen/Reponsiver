import React from "react";
import moment from "moment";
import { pageSignBoxPrintPDF } from "components";
import { STYLE_TB_MASTER_CSS } from "./style";
import { CQTQLY_SUPPORT } from "consts";
import { handleCKS } from "utils/helper";
import { isEmpty } from "lodash";
import { DATE_FORMAT } from "components/patterns";

const TBHD = (dataDetail) => {
  // const {
  //   onCancel,
  //   data: { thop, pdcks, pdldngay, bhcks, bhvtngay, hthuc, cdanh, nky },
  //   data,
  // } = this.props;
  const getByIndex = (array, index = undefined) => {
    if (index === undefined) {
      return array.map((v) => ({
        ...v,
        tdlap: v.tdlap ? moment(v.tdlap) : moment(),
      }));
    }
    let item = array[index];
    return {
      ...item,
      tdlap: item.tdlap ? moment(item.tdlap) : moment(),
    };
  };
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
  const ntao = moment(
    handleCKS(bhcks).nky ||
      bhvtngay ||
      handleCKS(pdcks).nky ||
      pdldngay ||
      dataDetail?.ntao
  );
  const TThai = {
    1: "Lần đầu",
    0: "Bổ sung",
  };
  const tdlapValue = dataDetail.tdlap
  //   ? moment(data.tdlap, "YYYY-MM-DDTHH:mm:ss")
  //   : moment();
  const nkyValue = dataDetail.nky ? moment(dataDetail.nky) : moment();
  let nnhanValue = dataDetail.nnhan ? moment(dataDetail.nnhan) : moment();
  const ptguiValue = dataDetail.ptgui;
  let listError = (dataDetail.ttctiet || []).map((el) => el.dsloi || []).flat();
  if (listError.length === 0) {
    listError = dataDetail.dsloi || [];
  }

  const w = window.open("");
  w.document.write(`
      <html>
        <head>
         <title>TB-01/TB-KTDL ${moment().valueOf()}</title>
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
        <b class="code">Mẫu số: 01/TB-KTDL</b>
        <div class="lg-plan">
        <div style="max-Width: 45%">
            <h5 style="font-size: 13pt; text-transform: uppercase">
            BỘ TÀI CHÍNH <br />
            </h5>
            <h5
            class="text-bold"
            style="font-size: 13pt; text-transform:uppercase"
            >
            TỔNG CỤC THUẾ
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
            <i>Hà Nội, ngày
            ${ntao?.format("DD")} tháng ${ntao.format("MM")} năm
            ${ntao.format("YYYY")}</i>
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
                Về việc kết quả kiểm tra dữ liệu hóa đơn điện tử
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
          [3].includes(dataDetail.thop) 
            ? `
            <p class="p-space">
              Căn cứ ${dataDetail.ccu} ${`của`} ${" "}
              ${
                [3].includes(ptguiValue) 
                ? `
                người nộp thuế (NNT)/Tổ chức cung cấp dịch vụ hóa đơn điện tử
                `
                  : "" 
              }
              ${
                [1, 2].includes(ptguiValue) 
                ? `
                Tổ chức cung cấp dịch vụ hóa đơn điện tử
                ` 
                  : ""
              }
              ${` gửi tới cơ quan thuế lúc ${nnhanValue.format(
                "HH"
              )} giờ ${nnhanValue.format(
                "mm"
              )} phút ngày ${nnhanValue.format("DD")}
              tháng ${nnhanValue.format("MM")} năm ${nnhanValue.format(
                "YYYY"
              )}, cơ quan thuế thông báo hóa đơn không đủ
              điều kiện cấp mã của NNT, cụ thể như sau:`}
            </p>
            ${dataDetail.ttctiet.length > 0 
              ? `
                <p class="p-space">Ký hiệu hóa đơn: ${dataDetail?.ttctiet[0].khhdon}</p>
                <p class="p-space">Ký hiệu mẫu hóa đơn: ${dataDetail?.ttctiet[0].khmshdon}</p>
                <p class="p-space">Số hóa đơn: ${dataDetail?.ttctiet[0].shdon}</p>
                <p class="p-space">
                  Thời điểm lập hóa đơn: ${" "}
                  ${getByIndex(dataDetail.ttctiet, 0).tdlap.format(
                    "DD/MM/YYYY"
                  )}
                </p>
              ` 
              : ""
            }
            <p class="p-space">Mã giao dịch điện tử: ${dataDetail?.mtdtchieu || ""}</p>
            <p class="p-space">Lý do không cấp mã:</p>
            <table class="res-tb">
              <thead>
                <tr style="text-align: center">
                  <th class="tb-t1">STT</th>
                  <th class="tb-t2" >Mô tả lỗi</th>
                  <th class="tb-t3">Hướng dẫn xử lý</th>
                  <th class="tb-t4">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr style="text-align: center">
                  <td>(1)</td>
                  <td>(2)</td>
                  <td>(3)</td>
                  <td>(4)</td>
                </tr>
                ${dataDetail.ttctiet?.map(({ dsloi }) =>
                  dsloi.map((v, key) => ( `
                    <tr key=${key}>
                      <td style="text-align: center">${key + 1}</td>
                      <td>${`${v?.ma || ""} - ${v?.ten || ""}`}</td>
                      <td>${v?.hdgquyet || ""}</td>
                      <td />
                    </tr>
                  ` )).join("")
                ).join("")}
              </tbody>
            </table>
          ` 
          : ""
        }
        ${[1, 2, 4, 5].includes(dataDetail?.thop) ? `
            <p class="p-space">
              Căn cứ ${dataDetail.ccu} ${`của`} ${" "}
              ${[3].includes(ptguiValue) ? `
                người nộp thuế (NNT)/Tổ chức cung cấp dịch vụ hóa đơn điện tử
                ` : ""
              }
              ${[1, 2].includes(ptguiValue) ? `
                Tổ chức cung cấp dịch vụ hóa đơn điện tử
                ` : ""
              }
              ${` gửi tới cơ quan thuế lúc ${nnhanValue.format(
                "HH"
              )} giờ ${nnhanValue.format(
                "mm"
              )} phút ngày ${nnhanValue.format("DD")}
              tháng ${nnhanValue.format("MM")} năm ${nnhanValue.format(
                "YYYY"
              )}, cơ quan thuế đã tiếp nhận gói dữ liệu hóa
              đơn điện tử:`}
            </p>
            ${
              [2].includes(dataDetail.thop) 
                ? `
                ${dataDetail.ltbao === 1 &&
                  !isEmpty(dataDetail.ttctiet) &&
                  dataDetail.ttctiet[0].khmshdon > 0 
                  ? `
                    <p class="p-space">Ký hiệu hóa đơn: ${dataDetail?.ttctiet[0].khhdon}</p>
                    <p class="p-space">Ký hiệu mẫu hóa đơn: ${dataDetail?.ttctiet[0].khmshdon}</p>
                    <p class="p-space">Số hóa đơn: ${dataDetail?.ttctiet[0].shdon}</p>
                    <p class="p-space">
                      Thời điểm lập hóa đơn: ${" "}
                      ${getByIndex(dataDetail.ttctiet, 0).tdlap.format(
                        "DD/MM/YYYY"
                      )}
                    </p>
                  ` 
                  : ""
                }
              ` 
              : ""
            }
            <p class="p-space">Mã giao dịch điện tử: ${dataDetail.mtdtchieu || ""}</p>
            <p class="p-space">Mã số thuế: ${dataDetail.mst}</p>
            <p class="p-space">Số lượng dữ liệu trong gói: ${dataDetail.sluong}</p>
            <p class="p-space">
              Cơ quan thuế thông báo kết quả kiểm tra sơ bộ tính hợp lệ
              của gói dữ liệu HĐĐT như sau:
            </p>
        ` : "" }
        ${[1].includes(dataDetail?.thop) ? `
            <p class="p-space">
              Kết quả kiểm tra sơ bộ gói dữ liệu của người nộp thuế
              (NNT)/Tổ chức cung cấp dịch vụ hóa đơn điện tử gửi tới cơ
              quan thuế là hợp lệ.
            </p>
            <p class="p-space">
              Trong trường hợp cơ quan thuế kiểm tra và phát hiện dữ liệu
              chi tiết có sai sót, cơ quan thuế sẽ có thông báo đến người
              nộp thuế.
            </p>
          ` : ""
        }
        ${[2, 4, 5].includes(dataDetail?.thop) ? `
            <p class="p-space">
              Kết quả kiểm tra sơ bộ gói dữ liệu của${" "}
              ${[3].includes(ptguiValue) ? `
                người nộp thuế (NNT)/Tổ chức cung cấp dịch vụ hóa đơn điện tử
                ` : ""
              }
              ${[1, 2].includes(ptguiValue) ? `
                người nộp thuế (NNT)/Tổ chức cung cấp dịch vụ hóa đơn điện tử
                `: ""
              }${" "}
              gửi tới cơ quan thuế là không hợp lệ.
            </p>
            <p class="p-space">Lý do:</p>
            ${[2].includes(dataDetail?.thop) ? `
              <div>
                <table class="res-tb font-size-custome">
                  <thead>
                    <tr style="text-align: center">
                      <th class="tb-t1">STT</th>
                      <th class="tb-t2" >Mô tả lỗi</th>
                      <th class="tb-t3">Hướng dẫn xử lý</th>
                      <th class="tb-t4">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="text-align: center">
                      <td>(1)</td>
                      <td>(2)</td>
                      <td>(3)</td>
                      <td>(4)</td>
                    </tr>
                    ${listError.map((v, key) => (`
                      <tr key=${key}>
                        <td style="text-align: center">${key + 1}</td>
                        <td class="justify">${`${v?.ma || ""} - ${v?.ten || ""}`}</td>
                        <td>${v?.hdgquyet || ""}</td>
                        <td>${v?.gchu || ""}</td>
                      </tr>
                    ` )).join("")}
                  </tbody>
                </table>
              </div>
              `: ""
            }
            ${[4].includes(dataDetail?.thop) ? `
              <div class="scroll-tb">
                <table class="res-tb font-size-custome">
                  <thead>
                    <tr style = "text-align: center">
                      <th class="tb1-t1">STT</th>
                      <th class="tb1-t2">
                        Ký
                        <br />
                        hiệu
                        <br />
                        mẫu số
                      </th>
                      <th class="tb1-t3">
                        Ký hiệu
                        <br />
                        hóa đơn
                      </th>
                      <th class="tb1-t4">
                        Số
                        <br />
                        hóa đơn
                      </th>
                      <th class="tb1-t5">
                        Ngày
                        <br />
                        hóa đơn
                      </th>
                      <th class="tb1-t6">Mô tả lỗi</th>
                      <th class="tb1-t7">Hướng dẫn xử lý</th>
                      <th class="tb1-t8">Ghi chú</th>
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
                      <td>(8)</td>
                    </tr>
                    ${dataDetail.ttctiet?.map((v1, key1) =>
                      v1.dsloi.map((v2, key2) => (`
                        <tr>
                          ${key2 == 0 ? `
                              <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                ${key1 + 1}
                              </td>
                              <td
                                rowSpan=${v1.dsloi.length}
                              >${`${v1?.khmshdon || ""}`}</td>
                              <td
                                rowSpan=${v1.dsloi.length}
                                style="text-align: center"
                              >${`${v1?.khhdon || ""}`}</td>
                              <td
                                rowSpan=${v1?.dsloi?.length}
                              >${`${v1?.shdon || ""}`}</td>
                              <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                ${getByIndex(
                                  dataDetail.ttctiet,
                                  key1
                                ).tdlap.format(DATE_FORMAT)}
                              </td>
                          ` : ""}
                          <td class="justify">${`${v2?.ma || ""} - ${v2?.ten || ""}`}</td>
                          <td>${v2?.hdgquyet || ""}</td>
                          <td>${v2?.gchu || ""}</td>
                        </tr>
                      `)).join("")
                    ).join("")}
                  </tbody>
                </table>
              </div> 
              ` : ""
            }
            ${[5].includes(dataDetail?.thop) ? 
              dataDetail?.tbktdldetail?.map((v, key) => (`
                  ${v.loai == 0 ? `
                    <div class="scroll-tb">
                      <table class="res-tb font-size-custome">
                        <thead>
                          <tr style="text-align: center">
                            <th class="tb2-t1">STT</th>
                            <th class="tb2-t2">
                              Kỳ
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb2-t3">
                              Trạng
                              <br />
                              thái
                            </th>
                            <th class="tb2-t4">
                              Số lần
                              <br />
                              bổ sung
                            </th>
                            <th class="tb2-t5">
                              Số bảng
                              <br />
                              tổng hợp
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb2-t6">Mô tả lỗi</th>
                            <th class="tb2-t7">Hướng dẫn xử lý</th>
                            <th class="tb2-t8">Ghi chú</th>
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
                            <td>(8)</td>
                          </tr>
                          ${v.dsloi.map((v1, key1) =>
                            v1.dsloi.map((v2, key2) => (`
                              <tr key=${key1.key2}>
                                ${key2 == 0 ? `
                                  <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                    ${key1 + 1}
                                  </td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                  >${`${v1?.kdlieu || ""}`}</td>
                                  <td rowSpan=${v1.dsloi.length}>${`${
                                    TThai[v1?.ldau]
                                  }`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                    style="text-align: center"
                                  >${`${v1?.bslthu || ""}`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                    style="text-align: center"
                                  >${`${v1?.sbthdlieu || ""}`}</td>
                                  `: ""
                                }
                                <td
                                  key=${key2}
                                  class="justify"
                                >${`${v2?.ma || ""} - ${v2?.ten || ""}`}</td>
                                <td>${v2?.hdgquyet || ""}</td>
                                <td>${v2?.gchu || ""}</td>
                              </tr>
                            `)).join("")
                          ).join("")}
                        </tbody>
                      </table>
                    </div>
                    `: ""
                  }
                  ${v.loai == 1 ? `
                    <div class="scroll-tb">
                      <table class="res-tb font-size-custome">
                        <thead>
                          <tr style = "text-align: center">
                            <th class="tb3-t1">STT</th>
                            <th class="tb3-t2">
                              Kỳ
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb3-t3">
                              Trạng
                              <br />
                              thái
                            </th>
                            <th class="tb3-t4">
                              Số lần
                              <br />
                              bổ sung
                            </th>
                            <th class="tb3-t5">
                              Số bảng
                              <br />
                              tổng hợp
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb3-t6">
                              Ký hiệu
                              <br />
                              mẫu số
                            </th>
                            <th class="tb3-t7">
                              Ký hiệu
                              <br />
                              hóa đơn
                            </th>
                            <th class="tb3-t8">
                              Số
                              <br />
                              hóa đơn
                            </th>
                            <th class="tb3-t9" style="width: 70">
                              Ngày
                              <br />
                              hóa đơn
                            </th>
                            <th class="tb3-t10">
                              Tên
                              <br />
                              người mua
                            </th>
                            <th class="tb3-t11">Mô tả lỗi</th>
                            <th class="tb3-t12">
                              Hướng dẫn
                              <br />
                              xử lý
                            </th>
                            <th class="tb3-t13">Ghi chú</th>
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
                            <td>(8)</td>
                            <td>(9)</td>
                            <td>(10)</td>
                            <td>(11)</td>
                            <td>(12)</td>
                            <td>(13)</td>
                          </tr>
                          ${v.dsloi.map((v1, key1) =>
                            v1.dsloi.map((v2, key2) => (`
                              <tr key=${key1.key2}>
                                ${key2 == 0 ? `
                                    <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                      ${key1 + 1}
                                    </td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                    >${`${v1?.kdlieu || ""}`}</td>
                                    <td rowSpan=${v1.dsloi.length}>${`${
                                      TThai[v1.ldau] || ""
                                    }`}</td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                      style="text-align: center"
                                    >${`${v1?.bslthu || ""}`}</td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                      style="text-align: center"
                                    >${`${v1?.sbthdlieu || ""}`}</td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                    >${`${v1?.khmshdon || ""}`}</td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                    >${`${v1?.khhdon || ""}`}</td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                      style="text-align: center"
                                    >${`${v1?.shdon || ""}`}</td>
                                    <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                      ${getByIndex(
                                        dataDetail.ttctiet,
                                        key1
                                      ).tdlap.format(DATE_FORMAT)}
                                    </td>
                                    <td
                                      rowSpan=${v1.dsloi.length}
                                    >${`${v1?.tnmua || ""}`}</td>
                                ` : ""}
                                <td
                                  key=${key2}
                                  class="justify"
                                >${`${v2?.ma || ""} - ${v2?.ten || ""}`}</td>
                                <td>${v2?.hdgquyet || ""}</td>
                                <td>${v2?.gchu || ""}</td>
                              </tr>
                            `)).join("")
                          ).join("")}
                        </tbody>
                      </table>
                    </div>
                    ` : "" 
                  }
                  ${v.loai == 2 ? `
                    <div class="scroll-tb">
                      <table class="res-tb font-size-custome">
                        <thead>
                          <tr style="text-align: center">
                            <th class="tb4-t1">STT</th>
                            <th class="tb4-t2">
                              Kỳ
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb4-t3">
                              Trạng
                              <br />
                              thái
                            </th>
                            <th class="tb4-t4">
                              Số lần
                              <br />
                              bổ sung
                            </th>
                            <th class="tb4-t5">
                              Số bảng
                              <br />
                              tổng hợp
                              <br />
                              dữ liệu
                            </th>
                            <th class="tb4-t6">
                              Mã mặt
                              <br />
                              hàng
                            </th>
                            <th class="tb4-t7">
                              Tên mặt
                              <br />
                              hàng
                            </th>
                            <th class="tb4-t8">Mô tả lỗi</th>
                            <th class="tb4-t9">Hướng dẫn xử lý</th>
                            <th class="tb4-t10">Ghi chú</th>
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
                            <td>(8)</td>
                            <td>(9)</td>
                            <td>(10)</td>
                          </tr>
                          ${v.dsloi.map((v1, key1) =>
                            v1.dsloi.map((v2, key2) => (`
                              <tr key={key1.key2}>
                                ${key2 == 0 ? `
                                  <td rowSpan=${v1.dsloi.length} style="text-align: center">
                                    ${key1 + 1}
                                  </td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                  >${`${v1?.kdlieu || ""}`}</td>
                                  <td rowSpan=${v1.dsloi.length}>${`${
                                    TThai[v1.ldau]
                                  }`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                    style="text-align: center"
                                  >${`${v1?.bslthu || ""}`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                    style="text-align: center"
                                  >${`${v1?.sbthdlieu || ""}`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                  >${`${v1?.mhhoa || ""}`}</td>
                                  <td
                                    rowSpan=${v1.dsloi.length}
                                  >${`${v1?.thhdvu || ""}`}</td>
                                  ` : ""
                                }
                                <td
                                  key=${key2}
                                  class="justify"
                                >${`${v2?.ma || ""} - ${v2?.ten || ""}`}</td>
                                <td>${v2?.hdgquyet || ""}</td>
                                <td>${v2?.gchu || ""}</td>
                              </tr>
                            `)).join("")
                          ).join("")}
                        </tbody>
                      </table>
                    </div>
                    ` : ""
                  }
              `)).join("") 
            : ""
            }   
          `: ""
        }
        <div class="page-break">
          <p class="p-space">
            Trường hợp NNT/Quý đơn vị cần biết thêm thông tin chi tiết, xin
            vui lòng truy cập theo đường dẫn <a
              href="https://hoadondientu.gdt.gov.vn"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://hoadondientu.gdt.gov.vn
            </a>
            hoặc
            liên hệ với ${CQTQLY_SUPPORT} để được hỗ trợ.
          </p>
          <p class="p-space">
            Cơ quan thuế thông báo để người nộp thuế biết và thực hiện./.
          </p>
          <div class="sign-flex">
          ${
            dataDetail?.cks
              ? pageSignBoxPrintPDF(dataDetail.cks, dataDetail.nky)
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
    // w.close();
  }, 500);
};

export default TBHD;