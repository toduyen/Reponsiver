export const STYLE_HD_CSS = `
* {
   box-sizing: border-box;
   -moz-box-sizing: border-box;
  }
  body {
    width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  font-size: 13pt;
  }

  #print-layout,
  #print-layout * {
    // break-inside: avoid !important;
  }

  .bg-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url("/static/images/viewinvoice-bg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 250%;
    border: 3px double rgba(145, 87, 21, 0.69);
    top: 0px;
    left: 0px;
  }

  .print-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0mm auto;
  }

  .main-page {
    font-family: "Times New Roman";
    padding: 20px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    border: 3px double rgba(145, 87, 21, 0.69);
  }

 .heading-content .main-title {
    font-size: 20pt;
    text-align: center;
    display: block;
    font-weight: bold;
    margin-bottom: 13px !important;
  }
  .heading-content p {
    font-size: 13pt;
    text-align: right;
  }
  .heading-content p.day {
    text-align: center;
    display: block;
  }
  .day .mg-bottom {
    margin-bottom: 8px !important;
    text-align: center;
  }
  .heading-content .top-content {
    display: flex;
    justify-content: space-between;
  }

  .heading-content .code-content {
    display: inline-block;
  }

  .heading-content .code-ms {
    display: flex;
    font-size: 12pt;
  }
  
  .vip-divide {
    width: 100%;
    height: 0;
    border-bottom: 1px solid rgba(145, 87, 21, 0.69);
  }
  .flex-li {
    display: flex;
  }

  .content-info {
    padding-top: 5px;
  }
  .content-info .list-fill-out {
    list-style: none;
    padding-inline-start: 0;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .content-info .list-fill-out li {
    font-size: 13pt;
  }
  .content-info .tx-money {
    text-align: right;
  }
  .content-info .square-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 0px;
  }
  .content-info .square-list ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 25px;
  }
  .content-info .square-list ul li {
    width: 35px;
    height: 35px;
    display: block;
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .content-info .square-list ul li:last-child {
    border-right: 1px solid #000;
  }

  .table-horizontal-wrapper {
    display: flex; 
    justify-content: space-between;
  }
  .res-tb {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    margin: 10px 0px;
    min-width: 250px;
  }
  .res-tb tr td {
    border: 1px solid black;
    padding: 6px 4px 6px 4px;
    vertical-align: baseline;
  }
  .res-tb tr td.tx-center {
    text-align: center;
    min-width: 50px;
  }
  .res-tb thead tr th {
    border: 1px solid black;
    vertical-align: middle;
    padding: 6px 4px 6px 4px;
  }

  .res-tb thead tr th.tb-stt {
    width: 70px;
    text-align: center;
  }
  .res-tb thead tr th.tb-thh {
    width: 200px;
    text-align: center;
  }
  .res-tb thead tr th.tb-dvt {
    width: 100px;
    text-align: center;
  }
  .res-tb thead tr th.tb-sl {
    width: 80px;
    text-align: center;
  }
  .res-tb thead tr th.tb-dg {
    width: 80px;
    text-align: center;
  }
  .res-tb thead tr th.tb-ts {
    width: 80px;
    text-align: center;
  }
  .res-tb thead tr th.tb-ttct {
    width: 250px;
    text-align: center;
  }
  .res-tb thead tr th.tb-ttgd {
    width: 170px;
    text-align: center;
  }
  .res-tb thead tr th.tb-ctgd {
    width: 170px;
    text-align: center;
  }

  .ft-sign {
    padding-top: 20px;
  }
  .ft-sign .sign-dx {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
  }
  .ft-sign .sign-dx h3 p {
    text-align: center;
    font-size: 13pt;
    font-weight: 100;
  }
  .ft-sign .sign-dx h3 p:nth-child(2) {
    font-size: 14px;
    font-weight: normal;
  }
  .ft-sign .fd-end {
    padding-top: 120px;
    text-align: center;
  }
  .ft-sign .appendix {
    padding-top: 120px;
  }
  .ft-sign .appendix .apen-ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .ft-sign .appendix .apen-ul li {
    margin-right: 25px;
  }
  .ft-sign .appendix .apen-ul li:last-child {
    margin-right: unset;
  }

  .sign-box {
    width: 260px !important;
    padding: 5px !important;
    border: 2px solid #23b709 !important;
    background-image: url("/static/images/sign-check.jpg") !important;
    background-repeat: no-repeat !important;
    background-position: right 45px bottom 10px !important;
    background-size: 70px 60px !important;
    margin-top: 10px !important;
    font-weight: 500;
  }
  .sign-box span {
    color: #23b709 !important;
    font-size: 13pt !important;
    text-align: left !important;
    display: block !important;
  }
 
  .data-item-auto-w {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    font-size: 13pt;
    color: rgba(0, 0, 0, 0.85);
  }
  .data-item-auto-w .di-label {
    min-height: 25px;
    height: auto;
    border-bottom: 1px dashed transparent;
    display: flex;
    align-items: flex-start;
  }
  .data-item-auto-w .di-value {
    box-sizing: border-box;
    flex: 1;
    min-height: 25px;
    display: flex;
    align-items: flex-start;
    padding-left: 5px;
    height: auto;
    justify-content: center;
  }

  .data-item {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    font-size: 13pt;
    color: rgba(0, 0, 0, 0.85);
   }
   .data-item .di-label {
    min-height: 25px;
    height: auto;
    border-bottom: 1px dashed transparent;
    display: flex;
    align-items: flex-start;
  }
  .data-item .di-value {
    box-sizing: border-box;
    flex: 1;
    min-height: 25px;
    // border-bottom: 1px dashed #e8e8e8;
    display: flex;
    align-items: flex-start;
    padding-left: 5px;
    height: auto;
    justify-content: unset;
  }
  
  .space { 
    display: inline-block;
    width: 20px;
    height: 1px;
  }

  .data-text { 
    width: 100%;
    font-size: 13pt;
    color: rgba(0, 0, 0, 0.85);
  }

  @page {
    size: A4;
    margin: 0 !important;
  }
  @media print {
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
     body {
      width: auto;
      height: auto;
      margin: 0 auto;
    }

    table tr, td {
        page-break-inside: avoid;
    }

    table thead {
      display: table-row-group !important;
    }

    .table-horizontal-wrapper {
      page-break-inside: avoid;
      padding-top: 5px;
    }
    
    .main-page {
      margin: 0;
      width: initial;
      min-height: 296mm;
      background: none;
      border: none;
    }
    .ft-sign {
      page-break-inside: avoid !important;
      page-break-after: auto;
    } 
    .fd-end {
      padding-top: 0 !important;
    }
  }
  `;
// table tr td{
//   page-break-inside: avoid;
//   white-space: nowrap;
// }

export const STYLE_TB_MASTER_CSS = `
* {
   box-sizing: border-box;
   -moz-box-sizing: border-box;
  }
  body {
    width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  font-size: 13pt;
  }

  #print-layout,
  #print-layout * {
    // break-inside: avoid !important;
  }

  .bg-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url("/static/images/viewinvoice-bg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 250%;
    border: 3px double rgba(145, 87, 21, 0.69);
    top: 0px;
    left: 0px;
  }

  .print-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0mm auto;
  }

  .main-page {
    font-family: "Times New Roman";
    padding: 20px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    border: 3px double rgba(145, 87, 21, 0.69);
  }

  .heading-ct {
    width: 100%;
  }
  .heading-ct .code {
    display: block;
    text-align: right;
    font-size: 13pt;
    padding-bottom: 5px;
  }
  .heading-ct .lg-plan {
    display: flex;
    justify-content: space-between;
  }
  .heading-ct .lg-plan div {
    text-align: center;
  }

  .heading-ct .lg-plan-center {
    display: flex;
    justify-content: center;
  }
  .heading-ct .lg-plan-center div {
    text-align: center;
  }

  .heading-ct h5 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
  }

  .pop-content {
    padding-top: 0px;
  }
  .pop-content .content-head {
    text-align: center;
  }
  .pop-content .content-head h5 {
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  .pop-content .content-head h5 i {
    font-weight: normal;
  }
  .pop-content .content-info {
    padding-top: 0px;
  }
  .pop-content .content-info ul {
    list-style: none;
    padding: 0;
  }
  .pop-content .content-info .sign-end {
    display: block;
    text-align: right;
  }
  .pop-content .content-info .sign-flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: center;
    padding-top: 14px;
  }

  .res-tb {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .res-tb tr td {
    border: 1px solid black;
    padding: 6px 4px 6px 4px;
    vertical-align: baseline;
  }
  .res-tb tr td.tx-center {
    text-align: center;
    min-width: 50px;
  }
  .res-tb thead tr th {
    border: 1px solid black;
    vertical-align: middle;
    white-space: nowrap;
    padding: 6px 4px 6px 4px;
  }
  .res-tb thead tr th.tb-rs-nb {
    width: 150px;
  }
  .res-tb thead tr th.tb-rs-kh {
    width: 300px;
  }
  .res-tb thead tr th.tb-rs-shd {
    width: 250px;
  }
  .res-tb thead tr th.tb-rs-nhd {
    width: 200px;
  }
  .res-tb thead tr th.tb-rs-lap {
    width: 250px;
  }
  .res-tb thead tr th.tb-rs-ldr {
    width: 250px;
  }
  
  .flex-li {
    display: flex;
  }
  
  .sign-box {
    width: 260px !important;
    padding: 5px !important;
    border: 2px solid #23b709 !important;
    background-image: url("/static/images/sign-check.jpg") !important;
    background-repeat: no-repeat !important;
    background-position: right 45px bottom 10px !important;
    background-size: 70px 60px !important;
    margin-top: 10px !important;
    font-weight: 500;
  }
  .sign-box span {
    color: #23b709 !important;
    font-size: 13pt !important;
    text-align: left !important;
    display: block !important;
  }

  .data-item {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    font-size: 13pt;
    color: #000;
    margin-bottom: 10px;
  }
  
  .data-item .di-label {
    min-height: 25px;
    border-bottom: 1px dashed transparent;
    display: flex;
    align-items: flex-start;
  }
  .data-item .di-value {
    min-height: 25px;
    box-sizing: border-box;
    flex: 1;
    border-bottom: 1px dashed #e8e8e8;
    display: flex;
    align-items: flex-start;
    padding-left: 10px;
    justify-content: flex-start;
  }

  .sign-content b {
    display: block;
  }

  .sign-row {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .text-bold {
    font-weight: bold;
  }
  .text-indent {
    text-indent: 40px
  }
  .p-space {
    text-indent: 30pt;
    font-size: 13pt;
    // margin-bottom: 10px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }

  .p-no-space {
    text-indent: 30pt;
    font-size: 13pt;
    margin-bottom: 0;
  }

  .justify {
    text-align: justify;
  }

  .font-size-custome {
    font-size: 12.5px !important;
  }
  .font-size-custome-sm {
    font-size: 10px !important;
  }

  .tt-style {
    text-transform: uppercase;
  }

  @page {
    size: A4;
    margin: 0 !important;
  }
  
  @media print {
    * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
   body {
    width: auto;
    height: auto;
    margin: 0 auto;
    }
    table,
    tr,
    td {
        page-break-inside: avoid;
    }
    .main-page {
      margin: 0;
      width: initial;
      min-height: 296mm;
      background: none;
      border: none;
    }

    div > .page-break {
      page-break-inside: avoid;
      padding-top: 5px;
    }

    .sign-flex {
      page-break-inside: avoid !important;
      page-break-after: auto;
      padding-top: 0 !important;
    } 
    .sign-box {
      line-height: 1.2 !important;
    }
  
  }
  `;
