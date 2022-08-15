/* eslint-disable no-undef */
import {
  sendGet,
  sendPost,
  sendPut,
  sendPostBlob,
  sendGetBlob,
} from "utils/requests";
import {
  GET_DS_DNKNTT_SUCCESS,
  GET_DETAIL_DNKNTT_SUCESS,
  UPDATE_DNKNTT_SUCESS,
  CREATE_DNKNTT_SUCESS,
  HISTORY_DNKNTT_SUCESS,
  CHECK_MST_DNKNTT_SUCESS,
  GET_DS_DNKNTT_NOT_APPLY_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "actions";
import notification from "utils/notification";
import { convertObjectToUrl, savingFile } from "utils/helper";
import _isEmpty from "lodash/isEmpty";

export const getBussinessList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnkntt${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_DNKNTT_SUCCESS,
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
export const getBussinessListNotApply = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnkntt/tra-cuu${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_DNKNTT_NOT_APPLY_SUCCESS,
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

export const getBussinessDetail = (jwt, query) => (dispatch) => {
  const { mst, nvbkntt, id } = query;
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnkntt/${mst}/${nvbkntt}/${id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_DNKNTT_SUCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const updateBussinessKntt = (jwt, payload) => {
  const { mst, nvbkntt, id, ...remainBody } = payload;
  return (dispatch) => {
    const requests = sendPut(
      `${API_CATEGORY_URL}/ds-dnkntt/${mst}/${nvbkntt}/${id}`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Cập nhật thành công");
        return dispatch({
          type: UPDATE_DNKNTT_SUCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const createKntt = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-dnkntt`, null, data, jwt)
    .then((res) => {
      console.log(res);
      notification.success("Thêm mới thành công");
      dispatch({
        type: CREATE_DNKNTT_SUCESS,
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

export const getHistoryKntt = (idkntt, jwt) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnknttls/${idkntt}`, null, jwt)
    .then(({ data }) => {
      if (_isEmpty(data)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: HISTORY_DNKNTT_SUCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const exportExcelKntt = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnkntt/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách kết nối trực tiếp");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
export const exportExcelNotHandleKntt = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnkntt/tra-cuu/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Doanh nghiệp chưa nộp đề nghị");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const checkMSTExist = (mst, jwt) => {
  return (dispatch) => {
    const requests = sendGet(
      `${API_CATEGORY_URL}/ds-dnkntt/investigate/${mst}`,
      null,
      jwt
    );
    requests
      .then((res) => {
        return dispatch({
          type: CHECK_MST_DNKNTT_SUCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        // notification.errorStrict(err);
      });
    return requests;
  };
};
