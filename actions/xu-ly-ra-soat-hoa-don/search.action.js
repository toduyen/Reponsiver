import { sendGet, sendPost, sendPatch } from "utils/requests";
import notification from "utils/notification";
import { generateSearchString } from "../../utils/helper";

export const searchResultCheckingInvoiceGetCQT = (token) => (dispatch) => {
  return sendGet(`${DEV_ENPOINT}category/dm-cqts/childs`, null, token)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const searchResultCheckingInvoiceGetAll =
  (query = {}, token) =>
  (dispatch) => {
    const { search, size, state } = query;

    return sendGet(
      `${DEV_ENPOINT}verification/kqkthd-tcuus/dsmsts?size=${size}${
        state ? `&state=${state}` : ""
      }${search ? `&search=${generateSearchString(search, ";")}` : ""}`,
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

export const searchResultCheckingInvoiceGetAllDetail =
  (query = {}, token) =>
  (dispatch) => {
    const { search, size, state } = query;

    return sendGet(
      `${DEV_ENPOINT}verification/kqkthd-tcuus/hdkqkts?size=${size}${
        state ? `&state=${state}` : ""
      }${search ? `&search=${generateSearchString(search, ";")}` : ""}`,
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

export const searchResultCheckingInvoiceGetDetail =
  (query = {}, token) =>
  (dispatch) => {
    const { search } = query;

    return sendGet(
      `${DEV_ENPOINT}verification/kqkthd-tcuus/hdkqktlquets/detail?sort=nktra:ASC&search=${generateSearchString(
        search,
        ";"
      )}`,
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

export const searchResultCheckingInvoiceGetHistories =
  (query = {}, token) =>
  (dispatch) => {
    const { search } = query;

    return sendGet(
      `${DEV_ENPOINT}verification/kqkthd-tcuus/hdkqktlquets/histories?sort=ngay:ASC&search=${generateSearchString(
        search,
        ";"
      )}`,
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

export const searchNotificationChecking =
  (query = {}, token) =>
  (dispatch) => {
    const { search, size, state } = query;

    return sendGet(
      `${DEV_ENPOINT}verification/tbrsdt-tcuus?sort=ntao:DESC&size=${size}${
        state ? `&state=${state}` : ""
      }${search ? `&search=${generateSearchString(search, ";")}` : ""}`,
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

export const searchNotificationCheckingGet =
  ({ mst, id }, token) =>
  (dispatch) => {
    return sendGet(
      `${DEV_ENPOINT}verification/tbrsdt-tcuus/${mst}/${id}`,
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

  export const getSearchingVerifiedInvoiceHistory = (token, id) => (dispatch) => {
    return sendGet(
      `${DEV_ENPOINT}verification/tbrsdt-tcuus/${id}/histories`,
      null,
      token
    )
    .then(({data}) => {
      return data;
    })
      .catch((err) => {
        notification.errorStrict(err);
      });
  };