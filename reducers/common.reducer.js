import update from "immutability-helper";
import {
  SELECTED_ROW_SUCCESS,
  SHOW_ACTION_STATUS_SUCCESS,
  GET_MENU_SUCCESS,
  SELECT_USER_INCHARGE_SUCCESS,
  GET_TINH,
  GET_HUYEN,
  GET_XA,
  SELECTED_TINH,
  SELECTED_HUYEN,
  SELECTED_XA,
} from "actions/action_types";
import { removeAccents } from "../utils/helper";

const initState = {
  selectedRow: {},
  menuPrivileges: [],
  userIncharge: {},
  tinhs: [],
  huyens: [],
  xas: [],
  selectedTinh: null,
  selectedHuyen: null,
  selectedXa: null,
  code: {},
};

const ICON_MENU = {
  TNXLDK: "tiep_nhan_xu_ly_dang_ky.svg",
  TNXLDKUN: "tiep_nhan_xu_ly_dang_ky_uy_quyen.svg",
  TNXLSS: "tiep_nhan_xu_ly_hoa_don_sai_sot.svg",
  TNXLSSPS: "tiep_nhan_xu_ly_hoa_don_phat_sinh_sai_sot.svg",
  TNXLDNPS: "tiep_nhan_xu_ly_de_nghi_phat_sinh.svg",
  TNXLHDPS: "tiep_nhan_xu_ly_hoa_don_phat_sinh.svg",
  QLDMTCT: "quan_ly_danh_muc.svg",
  TBSDHD: "thong_bao_tiep_tuc_ngung_su_dung_hoa_don.svg",
  DMRRCVT: "doanh_nghiep_rui_ro_cao_ve_thue.svg",
  DNUDDT: "danh_muc_dia_ban_kho_khan.svg",
  DNVVN: "doanh_nghiep_vua_nho_theo_quyet_dinh_cua_UBND.svg",
  QLHTCBT: "quan_ly_he_thong.svg",
  VTKBH: "van_thu_ky_ban_hanh.svg",
  VTKBHTEM: "van_thu_ky_ban_hanh.svg",
  VTQL: "quan_ly_van_thu.svg",
  TCCBT: "tra_cuu.svg",
  DSOAT: "doi_soat.svg",
  BCCBT: "bao_cao.svg",
  BCRRCBT: "bao_cao_rui_ro.svg",
  BSTCPQDL: "tra_cuu.svg",
  BCQLRR: "bao_cao_quan_ly.svg",
  TDTDKMUA: "tiep_nhan_xu_ly_hoa_don_phat_sinh.svg",
  TDTDKSD: "tiep_nhan_xu_ly_hoa_don_phat_sinh.svg",
};

const buildTreeMenu = (data) => {
  let map = new Map(data.map((v) => [v.code, v]));
  for (let value of map.values()) {
    value.link =
      "/" +
      removeAccents(value.name)
        .replace(/,/g, "")
        .replace(/\s/g, "-")
        .toLowerCase();
    value.icon = ICON_MENU[value.code];
    if (value.parent_code && map.get(value.parent_code)) {
      let parent = map.get(value.parent_code);
      value.link = `${parent.link}${value.link}`;
      parent.children = parent.children ? [...parent.children, value] : [value];
    }
  }
  const tree = data.filter((v) => !v.parent_code);
  return tree;
};

const convertCode = (data) => {
  let code = {};
  data.map((element) => {
    code[element.code] = element;
  });
  return code;
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case SELECTED_ROW_SUCCESS: {
      return update(state, { selectedRow: { $set: payload } });
    }
    case SELECT_USER_INCHARGE_SUCCESS: {
      return update(state, { userIncharge: { $set: payload } });
    }
    case SHOW_ACTION_STATUS_SUCCESS:
      return update(state, {
        actionStatus: { $set: payload },
      });
    case GET_MENU_SUCCESS: {
      return update(state, {
        menuPrivileges: { $set: buildTreeMenu(payload) },
        code: { $set: convertCode(payload) },
      });
    }
    case GET_TINH: {
      return update(state, {
        tinhs: { $set: payload?.datas || [] },
      });
    }
    case GET_HUYEN: {
      return update(state, {
        huyens: { $set: payload?.datas || [] },
      });
    }
    case GET_XA: {
      return update(state, {
        xas: { $set: payload?.datas || [] },
      });
    }
    case SELECTED_TINH: {
      return update(state, {
        selectedTinh: { $set: payload },
      });
    }
    case SELECTED_HUYEN: {
      return update(state, {
        selectedHuyen: { $set: payload },
      });
    }
    case SELECTED_XA: {
      return update(state, {
        selectedXa: { $set: payload },
      });
    }
    default:
      return state;
  }
};
