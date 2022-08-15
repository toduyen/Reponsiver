import { sendGet, sendGetBlob } from "utils/requests";
import notification from "utils/notification";
import {
  generateSearchString,
  convertObjectToUrl,
  savingFile,
} from "utils/helper";
import { layoutToggleLoading } from "actions";
import { isEmpty } from "lodash";

export const lookupInvoice =
  (query = {}, jwt) =>
  (dispatch) => {
    dispatch(layoutToggleLoading(true));
    const { search, size, state } = query;
    const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
    return sendGet(
      `${API_QUERY_URL}/invoices/official?sort=${sort}&size=${size}${
        state ? `&state=${state}` : ""
      }${search ? `&search=${generateSearchString(search, ";")}` : ""}`,
      null,
      jwt
    )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
        throw err;
      })
      .finally(() => {
        dispatch(layoutToggleLoading(false));
      });
  };

export const lookupInvoiceSold =
  (query = {}, jwt) =>
  (dispatch) => {
    dispatch(layoutToggleLoading(true));
    const { search, size, state } = query;
    const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
    return sendGet(
      `${API_QUERY_URL}/invoices/official/sold?sort=${sort}&size=${size}${
        state ? `&state=${state}` : ""
      }${search ? `&search=${generateSearchString(search, ";")}` : ""}`,
      null,
      jwt
    )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
        throw err;
      })
      .finally(() => {
        dispatch(layoutToggleLoading(false));
      });
  };

export const invoiceManagerGetInvoiceTypes = (token) => (dispatch) => {
  const sort = "khmshdon:asc";
  return sendGet(`${DEV_ENPOINT}category/dmhdons?sort=${sort}`, null, token)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getInvoicesDetail = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_QUERY_URL}/invoices/detail/${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_XA,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const lookupGetInvoiceRelative = (jwt, params) => (dispatch) => {
  return sendGet(`${API_QUERY_URL}/invoices/relative`, params, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const lookupGetInvoiceBTHop = (jwt, params) => (dispatch) => {
  return sendGet(
    `${API_QUERY_URL}/bthop${convertObjectToUrl(params)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const lookupGetInvoiceBTHopDetail = (jwt, params) => (dispatch) => {
  return sendGet(
    `${API_QUERY_URL}/bthop/detail${convertObjectToUrl(params)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

// Get Thông tin liên quan
export const getRelativeInfo = (jwt, row) => (dispatch) => {
  const { nbmst, khmshdon, khhdon, shdon } = row;
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_QUERY_URL}/invoices/related${convertObjectToUrl({
      nbmst,
      khmshdon,
      khhdon,
      shdon,
    })}`,
    null,
    jwt
  )
    .then(({ data }) => {
      const { kqcht, hdtbssrses } = data || {};
      if (isEmpty(data)) {
        notification.error("Không có thông tin liên quan");
        return null;
      }
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelLookInvoice = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search } = query || {};
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGetBlob(
    `${API_QUERY_URL}/invoices/export-excel?sort=${sort}${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách hóa đơn điện tử theo cơ quan thuế");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelLookInvoiceSold = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search } = query || {};
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGetBlob(
    `${API_QUERY_URL}/invoices/export-excel-sold?sort=${sort}${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách hóa đơn người mua");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcellookupGetInvoiceBTHop = (params, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_QUERY_URL}/bthop/export-excel${convertObjectToUrl(params)}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách dữ liệu bảng tổng hợp");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
