import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendPost, sendPut } from "utils/requests";
import {
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
  GET_PRIVILEGES_SUCCESS,
  GET_ROLE_LIST_SUCCESS,
  UPDATE_GROUP_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getRoleList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/roles${convertObjectToUrl(query)}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_ROLE_LIST_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getPrivileges = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/privileges/list`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_PRIVILEGES_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const createGroup = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/roles`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới vai trò thành công");
      dispatch({
        type: CREATE_GROUP_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const updateGroup = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_SYS_URL}/roles/${data.id}`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Sửa vai trò thành công");
      dispatch({
        type: UPDATE_GROUP_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const deleteGroup = (data, token) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_SYS_URL}/roles/${data.id}`, null, token)
    .then((res) => {
      notification.success("Xoá vai trò thành công");
      return dispatch({
        type: DELETE_GROUP_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
