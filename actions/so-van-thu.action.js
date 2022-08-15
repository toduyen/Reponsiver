import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl, savingFile } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendGetBlob, sendPost, sendPut } from "utils/requests";
import { GET_LIST_SVT_SUCCESS } from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getSVTList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-so${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_SVT_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const postSVTDetail = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-so/tb`, null, body, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelSoVT = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-so/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách số văn thư");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
