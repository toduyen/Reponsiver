import moment from "moment";
export * from "./loading";
export * from "./convention";
export const TIMEOUT_CONSTANT = 500;
export const FINAL_DATE = moment("9999-12-31").endOf("day").toJSON();
export const START_DATE = moment("2021-11-21").startOf("day").toJSON();
export const CQTQLY_SUPPORT = "cơ quan thuế quản lý";

//Đăng ký/thay đổi
export const TKHAI_XPATH_IN = "TKhai\\DLTKhai";
export const TKHAI_XPATH_OUT = "TKhai\\DSCKS\\NNT";

//Thông báo chấp nhận/không chấp nhận đăng ký
export const TBDKY_XPATH_IN = "TBao\\DLTBao";
export const TBDKY_XPATH_OUT = "TBao\\DSCKS\\CQT";

//Đề nghị phát sinh điện tử
export const DNGHI_XPATH_IN = "DNghi\\DLDNghi";
export const DNGHI_XPATH_OUT = "DNghi\\DSCKS\\NNT";

//Hóa đơn
export const HDON_XPATH_IN = "HDon\\DLHDon";
export const HDON_XPATH_OUT = "HDon\\DSCKS\\Nban";

//Thông báo hủy giải trình (04-SS)
export const TBHGTRINH_XPATH_IN = "TBao\\DLTBao";
export const TBHGTRINH_XPATH_OUT = "TBao\\DSCKS\\NNT";

//Thông báo sai sót (01-SS)
export const TBSSOT_XPATH_IN = "TBao\\DLTBao";
export const TBSSOT_XPATH_OUT = "TBao\\DSCKS\\CQT";

//Thông báo rà soát
export const TBRSOAT_XPATH_IN = "TBao\\DLTBao";
export const TBRSOAT_XPATH_OUT = "TBao\\DSCKS\\CQT";
