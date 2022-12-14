import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl, savingFile } from "../utils/helper";
import notification from "../utils/notification";
import {
  sendGet,
  sendPost,
  sendPut,
  sendPostBlob,
  sendDelete,
  sendGetBlob,
} from "../utils/requests";
import {
  APPROVE_DNNVQD_SUCCESS,
  CREATE_DNNVQD_SUCCESS,
  GET_DS_DNNVQD_SUCCESS,
  UPDATE_DNNVQD_SUCCESS,
  SUBMIT_DNNVQD_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getBusinessSNMMST = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnnv${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DS_DNNVQD_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      // dispatch(layoutToggleLoading(false));
    });
};

export const getBusinessSNM = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnnvqd${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DS_DNNVQD_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      // dispatch(layoutToggleLoading(false));
    });
};

export const getApprovalBusinessSNM = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnnvqd/approve${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DS_DNNVQD_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      // dispatch(layoutToggleLoading(false));
    });
};

export const getDetailBusinessSNM = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/ds-dnnvqd/${id}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const createBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-dnnvqd`, null, query, jwt)
    .then((res) => {
      // const message = query.ngpduyet
      //   ? "Tr??nh ph?? duy???t th??nh c??ng"
      //   : "Th??m m???i th??nh c??ng";
      // notification.success(message);
      dispatch({
        type: CREATE_DNNVQD_SUCCESS,
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

export const updateBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dnnvqd/${query.id}`, null, query, jwt)
    .then(({ data }) => {
      const message = "C???p nh???t th??nh c??ng";
      notification.success(message);
      dispatch({
        type: UPDATE_DNNVQD_SUCCESS,
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

export const deleteBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_CATEGORY_URL}/ds-dnnvqd/${query.id}`, null, jwt)
    .then(({ data }) => {
      const message = "X??a th??nh c??ng";
      notification.success(message);
      dispatch({
        type: UPDATE_DNNVQD_SUCCESS,
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

export const submitListBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dnnvqd/submit-list`, null, query, jwt)
    .then(({ data }) => {
      notification.success("Tr??nh ph?? duy???t th??nh c??ng");
      dispatch({
        type: SUBMIT_DNNVQD_SUCCESS,
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

export const submitBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_CATEGORY_URL}/ds-dnnvqd/submit/${query.id}`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("Tr??nh ph??? tr??ch th??nh c??ng");
      dispatch({
        type: SUBMIT_DNNVQD_SUCCESS,
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

export const approveListBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dnnvqd/approve-list`, null, query, jwt)
    .then(({ data }) => {
      notification.success("Ph?? duy???t th??nh c??ng");
      dispatch({
        type: APPROVE_DNNVQD_SUCCESS,
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

export const approveBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_CATEGORY_URL}/ds-dnnvqd/approve/${query.id}`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("Ph?? duy???t th??nh c??ng");
      dispatch({
        type: APPROVE_DNNVQD_SUCCESS,
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

export const rejectBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_CATEGORY_URL}/ds-dnnvqd/reject`, null, query, jwt)
    .then(({ data }) => {
      notification.success("T??? ch???i ph?? duy???t th??nh c??ng");
      dispatch({
        type: APPROVE_DNNVQD_SUCCESS,
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

export const exportExcelBusinessSNMSQD = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnnvqd/export-excel${convertObjectToUrl(query)}&sort=qdngay:DESC`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("K???t xu???t th??nh c??ng");
      // dispatch({
      //   type: APPROVE_DNNVQD_SUCCESS,
      //   payload: data,
      // });
      savingFile(data, "Danh s??ch doanh nghi???p v???a v?? nh???");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelBusinessSNM = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnnv/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("K???t xu???t th??nh c??ng");
      // dispatch({
      //   type: APPROVE_DNNVQD_SUCCESS,
      //   payload: data,
      // });
      savingFile(data, "Danh s??ch doanh nghi???p v???a v?? nh???");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const getHistoryBusinessSNM = (id, jwt) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnnvqdLsu/${id}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getInvestigateMST = (jwt, mst) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnnvqd/investigate/${mst}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      // notification.errorStrict(err);
      return { error: err?.response?.data?.message };
    });
};

export const importDNRRList = (data, jwt) => (dispatch) => {
  return sendPost(`${API_CATEGORY_URL}/ds-dnrrcqd/enterprise-import`, null, data, jwt)
    .then(res => {
      // notification.success("Import file th??nh c??ng");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
};

export const importDNVNList = (data, jwt) => (dispatch) => {
  return sendPost(`${API_CATEGORY_URL}/ds-dnnvqd/excel-import`, null, data, jwt)
    .then(res => {
      // notification.success("Import file th??nh c??ng");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
};

