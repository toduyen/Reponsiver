/* eslint-disable no-undef */
import {
  sendGet,
  sendPost,
  sendPut,
  sendPostBlob,
  sendGetBlob,
} from "utils/requests";
import {
  GET_DS_HDCCM_SUCCESS,
  GET_DETAIL_HDCCM_SUCESS,
  REJECT_HDCCM_SUCCESS,
  GENERATE_XML_HDCCM_SUCCESS,
  //
  GET_DS_NOTI_HDCCM_SUCCESS,
  GET_DETAIL_NOTI_HDCCM_SUCESS,
  HISTORY_NOTI_HDCCM_SUCCESS,
  UPDATE_NOTI_HDCCM_SUCCESS,
  LEADER_NOTI_HDCCM_SUCCESS,
  OVERSEER_NOTI_HDCCM_SUCCESS,
  ACTION_NOTI_HDCCM_SUCCESS,
  UPDATE_LIST_ARISE_RESULT_SUCCESS,
  UPDATE_LIST_ARISE_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "actions";
import notification from "utils/notification";
import { convertObjectToUrl, savingFile } from "utils/helper";
import _isEmpty from "lodash/isEmpty";

// Hanlde invoice
export const getListOfficialHdon = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/official-hdons${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_HDCCM_SUCCESS,
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
export const getOfficialHdonDetail = (jwt, query) => (dispatch) => {
  const { khmshdon, nbmst, khhdon, shdon } = query;
  return sendGet(
    `${API_INVOICE}/official-hdons/detail?nbmst=${nbmst}&khmshdon=${khmshdon}&khhdon=${khhdon}&shdon=${shdon}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_HDCCM_SUCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const generateXMLOfficialHdon = (jwt, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_INVOICE}/official-hdons/xml-generators`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      // notification.success("Tạo XML thành công");
      dispatch({
        type: GENERATE_XML_HDCCM_SUCCESS,
        payload: data,
      });
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

// export const approveMessageOfficalHdon = (jwt, data) => (dispatch) => {
//   return sendPost(`${API_INVOICE}/messages/multiple`, null, data, jwt)
//     .then(({ data }) => {
//       notification.success("Phê duyệt thành công ");
//       return data;
//     })
//     .catch((err) => {
//       notification.errorStrict(err);
//       throw err;
//     });
// };

export const approveMessageOfficalHdon = (jwt, data) => (dispatch) => {
  return sendPost(`${API_INVOICE}/official-hdons/approval`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Phê duyệt thành công ");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const rejectOfficialHdon = (jwt, body) => {
  return (dispatch) => {
    const requests = sendPut(
      `${API_INVOICE}/official-hdons/reject`,
      null,
      body,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Từ chối hóa đơn và tạo thông báo thành công");
        return dispatch({
          type: REJECT_HDCCM_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

// Handle and checking invoice
export const getListNotificationOfficialHdon = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/notification-adhocs/handle${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_NOTI_HDCCM_SUCCESS,
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

export const getInvoiceTLPSDetail = (jwt, query) => (dispatch) => {
  const { id } = query;
  return sendGet(`${API_INVOICE}/notification-adhocs/${id}/detail`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_NOTI_HDCCM_SUCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getInvoiceTLPSDetail2 = (jwt, query) => (dispatch) => {
  const { id } = query;
  return sendGet(`${API_INVOICE}/notification-adhocs/${id}/de-nghi`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: GET_DETAIL_NOTI_HDCCM_SUCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const historyInvoiceTLPS = (jwt, query) => (dispatch) => {
  const { id } = query;
  return sendGet(`${API_INVOICE}/notification-adhocs/${id}/lsu`, null, jwt)
    .then(({ datas }) => {
      dispatch({
        type: HISTORY_NOTI_HDCCM_SUCCESS,
        payload: datas,
      });
      return datas;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const hanldeInvoiceTLPS = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_INVOICE}/notification-adhocs`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Cập nhật thành công");
      dispatch({
        type: UPDATE_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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

export const submitLeaderInvoiceTLPS = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_INVOICE}/notification-adhocs/leader-submit`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Trình lãnh đạo thành công");
      dispatch({
        type: LEADER_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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

export const submitLeaderInvoiceBatchTLPS = (jwt, body, query) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_INVOICE}/notification-adhocs/batch/leader-submit?pdndung=${query.pdndung}&pdldao=${query.pdldao}`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Trình lãnh đạo thành công");
      dispatch({
        type: LEADER_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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

export const submitOverseerInvoiceTLPS = (jwt, body) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_INVOICE}/notification-adhocs/overseer-submit`,
    null,
    body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Trình phụ trách thành công");
      dispatch({
        type: OVERSEER_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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
export const approveInvoiceTLPS = (jwt, data, notice) => (dispatch) => {
  const { cert, cert_info, signed, iddnpsdt, idkqdnpsdt, pdndung } = data;
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/messages`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      notification.success(notice || "Ký duyệt thành công");
      dispatch({
        type: UPDATE_LIST_ARISE_RESULT_SUCCESS,
        payload: "",
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};
export const generateXMLInvoiceTLPS = (jwt, data, param) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/xml-generators${convertObjectToUrl(
      param
    )}`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
  // .finally(() => {
  //   dispatch(layoutToggleLoading(false));
  // });
};

export const generateXMLProposalArisesMultiple = (jwt, data, param) => (
  dispatch
) => {
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/xml-generators/multiple${convertObjectToUrl(
      param
    )}`,
    null,
    data,
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

export const generateXMLProposalArisesMultipleVT = (jwt, data, param) => (
  dispatch
) => {
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/vt-approval/xml-generators/multiple${convertObjectToUrl(
      param
    )}`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data)) {
        dispatch({
          type: UPDATE_LIST_ARISE_SUCCESS,
          payload: data,
        });
      }
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const approveProposalArisesMultiple = (jwt, data, param) => (
  dispatch
) => {
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/messages/multiple${convertObjectToUrl(
      param
    )}`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
        payload: data,
      });
      // if (param.sotbbd) {
      //   notification.success("Ký duyệt thành công ");
      // }
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      return {
        error: true,
        err,
      };
    });
};

export const submitOverseerInvoiceReject = (jwt, id, pdndung) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_INVOICE}/notification-adhocs/${id}/reject?pdndung=${pdndung}`,
    null,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Từ chối thành công");
      dispatch({
        type: OVERSEER_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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

export const rejectProposalArises = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_ADHOC}/official/proposal-arises/reject`,
    null,
    param,
    jwt
  )
    .then(({ data }) => {
      notification.success("Từ chối thành công");
      dispatch({
        type: OVERSEER_NOTI_HDCCM_SUCCESS,
        payload: data,
      });
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

export const getListNotificationOfficialApprove = (jwt, query) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/notification-adhocs/approve${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_NOTI_HDCCM_SUCCESS,
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

export const getListNotificationOfficialHdonVt = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/notification-adhocs/handle${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data.datas) && !_isEmpty(query.search)) {
        // notification.error("Không có dữ liệu hiển thị");
      }
      dispatch({
        type: GET_DS_NOTI_HDCCM_SUCCESS,
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

export const generateXMLMultipleVT = (jwt, data, param) => (dispatch) => {
  return sendPost(
    `${API_ADHOC}/result/proposal-arises/vt-approval/xml-generators/multiple${convertObjectToUrl(
      param
    )}`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data)) {
        dispatch({
          type: UPDATE_LIST_ARISE_SUCCESS,
          payload: data,
        });
      }
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getNoticeProposal = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises/${param.id}/notice`,
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
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelNotificationOfficialHdon = (query, jwt) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_INVOICE}/official-hdons/export-excel${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách hoá đơn cần cấp mã theo lần phát sinh");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
