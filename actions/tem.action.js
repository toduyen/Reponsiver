import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendGet, sendPost } from "utils/requests";
import { GET_TEM_SUCCESS, UPDATE_TEM_SUCCESS } from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getTEMUsing = (jwt, body) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky/tra-cuu`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      dispatch({
        type: GET_TEM_SUCCESS,
        payload: data,
      });
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getTEMUsingDetail = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_HDDT_REGISTRATION_URL}/dang-ky/chi-tiet/${body.id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const rejectTEMUsing = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky/phe-duyet`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: UPDATE_TEM_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const genXmlTEMUsing = (jwt, body) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky/thong-bao`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const signTEMUsing = (jwt, data) => (dispatch) => {
  return sendPost(`${API_HDDT_REGISTRATION_URL}/dang-ky/ky-so`, null, data, jwt)
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      dispatch({
        type: UPDATE_TEM_SUCCESS,
        payload: data,
      });
      notification.success("Ký duyệt thành công");
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const adjustTEMUsing = (jwt, data) => (dispatch) => {
  return sendPost(`${API_HDDT_REGISTRATION_URL}/dang-ky/sign`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Trình duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

// dang ky mua
export const getTEMPurchase = (jwt, body) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/tra-cuu`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      dispatch({
        type: GET_TEM_SUCCESS,
        payload: data,
      });
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getTEMPurchaseDetail = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/chi-tiet/${body.id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const rejectTEMPurchase = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/phe-duyet`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: UPDATE_TEM_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const genXmlTEMPurchase = (jwt, body) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/thong-bao`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const signTEMPurchase = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/ky-so`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      dispatch({
        type: UPDATE_TEM_SUCCESS,
        payload: data,
      });
      notification.success("Ký duyệt thành công");
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const adjustTEMPurchase = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_HDDT_REGISTRATION_URL}/dang-ky-mua/sign`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      notification.success("Trình duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getTEMAnnouncement = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_HDDT_REGISTRATION_URL}/thong-bao-cqt/chi-tiet/${body.toKhaiId}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (!data || data.statusCode) {
        return;
      }
      return data.data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
