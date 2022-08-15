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
  CREATE_DS_CDCKS,
  DELETE_DS_CDCKS,
  GET_LIST_DS_CDCKS,
  GET_DETAIL_DS_CDCKS,
  UPDATE_DS_CDCKS,
} from "../action_types";
import { layoutToggleLoading } from "../layout.action";

export const createRankCatetgory = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-cdcks`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới chức danh thành công");
      dispatch({
        type: CREATE_DS_CDCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      if (
        !["Chức danh đã tồn tại.", "Chức danh đã tồn tại."].includes(
          err.response.data.message
        )
      ) {
        notification.errorStrict(err);
      }
      // return err.response.data;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getRankCategory = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-cdcks${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DS_CDCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
export const getRankCategorySelect = (jwt, query) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/ds-cdcks${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DS_CDCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const getRankCategorySelectByCqt = (jwt, query) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/ds-cdcks/qlnd${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DS_CDCKS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

export const getDetailRankCategory = (jwt, query) => (dispatch) => {
  const { cqt, ma } = query;
  return sendGet(`${API_CATEGORY_URL}/ds-cdcks/${cqt}/${ma}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_DS_CDCKS,
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

export const updateRankCategory = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const cqt = data.cqt;
  const ma = data.ma;
  return sendPut(`${API_CATEGORY_URL}/ds-cdcks`, null, data, token)
    .then((res) => {
      notification.success("Sửa chức danh thành công");
      return dispatch({
        type: UPDATE_DS_CDCKS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const deleteRankCategory = (cqt, ma, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_CATEGORY_URL}/ds-cdcks/${cqt}/${ma}`, null, jwt)
    .then((res) => {
      notification.success("Xóa chức danh thành công");
      return dispatch({
        type: DELETE_DS_CDCKS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
