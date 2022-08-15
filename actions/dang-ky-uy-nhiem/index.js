import { layoutToggleLoading } from "actions";
import {
  convertObjectToUrl,
  generateSearchString,
  savingFile,
} from "utils/helper";
import notification from "utils/notification";
import {
  sendGet,
  sendPost,
  sendPatch,
  sendPut,
  sendGetBlob,
} from "utils/requests";
import {
  DANG_KY_UY_NHIEM_SEARCH_SUCCESS,
  DANG_KY_UY_NHIEM_DENY_SUCCESS,
  DANG_KY_UY_NHIEM_DETAIL_SUCCESS,
  DANG_KY_UY_NHIEM_DETAIL_FAILED,
  DANG_KY_UY_NHIEM_PDLD_SUCCESS,
  DANG_KY_UY_NHIEM_SIGN_SUCCESS,
  DANG_KY_UY_NHIEM_ACCEPT_SUCCESS,
  DANG_KY_UY_NHIEM_CREATE_TB_SUCCESS,
  DANG_KY_UY_NHIEM_HISTORY_SUCCESS,
  DANG_KY_UY_NHIEM_UPDATE_SUCCESS,
} from "../action_types";
import { isEmpty } from "lodash";

// Xử lý
export const getAllMandateAction = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_MANDATE}/official/process/tkunhiemmsts${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_SEARCH_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const getMandateDetailAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem, mstunhiem, mstnunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/process/tkunhiemmsts/detail${convertObjectToUrl({
      idtkhaiunhiem,
      mstunhiem,
      mstnunhiem,
    })}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_DETAIL_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      dispatch({
        type: DANG_KY_UY_NHIEM_DETAIL_FAILED,
      });
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
export const viewToKhaiMandateAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/process/tkunhiems/${idtkhaiunhiem}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
export const viewToKhaiMandateActionDT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkungcap } = param || {};
  return sendGet(
    `${API_MANDATE}/official/process/tkunhiems/${idtkungcap}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const historyMandateAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem, mstunhiem, mstnunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/process/tkunhiemmsts/histories${convertObjectToUrl(
      { idtkhaiunhiem, mstunhiem, mstnunhiem }
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_HISTORY_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const updateMandateAction = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_MANDATE}/official/process/tkunhiemmsts`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Cập nhật thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_UPDATE_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const assistantMandateAction = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_MANDATE}/official/process/submission/assistant`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Trình phụ trách thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const directorMandateAction = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_MANDATE}/official/process/submission/director`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Trình lãnh đạo thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const signedMandateAction = (jwt, body) => (dispatch) => {
  return sendPut(`${API_MANDATE}/official/process/signing`, null, body, jwt)
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const assistantMultiMandateAction = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_MANDATE}/official/process/submission/assistant/multiple`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Trình Phụ trách thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const directorMultiMandateAction = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_MANDATE}/official/process/submission/director/multiple`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Trình Lãnh đạo thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const signedMultiMandateAction = (jwt, body) => (dispatch) => {
  return sendPut(
    `${API_MANDATE}/official/process/signing/multiple`,
    null,
    body,
    jwt
  )
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const xmlGenMandateAction = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_MANDATE}/official/process/xml-generation`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const xmlGenMultiMandateAction = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_MANDATE}/official/process/xml-generation/multiple`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

// Tra cuu
export const seachScreenAllMandateAction = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_MANDATE}/official/lookup${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const searchScreenDetailAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/lookup/tkunhiems/${idtkhaiunhiem}/tkunhiemmsts`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const searchScreenViewTkAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/lookup/tkunhiems/${idtkhaiunhiem}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const searchScreenViewTbAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem, mstnunhiem, mstunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/lookup/tkunhiemmsts/detail${convertObjectToUrl({
      idtkhaiunhiem,
      mstunhiem,
      mstnunhiem,
    })}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const lookupViewTbAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, idtbao } = param || {};
  return sendGet(
    `${API_MANDATE}/official/lookup/tbdkyunhiems/${mst}/${idtbao}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
  // /
};

export const approvalViewTbTNDTAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_MANDATE}/official/lookup/tbtnhan${convertObjectToUrl(param)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
  // /
};

export const exportExcelHandleCredentials = (jwt, query) => (dispatch) => {
  // const { search, pvdlieu } = query || {};
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}delegation/official/lookup/tkunhiemmsts/excel-export${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách kết quả hồ sơ đăng ký ủy nhiệm/nhận ủy nhiệm");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// Phe duyet
export const approvalScreenAllMandateAction = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_MANDATE}/official/approval/tbdkyunhiems${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_SEARCH_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const submissionMandateAction = (jwt, body) => (dispatch) => {
  return sendPut(`${API_MANDATE}/official/approval/submission`, null, body, jwt)
    .then((res) => {
      notification.success("Trình lãnh đạo thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const rejectionMandateAction = (jwt, body) => (dispatch) => {
  return sendPut(`${API_MANDATE}/official/approval/rejection`, null, body, jwt)
    .then((res) => {
      notification.success("Từ chối thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const approvalMandateAction = (jwt, body) => (dispatch) => {
  return sendPut(`${API_MANDATE}/official/approval`, null, body, jwt)
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const approvalXmlGenMandateAction = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_MANDATE}/official/approval/xml-generation`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const approvalViewToKhaiAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhai } = param || {};
  return sendGet(
    `${API_MANDATE}/official/approval/tkunhiems/${idtkhai}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const approvalViewTbAction = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, id } = param || {};
  return sendGet(
    `${API_MANDATE}/official/approval/tbdkyunhiems/${mst}/${id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
  // /
};

// Văn thư

export const approvalScreenAllMandateActionVT = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_MANDATE}/official/vt-approval/${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_SEARCH_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const approvalViewTbActionVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, id } = param || {};
  return sendGet(
    `${API_MANDATE}/official/vt-approval/tbdkyunhiems/${mst}/${id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
  // /
};

export const approvalXmlGenMandateActionVT = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_MANDATE}/official/vt-approval/xml-generation`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      if (isEmpty(data)) {
        dispatch({
          type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
          payload: data,
        });
      }
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const approvalMandateActionVT = (jwt, body) => (dispatch) => {
  return sendPost(`${API_MANDATE}/official/vt-approval`, null, body, jwt)
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const approvalViewToKhaiActionVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhai } = param || {};
  return sendGet(
    `${API_MANDATE}/official/vt-approval/tkunhiems/${idtkhai}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const historyMandateSearch = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { idtkhaiunhiem, mstunhiem, mstnunhiem } = param || {};
  return sendGet(
    `${API_MANDATE}/official/lookup/tkunhiemmsts/histories${convertObjectToUrl({
      idtkhaiunhiem,
      mstunhiem,
      mstnunhiem,
    })}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DANG_KY_UY_NHIEM_HISTORY_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const approvalViewTbTNDTActionVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, nlap, idtkhai } = param || {};
  return sendGet(
    `${API_MANDATE}/official/vt-approval/tbtnhan${convertObjectToUrl({
      mst,
      nlap,
      idtkhai,
    })}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
  // /
};

export const rejectionMandateActionVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_MANDATE}/official/vt-approval/rejection`,
    null,
    param,
    jwt
  )
    .then(({ data }) => {
      notification.success("Từ chối thành công");
      dispatch({
        type: DANG_KY_UY_NHIEM_PDLD_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
