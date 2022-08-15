import {
  convertObjectToUrl,
  generateSearchString,
  savingFile,
} from "utils/helper";
import notification from "utils/notification";
import { sendGet, sendGetBlob } from "utils/requests";
import { layoutToggleLoading } from "./layout.action";

// invoice
export const getListOfficialHdonLookUp = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/lookup/official-hdons${convertObjectToUrl(query)}`,
    null,
    jwt
  )
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

export const exportExcelOfficialHdonLookUp = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_INVOICE}/lookup/official-hdons/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res?.data, "DANH SÁCH HOÁ ĐƠN");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// explanation
export const getErrorInvoicesLookUp = (token, query = {}, type = "search") => (
  dispatch
) => {
  const { search, pageSize, state } = query;
  let sortColName = type === "approve" ? "pdcbngay" : "nnhan";
  return sendGet(
    `${DEV_ENPOINT}explanation/official/lookup?size=${pageSize}&sort=${sortColName}:ASC${
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

export const exportExcelErrorInvoicesLookUp = (query, jwt) => (dispatch) => {
  const { search } = query || {};
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}explanation/official/lookup/excel-export${
      search ? `?search=${generateSearchString(search, ";")}` : ""
    }&sort=nnhan:ASC`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách thông báo hóa đơn điện tử có sai sót");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// result
export const getProposalArisesResultLookup = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/lookup/official/proposal-arises${convertObjectToUrl(query)}`,
    null,
    jwt
  )
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

// registation
export const getRegistationLookUp = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/lookup/tax-official/declarations${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
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

export const exportExcelRegistationLookUp = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_REGISTRATION_URL}/lookup/tax-official/declarations/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, "DANH SÁCH ĐĂNG KÝ SỬ DỤNG HÓA ĐƠN ĐIỆN TỬ");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// query
export const lookupInvoiceLookUp = (query = {}, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search, size, state } = query;
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGet(
    `${API_QUERY_URL}/lookup/invoices/official?sort=${sort}&size=${size}${
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

export const lookupInvoiceLookUpSold = (query = {}, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search, size, state } = query;
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGet(
    `${API_QUERY_URL}/lookup/invoices/official/sold?sort=${sort}&size=${size}${
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

export const exportExcelLookInvoiceLookUp = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search } = query || {};
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGetBlob(
    `${API_QUERY_URL}/lookup/invoices/export-excel?sort=${sort}${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "DANH SÁCH HOÁ ĐƠN");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelLookInvoiceLookUpSold = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { search } = query || {};
  const sort = "tdlap:desc,khmshdon:asc,shdon:desc";
  return sendGetBlob(
    `${API_QUERY_URL}/lookup/invoices/export-excel-sold?sort=${sort}${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "DANH SÁCH HOÁ ĐƠN");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const lookupGetInvoiceBTHopLookUp = (jwt, params) => (dispatch) => {
  return sendGet(
    `${API_QUERY_URL}/lookup/bthop${convertObjectToUrl(params)}`,
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

export const getCqtDataLookUp = (jwt, username, groupId) => (dispatch) => {
  return sendGet(`${API_SYS_URL}/user-lookup/${username}/${groupId}`, null, jwt)
    .then(({ data }) => {
      let { name_official_list } = data;
      const dataList = name_official_list.map((el, idx) => {
        const {
          groups: { id, name },
        } = el.match(/(?<id>[^-\s]+)\s*-\s*(?<name>.+)/);
        return {
          id,
          name,
        };
      });
      return dataList;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};
