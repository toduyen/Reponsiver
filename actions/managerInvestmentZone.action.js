/* eslint-disable no-undef */
import {
  sendGet,
  sendPost,
  sendPut,
  sendDelete,
  sendPostBlob,
  sendGetBlob,
} from "utils/requests";
import {
  GET_ALL_INVESTMENT_ZONE_SUCCESS,
  DETAIL_INVESTMENT_ZONE_SUCCESS,
  UPDATE_INVESTMENT_ZONE_SUCCESS,
  APPROVE_INVESTMENT_ZONE_SUCCESS,
  SUBMIT_INVESTMENT_ZONE_SUCCESS,
  REJECT_INVESTMENT_ZONE_SUCCESS,
  CREATE_INVESTMENT_ZONE_SUCCESS,
  HISTORY_INVESTMENT_ZONE_SUCCESS,
  DELETE_INVESTMENT_ZONE_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "actions";
import notification from "utils/notification";
import { convertObjectToUrl, savingFile } from "utils/helper";
import _isEmpty from "lodash/isEmpty";

export const getAllInvestMentZone = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dbuddtqd${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_ALL_INVESTMENT_ZONE_SUCCESS,
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

export const getApprovingInvestMentZone = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dbuddtqd/search-approve${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      // dispatch({
      //   type: GET_ALL_INVESTMENT_ZONE_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const getAllInvestLocation = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { dkkt, ...remainSearch } = query?.search;
  const paramsSearch = { ...query, search: remainSearch };
  return sendGet(
    `${API_CATEGORY_URL}/ds-dbuddt${convertObjectToUrl(paramsSearch)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_ALL_INVESTMENT_ZONE_SUCCESS,
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

export const getDetailInvestMentZone = (jwt, query) => (dispatch) => {
  const { id } = query;
  return sendGet(`${API_CATEGORY_URL}/ds-dbuddtqd/${id}`, null, jwt)
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: DETAIL_INVESTMENT_ZONE_SUCCESS,
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

export const createInvestMentZone = (data, jwt, state = {}) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-dbuddtqd`, null, data, jwt)
    .then((res) => {
      // notification.success("Tạo danh sách thành công");
      dispatch({
        type: CREATE_INVESTMENT_ZONE_SUCCESS,
        payload: res.data,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const updateInvestMentZone = (jwt, payload) => (dispatch) => {
  const { id, ...remainBody } = payload;
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dbuddtqd/${id}`, null, payload, jwt)
    .then((res) => {
      notification.success("Cập nhật thành công");
      dispatch({
        type: UPDATE_INVESTMENT_ZONE_SUCCESS,
        payload: res?.data,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const approveInvestMentZone = (jwt, payload) => (dispatch) => {
  const { key, ...remainPayload } = payload;
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_CATEGORY_URL}/ds-dbuddtqd/approve`,
    null,
    [remainPayload],
    jwt
  )
    .then((res) => {
      // notification.success("Phê duyệt thành công");
      dispatch({
        type: APPROVE_INVESTMENT_ZONE_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const approveInvestMentZoneMany = (jwt, payload) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dbuddtqd/approve`, null, payload, jwt)
    .then((res) => {
      notification.success("Phê duyệt thành công");
      dispatch({
        type: APPROVE_INVESTMENT_ZONE_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const submitInvestMentZone = (jwt, body, user) => {
  const bodySend = [{ ...body, ngpduyet: user }];
  return (dispatch) => {
    const requests = sendPut(
      `${API_CATEGORY_URL}/ds-dbuddtqd/submit`,
      null,
      bodySend,
      jwt
    );
    requests
      .then((res) => {
        // notification.success("Trình phê duyệt thành công");
        return dispatch({
          type: SUBMIT_INVESTMENT_ZONE_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        // notification.errorStrict(err);
      });
    return requests;
  };
};

export const rejectInvestMentZone = (jwt, body) => {
  const { ...remainBody } = body;
  return (dispatch) => {
    const requests = sendPut(
      `${API_CATEGORY_URL}/ds-dbuddtqd/reject`,
      null,
      body,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Từ chối phê duyệt thành công");
        return dispatch({
          type: REJECT_INVESTMENT_ZONE_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const historyInvestMentZone = (id, jwt) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dbuddtqdlsu/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: HISTORY_INVESTMENT_ZONE_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const deleteInvestMentZone = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_CATEGORY_URL}/ds-dbuddtqd/${id}`, null, jwt)
    .then((res) => {
      notification.success("Xoá thành công");
      dispatch({
        type: DELETE_INVESTMENT_ZONE_SUCCESS,
        payload: res.data,
      });
      return res;
    })
    .catch((err) => {
      // notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelByLocation = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dbuddt/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, "Danh sách theo địa bàn khó khăn");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelByDecision = (query, jwt, fileName = "Danh sách quyết định") => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dbuddtqd/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, fileName);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
// system/users/privilege
export const getApprovedCbtInvestMentZone = (token, code) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/users/privilege?privilege_code=${code}`,
    null,
    token
  )
    .then((res) => {
      // console.log("getRightApprovedCBT: ", res);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
