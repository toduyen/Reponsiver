import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import {
  sendDelete,
  sendDeleteWithBody,
  sendGet,
  sendPatch,
  sendPost,
  sendPut,
} from "utils/requests";
import {
  CREATE_QLTQK_SUCCESS,
  GET_LIST_QLTQK_SUCCESS,
  UPDATE_QLTQK_SUCCESS,
  DELETE_QLTQK_SUCCESS,
  GET_LIST_NOTIFCATION_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const createTQKY = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/tqky`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Tạo thẩm quyền ký thành công");
      dispatch({
        type: CREATE_QLTQK_SUCCESS,
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

export const getTQKYList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/tqky${convertObjectToUrl(query)}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_QLTQK_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const updateTQKY =
  (data = {}, token) =>
  (dispatch) => {
    const { ltbao, cbgiao, cbdgiao } = data;
    dispatch(layoutToggleLoading(true));
    return sendPatch(
      `${API_SYS_URL}/tqky`,
      null,
      data,
      token
    )
      .then((res) => {
        notification.success("Sửa thẩm quyền ký thành công");
        return dispatch({
          type: UPDATE_QLTQK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  };

export const deleteTQKY = (ltbao, cbdgiao, cbgiao, token) => (dispatch) => {
  const data = {
    ltbao: ltbao,
    cbdgiao: cbdgiao,
    cbgiao: cbgiao,
  };
  dispatch(layoutToggleLoading(true));
  return sendDeleteWithBody(`${API_SYS_URL}/tqky`, null, data, token)
    .then((res) => {
      notification.success("Xoá thẩm quyền ký thành công");
      return dispatch({
        type: DELETE_QLTQK_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getFullListNotification = (jwt) => (dispatch) => {
  return sendGet(`${DEV_ENPOINT}category/dmucs/loais/tbao`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_NOTIFCATION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
