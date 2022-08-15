import {
  SELECTED_ROW_SUCCESS,
  SHOW_ACTION_STATUS_SUCCESS,
  GET_MENU_SUCCESS,
  SELECT_USER_INCHARGE_SUCCESS,
  GET_TINH,
  GET_HUYEN,
  GET_XA,
  SELECTED_TINH,
  SELECTED_HUYEN,
  SELECTED_XA,
} from "./action_types";
import { sendGet } from "../utils/requests";
import notification from "../utils/notification";

export const selectRow = (payload) => {
  return { type: SELECTED_ROW_SUCCESS, payload };
};

export const selectUserIncharge = (payload) => {
  return { type: SELECT_USER_INCHARGE_SUCCESS, payload };
};

export const showActionStatus = (payload) => {
  return { type: SHOW_ACTION_STATUS_SUCCESS, payload };
};

export const getMenu = (jwt) => (dispatch) => {
  // var listIgnor = [
  //   "XLRSHD",
  //   "KTNDHD",
  //   "QLTQKY",
  //   "CHDV",
  //   "CHKTDK",
  //   "VTKBHTBRS",
  // ];
  const whiteList = [
    "TDTDKSD",
    "TDTDKMUA",
    "VTKBHTEM",
    "VTXLTDTDKSD",
    "VTXLTDTDKMUA",
    "TDTDSDKSD",
    "TDTDSDKMUA",
    "VTTDTDKMUA",
    "VTTDTDKSD",
  ];
  return sendGet(`${API_SYS_URL}/privileges/menu`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_MENU_SUCCESS,
        payload: data?.filter((n) => whiteList.includes(n.code)),
      });
      return data?.filter((n) => whiteList.includes(n.code));
    })
    .catch((err) => {
      if (typeof window !== "undefined") notification.errorStrict(err);
      // throw err;
    });
};

export const getTinh = (jwt) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/dm-tinhs?size=100&sort=ten:asc`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_TINH,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
export const getHuyen = (jwt, tinh) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/dm-huyens?size=100&search=tinh==${tinh}&sort=ten:asc`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_HUYEN,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
export const getXa = (jwt, huyen) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/dm-xas?size=100&search=huyen==${huyen}&sort=ten:asc`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_XA,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const selectTinh = (payload) => {
  return { type: SELECTED_TINH, payload };
};

export const selectHuyen = (payload) => {
  return { type: SELECTED_HUYEN, payload };
};

export const selectXa = (payload) => {
  return { type: SELECTED_XA, payload };
};

export const getMST = (jwt, mst) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/dsdkts/${mst}`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_XA,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const checkMSTDirectBusiness = (jwt, mst) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnkntt/investigate/${mst}`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_XA,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
export const checkMSTCtyConBusiness = (jwt, mst) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnkntt/subsidiaries/${mst}`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_XA,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      // notification.errorStrict(err);
      return { error: err?.response?.data?.message };
    });
};

export const logoutCBT = (jwt) => (dispatch) => {
  return sendGet(`${API_URL}/logout`, null, jwt)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
