import { sendGet, sendPost, sendPut, sendPatch } from "utils/requests";
import {
  GET_LIST_TVAN_SUCCESS,
  GET_TVAN_DETAIL_SUCCESS,
  ADD_TVAN_SUCCESS,
  UPDATE_TVAN_SUCCESS,
  CLEAN_TVAN,
  PAUSE_TVAN,
  STOP_TVAN,
  CANCEL_TVAN,
  CONTINUATION_TVAN,
} from "../action_types";
import notification from "utils/notification";
import { convertObjectToUrl, downloadFileBytes, savingFile } from "../../utils/helper";
import { layoutToggleLoading } from "../layout.action";
import { sendPostBlob, sendGetBlob } from "../../utils/requests";

export const getListTvan =
  (token, query = {}) =>
  (dispatch) => {
    // dispatch(layoutToggleLoading(true));
    const sort = "ncnhat:DESC";
    return sendGet(
      `${DEV_ENPOINT}category/ds-tvans${convertObjectToUrl(
        query
      )}&sort=${sort}`,
      null,
      token
    )
      .then(({ data }) => {
        dispatch({
          type: GET_LIST_TVAN_SUCCESS,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    // .finally(() => dispatch(layoutToggleLoading(false)));
  };

export const getTvanDetail = (token, data) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-tvans/${data.mst}/${data.id}`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_TVAN_DETAIL_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const updateTvan = (token, data, formData) => (dispatch) => {
  return sendPut(
    `${DEV_ENPOINT}category/ds-tvans/${data.mst}/${data.id}`,
    null,
    formData,
    token
  )
    .then(({ data }) => {
      notification.success(
        "Chỉnh sửa Danh sách tổ chức truyền nhận thành công"
      );
      dispatch({
        type: UPDATE_TVAN_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const addTvan = (token, data) => (dispatch) => {
  return sendPost(`${DEV_ENPOINT}category/ds-tvans`, null, data, token)
    .then(({ data }) => {
      notification.success("Thêm mới thành công");
      dispatch({
        type: ADD_TVAN_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const cleanTvanDetail = () => (dispatch) => {
  dispatch({
    type: CLEAN_TVAN,
    payload: {},
  });
};

export const getTvanTN = (token, data) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data.id}/service-providing/dstvantns`,
    null,
    token
  )
    .then(({ data }) => {
      // dispatch({
      //   type: PAUSE_TVAN,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const pauseTvan = (token, data, formData) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data.iddstvan}/service-providing/dstvantns`,
    null,
    formData,
    token
  )
    .then(({ data }) => {
      notification.success("Tạm ngừng thành công");
      dispatch({
        type: PAUSE_TVAN,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const stopTvan = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data?.id}/service-providing/status/stop`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Ngừng dịch vụ thành công");
      dispatch({
        type: STOP_TVAN,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getHistoriesTvan = (token, data) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data?.id}/histories`,
    null,
    token
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const cancelTvan = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data?.iddstvan}/service-providing/dstvantns/${data?.id}/status/cancel`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Huỷ thành công");
      dispatch({ type: CANCEL_TVAN });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const continuationTvan = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPatch(
    `${DEV_ENPOINT}category/ds-tvans/${data?.mst}/${data?.id}/service-providing/status/continuation`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Tiếp tục thành công");
      dispatch({ type: CONTINUATION_TVAN });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelTVAN = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  // query.sort = "ncnhat:desc,ntao:desc";
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-tvans/excel-export${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, "Danh sách tổ chức truyền nhận");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const checkCTSTvan = (token, mst, id, seri) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-tvans/${mst}/${id}/${seri}/kiem-tra-cts`,
    null,
    token
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const dowloadFileTvan = (jwt, id, fileName) => (dispatch) => {
  return sendGetBlob(
    `${DEV_ENPOINT}category/ds-tvans/${id}/attachment/download`,
    null,
    jwt
  )
    .then(({ data }) => {
      return downloadFileBytes(data, fileName);
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
