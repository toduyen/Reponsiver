import {
  printHDO1,
  printHDO2,
  printHDO3,
  printHDO4,
  printHDO5,
  printHDO6,
  printHDO7,
} from "utils/printContainer";

export const HANDLE_STATUS = {
  0: "Lưu tạm",
  1: "Chờ phê duyệt",
  2: "Đã phê duyệt",
  3: "Từ chối phê duyệt",
};

export const TVAN_STATUS = {
  0: "Chưa đến ngày cung cấp dịch vụ",
  1: "Đang cung cấp dịch vụ",
  2: "Tạm ngừng cung cấp dịch vụ",
  3: "Ngừng cung cấp dịch vụ",
};

export const REGISTER_FORM = {
  1: "Thêm mới",
  2: "Gia hạn",
  3: "Ngừng",
};

export const ADD_FORM = {
  1: "Thêm mới",
};

export const HANDLE_STATUS_DNRRCVT = {
  0: "Lưu tạm",
  1: "Chờ phụ trách phê duyệt",
  2: "Đã phê duyệt",
  3: "Phụ trách từ chối",
  // 2: "Chờ lãnh đạo phê duyệt",
  // 3: "Đã ký phê duyệt",
  // 4: "Phụ trách từ chối",
  // 5: "Lãnh đạo từ chối",
  // 6: "Đã ký ban hành",
  // 7: "Đã phê duyệt",
};

export const TB_KTT = {
  0: "Tạo mới",
  1: "Chờ phụ trách phê duyệt",
  2: "Chờ lãnh đạo phê duyệt",
  3: "Phụ trách từ chối",
  4: "Lãnh đạo từ chối",
  5: "Đã ký duyệt",
  6: "Đã ký ban hành",
};

export const STATUS_XLDNPS = {
  0: "Cơ quan thuế đã nhận",
  1: "Cán bộ thuế tạo lập",
  2: "Chờ phụ trách phê duyệt",
  3: "Chờ lãnh đạo phê duyệt",
  4: "Đã phê duyệt",
  5: "Phụ trách từ chối",
  6: "Lãnh đạo từ chối",
  7: "Đã được cấp mã hồ sơ",
  8: "Đã lập hóa đơn",
  9: "Cơ quan thuế duyệt hóa đơn theo từng lần phát sinh",
  10: "Cơ quan thuế từ chối hóa đơn theo từng lần phát sinh",
  11: "Đóng hồ sơ",
};

export const DECENTRALIZE_STATUS_XLDNPS = {
  0: "Cán bộ thuế tạo lập",
  1: "Hệ thống tạo lập",
  2: "Chờ phụ trách phê duyệt",
  3: "Chờ lãnh đạo phê duyệt",
  5: "Phụ trách từ chối",
  6: "Lãnh đạo từ chối",
};

export const STATUS_KQDNPSDT = {
  0: "Cán bộ thuế tạo lập",
  1: "Hệ thống tạo lập",
  2: "Chờ phụ trách phê duyệt",
  3: "Chờ lãnh đạo phê duyệt",
  4: "Đã ký phê duyệt",
  5: "Phụ trách từ chối",
  6: "Lãnh đạo từ chối",
  7: "Đã ký ban hành",
};

export const STATUS_LHSDN = {
  0: "Hồ sơ đề nghị cấp hóa đơn điện tử có mã của CQT",
  1: "Chứng từ nộp thuế",
  2: "Hóa đơn điện tử có mã của CQT",
};

export const STATUS_KQKT = {
  0: "Hồ sơ hợp lệ",
  1: "Hồ sơ không hợp lệ",
  2: "Chứng từ không khớp đúng",
  3: "Hóa đơn điện tử cần cấp mã của cơ quan thuế không hợp lệ",
};

export const EDITED_STATUS_KQKT = {
  0: "Hợp lệ",
  1: "Không hợp lệ",
};

export const SYMBOL_DENOMINATOR = {
  1: "Hóa đơn giá trị gia tăng",
  2: "Hóa đơn bán hàng",
  3: "Hóa đơn bán tài sản công",
  4: "Hóa đơn bán hàng dự trữ quốc gia",
  5: "Hóa đơn khác",
  6: "Các chứng từ được in, phát hành, sử dụng và quản lý như hóa đơn",
};
export const INVOICE_STATUS = {
  1: "Hóa đơn gốc",
  2: "Hóa đơn thay thế",
  3: "Hóa đơn điều chỉnh",
  4: "Hóa đơn đã bị thay thế",
  5: "Hóa đơn đã bị điều chỉnh",
  6: "Hoá đơn đã bị xoá/huỷ bỏ",
};

export const INVOICE_STATUS_TLPS = {
  0: "CBT tạo lập",
  1: "Hệ thống tạo lập",
  2: "Chờ phụ trách phê duyệt",
  3: "Chờ lãnh đạo phê duyệt",
  4: "Đã phê duyệt",
  5: "Phụ trách từ chối",
  6: "Lãnh đạo từ chối",
};

export const TYPE_INVOICE = {
  0: "Tất cả",
  1: "Hóa đơn giá trị gia tăng",
  2: "Hóa đơn bán hàng",
  3: "Hóa đơn bán tài sản công",
  4: "Hóa đơn bán hàng dự trữ quốc gia",
  5: "Hóa đơn khác",
  6: "Chứng từ được in, phát hành, sử dụng và quản lý như hóa đơn",
};

export const REGISTRATION_PROCESS_STATUS = {
  HE_THONG_DA_KIEM_TRA: { key: 0, value: "Hệ thống đã kiểm tra" },
  CBT_DA_XU_LY: { key: 1, value: "Cán bộ thuế đã xử lý" },
  CHO_PHU_TRACH_PD: { key: 2, value: "Chờ phụ trách phê duyệt" },
  TRINH_PHU_TRACH_BP: { key: 3, value: "Trình phụ trách bộ phân" },
  CHO_LD_PHE_DUYET: { key: 4, value: "Chờ lãnh đạo phê duyệt" },
  LD_DA_PHE_DUYET: { key: 5, value: "Lãnh đạo đã phê duyệt" },
  PHU_TRACH_TU_CHOI: { key: 6, value: "Phụ trách từ chối" },
  LD_TU_CHOI: { key: 7, value: "Lãnh đạo từ chối" },
  VAN_THU_BAN_HANH: { key: 8, value: "Văn thư đã ban hành" },
};

export const REGISTRATION_PROCESS_STATUS_SELECT = {
  0: "Cơ quan thuế đã tiếp nhận tờ khai",
  1: "Hệ thống đã kiểm tra",
  2: "Cán bộ thuế đã xử lý",
  3: "Chờ phụ trách phê duyệt ",
  4: "Chờ lãnh đạo phê duyệt",
  5: "Lãnh đạo đã phê duyệt ",
  6: "Phụ trách từ chối",
  7: "Lãnh đạo từ chối",
  8: "Văn thư đã ban hành",
};

export const STATUS_RESGITER_MANDATE = {
  // 0: "Không hợp lệ",
  // 1: "Hợp lệ",
  // 2: "Đủ bộ hồ sơ",
  1: "Hệ thống đã kiểm tra",
  2: "Cán bộ thuế xử lý",
  6: "Phụ trách từ chối",
};

export const PAYMENT_METHOD = {
  1: "Tiền mặt",
  2: "Chuyển khoản",
  3: "Tiền mặt/Chuyển khoản",
  4: "Đổi trừ công nợ",
  5: "Không thu tiền",
  9: "Khác",
};

export const HTHUC_HDON = {
  0: "Chưa đăng ký",
  1: "Không mã",
  2: "Có mã",
  3: "Có mã, không mã",
};

export const HTHUC_DKY = {
  0: "Không mã",
  1: "Có mã",
};

export const DOMAIN = [
  "mb.tct.vn",
  "mn.tct.vn",
  "han.tct.vn",
  "hcm.tct.vn",
  "vp.tct.vn",
];

// export const HTHD_TNXLDK = {
//   0: "Có mã phải trả tiền dịch vụ",
//   1: "Có mã không phải trả tiền dịch vụ",
//   2: "Không mã chuyển dữ liệu trực tiếp",
//   3: "Không mã thông qua tổ chức cung cấp dịch vụ",
//   4: "Khác",
// };

// export const PTCHUYEN_TNXLDK = {
//   0: "Chuyển đầy đủ",
//   1: "Chuyển theo bảng tổng hợp",
//   2: "Chuyển đầy đủ và theo bảng tổng hợp",
//   3: "Khác",
// };

export const CQTQLY_SUPPORT = "cơ quan thuế quản lý";

export const DM_LOAI = {
  1: "Tổ chức truyền nhận",
  2: "Doanh nghiệp KNTT",
  3: "Cổng điện tử",
};

export const CQT = {
  ["0100"]: "Cục Thuế Thành Phố Hà Nội",
  ["2200"]: "Cục Thuế Tỉnh Quảng Ninh",
  ["2500"]: "Cục thuế Tỉnh Phú Thọ",
  ["3100"]: "Cục thuế Thành phố Hải phòng",
  ["5200"]: "Cục Thuế Tỉnh Bình Định",
  ["7900"]: "Cục Thuế Thành phố Hồ Chí Minh",
};

export const STATUS_DNVN = {
  0: "Tất cả",
  1: "Lưu tạm",
  2: "Chờ phụ trách phê duyệt",
  3: "Phụ trách từ chối",
};

export const STATUS_MISTAKENINVOICE = {
  0: "Tất cả",
  1: "Chờ xử lý",
  2: "Đã xử lý",
  3: "Chờ phụ trách phê duyệt",
  4: "Chờ lãnh đạo phê duyệt",
  5: "Lãnh đạo từ chối",
  6: "Phụ trách từ chối",
};

export const THOP_DOI_SOAT = {
  1: "Gói tin HDDT nhận được, chưa gửi phản hồi",
  2: "Gói tin HDDT không nhận được",
};

export const TTHAI_DOI_SOAT = {
  0: "Chờ xử lý",
  1: "Đang xử lý",
  2: "Đã hoàn thành",
  3: "Lỗi",
};

export const LOAI_UY_NHIEM = {
  1: "Uỷ nhiệm",
  2: "Nhận uỷ nhiệm",
};

export const TT_UY_NHIEM = {
  0: "Không hợp lệ",
  1: "Hợp lệ",
  2: "Đủ bộ hồ sơ",
};

export const KQ_UY_NHIEM = {
  1: "Chấp nhận",
  0: "Không chấp nhận",
};

export const TTXLY_UY_NHIEM = {
  1: "Hệ thống đã kiểm tra",
  2: "Cán bộ thuế xử lý",
};

export const PRINT_HD = {
  "01": printHDO1,
  "02": printHDO2,
  "06_01": printHDO3,
  "06_02": printHDO4,
  "03": printHDO5,
  "04": printHDO6,
  "05": printHDO7,
};

export const TTXLY_UY_NHIEM_PD = {
  1: "Chờ phụ trách phê duyệt",
  2: "Chờ lãnh đạo phê duyệt",
  3: "Lãnh đạo đã phê duyệt",
  4: "Phụ trách từ chối",
  5: "Lãnh đạo từ chối",
};
export const TTXLY_UY_NHIEM_PD_SEARCH = {
  1: "Chờ phụ trách phê duyệt",
  2: "Chờ lãnh đạo phê duyệt",
  5: "Lãnh đạo từ chối",
};
export const KQ_UY_NHIEM_XL = {
  0: "Không chấp nhận",
  1: "Chấp nhận",
};

export const TRANG_THAI_XU_LY = {
  0: "Lưu tạm",
  1: "Chờ phụ trách phê duyệt",
  2: "Chờ lãnh đạo phê duyệt",
  3: "Lãnh đạo đã phê duyệt",
  4: "Phụ trách từ chối",
  5: "Lãnh đạo từ chối",
  6: "Văn thư đã ban hành",
};

export const TRANG_THAI_XU_LY_TC = {
  // 0: "Đã tiếp nhận tờ khai đăng ký sử dụng HĐĐT",
  1: "Hệ thống đã kiểm tra",
  2: "Cán bộ thuế đã xử lý",
  3: "Chờ phụ trách phê duyệt",
  4: "Chờ lãnh đạo phê duyệt",
  5: "Lãnh đạo đã phê duyệt",
  6: "Phụ trách từ chối",
  7: "Lãnh đạo từ chối",
  8: "Văn thư đã ban hành",
};

export const TTXLY_TEM = {
  0: "Chờ xử lý",
  1: "Cán bộ gửi duyệt",
  2: "Cán bộ từ chối",
  3: "Lãnh đạo đã duyệt",
  4: "Lãnh đạo từ chối",
  5: "Lãnh đạo đã ký",
  6: "Văn thư đã ban hành",
};

export const STATUS_RESGITER_MANDATE_VT = {
  3: "Lãnh đạo đã phê duyệt",
};

export const STATUS_REPORT = {
  0: "Chờ xử lý",
  1: "Đang xử lý",
  2: "Đã hoàn thành",
  ["-1"]: "Lỗi",
};

export const TYPE_REPORT = {
  lnnt: "Loại người nộp thuế",
  lhkt: "Loại hình kinh tế",
  lhktct: "Loại hình kinh tế chi tiết",
};

export const HINH_THUC = {
  0: "Tất cả",
  1: "Tờ khai đăng ký",
  2: "Tờ khai thay đổi thông tin",
};

export const TTXLY_SVTHU = {
  0: "Chưa ban hành",
  1: "Đã ban hành",
};

export const LOAI_DK = {
  0: "Đăng ký mới",
  1: "Đăng ký thay đổi",
};
