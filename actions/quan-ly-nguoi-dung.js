import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendPost, sendPut } from "utils/requests";
import {
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  GET_FULL_ROLE_LIST_SUCCESS,
  GET_FULL_CQT_LIST_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const createAccount = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/users`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Tạo tài khoản thành công");
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      if (
        !["Tên đăng nhập đã tồn tại.", "Tên người dùng đã tồn tại."].includes(
          err.response.data.message
        )
      ) {
        notification.errorStrict(err);
      }
      return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getAccountList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/users${convertObjectToUrl(query)}`, null, jwt)
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

export const getListPhanQuyenBenThu3 = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/user-third-party/privileges-roles`, null, jwt)
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

export const checkUserName = (userName, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/user-third-party/check-user-exists/${userName}`, null, jwt)
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

export const updateAccount =
  (id, data = {}, token) =>
  (dispatch) => {
    dispatch(layoutToggleLoading(true));
    return sendPut(`${API_SYS_URL}/users/${id}`, null, data, token)
      .then((res) => {
        notification.success("Sửa tài khoản thành công");
        return dispatch({
          type: UPDATE_ACCOUNT_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  };

export const deleteAccount = (id, token) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_SYS_URL}/users/${id}`, null, token)
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

export const getFullRoleList = (jwt) => (dispatch) => {
  return sendGet(`${API_SYS_URL}/roles`, null, jwt)
    .then(({ data }) => {
      console.log(
        "🚀 ~ file: quan-ly-nguoi-dung.js ~ line 90 ~ .then ~ data",
        data
      );
      dispatch({
        type: GET_FULL_ROLE_LIST_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};
export const getFullCQTList = (jwt, query) => (dispatch) => {
  const defaultquery = {
    ...query,
    size: 10000,
  };
  // console.log(defaultquery, "defaultquery");
  return sendGet(
    `${API_CATEGORY_URL}/dm-cqts${convertObjectToUrl(defaultquery)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_FULL_CQT_LIST_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const findUserAd = (jwt, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/users/find-user-ad`, null, data, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
