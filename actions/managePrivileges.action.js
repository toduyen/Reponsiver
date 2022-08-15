import { convertObjectToUrl, savingFile } from "utils/helper";
import notification from "utils/notification";
import {
  sendDeleteWithBody,
  sendGet,
  sendGetBlob,
  sendPatch,
  sendPost,
  sendPut,
} from "utils/requests";
import {
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_SUCCESS,
  GET_NEW_PRIVILEGES_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getUserLookUp = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/user-lookup${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ACCOUNT_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// Quản lý phân quyền bên thứ 3 table (TDM = thirdparty decentralizatin management)
export const getTDMToTable = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/ds-dnctkbtb${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_LIST_ACCOUNT_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// Xuất Excel bảng danh sách phân quyền bên thứ 3:
export const exportExcelPhanQuyenBenThuBa = (query, jwt) => (dispatch) => { 
  debugger
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_SYS_URL}/ds-dnctkbtb/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Kết quả Danh sách phân quyền bên thứ 3");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// Thêm mới User phân quyền bên thứ 3:
export const postNewUserPhanQuyenBenThuBa = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/user-third-party`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Tạo người dùng thành công!");
      // dispatch({
      //   type: CREATE_ACCOUNT_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// Get Detail đề Nghị
export const getDetailDeNghi = (jwt, id) => (dispatch) => {
  debugger
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/user-third-party/${id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_LIST_ACCOUNT_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// Sửa đề nghị
export const putEditDeNghi = (jwt, body) => (dispatch) => {
  debugger
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_SYS_URL}/ds-dnctkbtb`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Sửa thông tin thành công!");
      // dispatch({
      //   type: CREATE_ACCOUNT_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};







export const getPrivilegesLookUp = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/user-lookup/privileges`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_NEW_PRIVILEGES_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const createAccountLookUp = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/user-lookup`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Tạo tài khoản thành công");
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const updateAccountLookUp = (body = {}, token) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPatch(`${API_SYS_URL}/user-lookup`, null, body, token)
    .then(({ data }) => {
      notification.success("Sửa tài khoản thành công");
      dispatch({
        type: UPDATE_ACCOUNT_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const deleteAccountLookUp = (data, token) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDeleteWithBody(`${API_SYS_URL}/user-lookup`, null, data, token)
    .then((res) => {
      notification.success("Xoá tài khoản thành công");
      return dispatch({
        type: DELETE_ACCOUNT_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getUserDetailLookUp = (jwt, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/user-lookup/${data.username}/${data.group}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getUserInfoLookUp = (jwt, username) => (dispatch) => {
  return sendGet(`${API_SYS_URL}/user-lookup/users/${username}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      // notification.errorStrict(err);
      return err.response.data;
    });
};

export const getCQTLookUp = (jwt, query) => (dispatch) => {
  debugger
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/dm-cqts/lookup${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getMSTLookUp = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/dsdkts/qlpq${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getListMstDecetralization = (jwt, mst) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/user-third-party/taxpayer/${mst}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};