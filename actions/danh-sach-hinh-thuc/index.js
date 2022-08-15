import { values } from "lodash";
import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import {
  sendDelete,
  sendGet,
  sendPatch,
  sendPost,
  sendPut,
} from "utils/requests";
import {
  GET_DETAIL_DS_HTCKS,
  GET_LIST_DS_HTCKS,
  CREATE_DS_HTCKS,
  UPDATE_DS_HTCKS,
  DELETE_DS_HTCKS,
} from "../action_types";
import { layoutToggleLoading } from "../layout.action";

export const createFormalityCategory = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-htcks`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới hình thức thành công");
      dispatch({
        type: CREATE_DS_HTCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      if (
        !["hình thức đã tồn tại.", "hình thức đã tồn tại."].includes(
          err.response.data.message
        )
      ) {
        notification.errorStrict(err);
      }
      // return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getFormalityCategory = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-htcks${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DS_HTCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDetailFormalityCategory = (jwt, query) => (dispatch) => {
  const { cqt, ma } = query;
  return sendGet(`${API_CATEGORY_URL}/ds-htcks/${cqt}/${ma}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_DS_HTCKS,
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

export const updateFormalityCategory = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const cqt = data.cqt;
  const ma = data.ma;
  return sendPut(`${API_CATEGORY_URL}/ds-htcks`, null, data, token)
    .then((res) => {
      notification.success("Sửa hình thức thành công");
      return dispatch({
        type: UPDATE_DS_HTCKS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const deleteFormalityCategory = (cqt, ma, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_CATEGORY_URL}/ds-htcks/${cqt}/${ma}`, null, jwt)
    .then((res) => {
      notification.success("Xóa hình thức thành công");
      return dispatch({
        type: DELETE_DS_HTCKS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
