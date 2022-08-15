import notification from "utils/notification";
import { sendGet, sendPost, sendGetBlob } from "utils/requests";
import { convertObjectToUrl, savingFile } from "utils/helper";
import { layoutToggleLoading } from "./layout.action";

export const getReportTongHop = (jwt, year, cqt) => {
  return sendGet(
    `${API_QUERY_URL}/jobs/vat-total?year=${year}${cqt ? `&cqt=${cqt}` : ``}`,
    null,
    jwt
  );
};

export const getNewReport = (jwt, query) => (dispatch) => {
  return sendGet(`${API_JOB_URL}/bcao${convertObjectToUrl(query)} `, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getNewReportDetail = (jwt, { id, lbcao, ...query }, name) => (
  dispatch
) => {
  return sendGet(
    `${API_JOB_URL}/bcao/${lbcao}/${id}${convertObjectToUrl(query)} `,
    null,
    jwt
  )
    .then(({ data }) => {
      // return data;
      savingFile(data, name, "csv");
      return null;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const postNewReport = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_JOB_URL}/bcao`, null, body, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getReport = (jwt, body, endpoint) => (dispatch) => {
  return sendPost(`${API_JOB_URL}/reports/${endpoint} `, null, body, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getReportJob = (jwt, id, param) => (dispatch) => {
  return new Promise((resolve, reject) => {
    sendGet(`${API_JOB_URL}/reports/job/${id}`, param, jwt)
      .then(({ data }) => {
        if (data.status === "FINISHED") {
          resolve(data);
        } else if (data.status === "ERROR") {
          notification.error("Có lỗi xảy ra");
          reject();
        } else {
          setTimeout(() => {
            resolve(data);
          }, 1000);
        }
      })
      .catch((err) => {
        notification.errorStrict(err);
        reject(err);
        throw err;
      });
  });
};

export const getJobCQT = (jwt, param) => (dispatch) => {
  return sendGet(`${API_JOB_URL}/cqt`, param, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getCucThue = (jwt, param) => (dispatch) => {
  return sendGet(`${API_JOB_URL}/cqt/cthue`, param, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getChiCucThue = (jwt, param) => (dispatch) => {
  return sendGet(`${API_JOB_URL}/cqt/ccthue/${param.id}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getTCTChiCucThue = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_JOB_URL}/cqt/tctccthue/${param.id}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelReport = (jwt, { id, lbcao, ...query }, name) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_JOB_URL}/exports/${lbcao}/${id}${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, name, "csv");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
