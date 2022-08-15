import { sendGet, sendPost } from "utils/requests";
import {
  AUTH_AUTHENTICATE_SUCCESS,
  AUTH_GET_USER_INFO_SUCCESS,
  AUTH_GET_USER_INFO_ERROR,
  AUTH_SAVE_LOGGED_USER,
  AUTH_LOGOUT,
} from "./action_types";
import notification from "utils/notification";

export const authAuthenticate = (data) => (dispatch) => {
  return sendPost(`${API_URL}/authenticate`, null, data)
    .then(({ data }) => {
      dispatch({
        type: AUTH_AUTHENTICATE_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const authGetUserInfo = (accessToken) => (dispatch) => {
  return sendGet(`${API_URL}/profile`, null, accessToken)
    .then(({ data }) => {
      dispatch({
        type: AUTH_GET_USER_INFO_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: AUTH_GET_USER_INFO_ERROR,
      });
      if (typeof window !== "undefined") notification.errorStrict(err);
      throw err;
    });
};

export const authSaveLoggedUser = (payload) => {
  return { type: AUTH_SAVE_LOGGED_USER, payload };
};

export const authSetLogin = (payload) => {
  return { type: AUTH_AUTHENTICATE_SUCCESS, payload };
};

export const authLogout = () => {
  return { type: AUTH_LOGOUT };
};
