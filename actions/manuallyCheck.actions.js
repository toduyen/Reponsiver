import { sendGet, sendPost, sendPut, sendPostBlob } from "utils/requests";
import {
  GET_LIST_MANUALLY_INVOICE,
  CREATE_MANUAL_CONFIGURATION,
} from "./action_types";
import { layoutToggleLoading } from "actions";
import notification from "utils/notification";
import { convertObjectToUrl } from "utils/helper";
import _isEmpty from "lodash/isEmpty";

export const getManuallyCheckList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  console.log("query", query);
  return sendGet(
    `${API_MANUALLY_URL}/dky-kqua${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_MANUALLY_INVOICE,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getListCqt = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_MANUALLY_URL}/dky-kqua/danh-sach-cqt`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_MANUALLY_INVOICE,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDetailCqt = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_MANUALLY_URL}/dky-kqua-ctiet/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_MANUALLY_INVOICE,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const createManualConfiguration = (jwt, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_MANUALLY_URL}/dky-kqua`, null, data, jwt)
    .then(({ data }) => {
      dispatch({
        type: CREATE_MANUAL_CONFIGURATION,
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
