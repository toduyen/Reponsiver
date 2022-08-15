import { sendGet, sendPost, sendPut } from "utils/requests";
import {
  GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
  DETAIL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
  UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
  HISTORY_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
  CREATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
} from "../action_types";
import { layoutToggleLoading } from "actions";
import notification from "utils/notification";
import { convertObjectToUrl } from "utils/helper";
import _isEmpty from "lodash/isEmpty";
import { sendPatch, sendDelete, sendGetBlob } from "../../utils/requests";
import { savingFile } from "../../utils/helper";
import moment from "moment";

export const getBusinessHighTaxRiskNotification = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/ds-dnrrcqd/notification`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getBusinessHighTaxRiskSQD = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd/tra-cuu-qdso${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getBusinessHighTaxRiskMST = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd/search-by-mst${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
      //   payload: data,
      // });
      const dataConvert = [];
      let stt = 1;
      data.datas.forEach((item) => {
        let count = 0;
        item.rrc.forEach((i) => {
          dataConvert.push({
            ...item,
            ...i,
            rowSpan: count === 0 ? item.rrc.length : 0,
            stt: count++ === 0 ? stt++ : stt - 1,
          });
        });
      });
      data.datas = dataConvert;

      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      // dispatch(layoutToggleLoading(false));
    });
};

export const exportBusinessHighTaxRiskSQD = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnrrcqd/export-excel-qdso${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
      //   payload: data,
      // });
      notification.success("Kết xuất thành công");
      savingFile(data, "Danh sách doanh nghiệp rủi ro cao về thuế");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportBusinessHighTaxRiskMST = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_CATEGORY_URL}/ds-dnrrcqd/export-excel-mst${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
      //   payload: data,
      // });
      notification.success("Kết xuất thành công");
      savingFile(data, "Danh sách doanh nghiệp rủi ro cao về thuế");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const getAllHighTaxRisk = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getSearchApproval = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd/search-approval${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getBusinessHighTaxRiskAdjustment = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd/search-adjustment${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getInfoMSTUN = (mst, jwt) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/dsdkts/${mst}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const getDetailHighTaxRisk = (jwt, query) => (dispatch) => {
  const { id } = query;
  return sendGet(`${API_CATEGORY_URL}/ds-dnrrcqd/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DETAIL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
        payload: data,
      });
      data.dngay =
        data.dngay && moment(data.dngay).year() < 9000 ? data.dngay : null;
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const createHighTaxRisk = (data, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_CATEGORY_URL}/ds-dnrrcqd`, null, data, jwt)
    .then((res) => {
      // console.log(res);
      const TYPE_NOTIFICATION = {
        0: "Thêm mới quyết định thành công",
        1: "Trình phụ trách thành công",
        2: "Phê duyệt thành công",
      };
      notification.success(TYPE_NOTIFICATION[data.ttxly]);
      dispatch({
        type: CREATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const deleteHighTaxRisk = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(`${API_CATEGORY_URL}/ds-dnrrcqd/${id}`, null, jwt)
    .then((res) => {
      // console.log(res);
      notification.success("Xoá quyết định thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const updateHighTaxRisk = (jwt, payload) => (dispatch) => {
  const { id } = payload;
  delete payload.id;
  dispatch(layoutToggleLoading(true));
  return sendPatch(`${API_CATEGORY_URL}/ds-dnrrcqd/${id}`, null, payload, jwt)
    .then((res) => {
      const TYPE_NOTIFICATION = {
        0: "Thêm mới quyết định thành công",
        1: "Trình phụ trách thành công",
        2: "Trình lãnh đạo thành công",
      };
      notification.success("Cập nhật quyết định thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const approveHighTaxRisk = (jwt, payload) => (dispatch) => {
  dispatch(layoutToggleLoading(true));

  return sendPost(`${API_CATEGORY_URL}/ds-dnrrcqd/approved`, null, payload, jwt)
    .then((res) => {
      notification.success("Phê duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const approveHighTaxRiskList = (jwt, payload) => (dispatch) => {
  dispatch(layoutToggleLoading(true));

  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/approved-list`,
    null,
    payload,
    jwt
  )
    .then((res) => {
      notification.success("Phê duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const approveHighTaxRiskPatch = (jwt, payload) => (dispatch) => {
  const { id } = payload;
  delete payload.id;
  dispatch(layoutToggleLoading(true));
  return sendPatch(
    `${API_CATEGORY_URL}/ds-dnrrcqd/approved/${id}`,
    null,
    payload,
    jwt
  )
    .then((res) => {
      notification.success("Phê duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const submitPicsHighTaxRisk = (jwt, payload) => {
  return (dispatch) => {
    const requests = sendPost(
      `${API_CATEGORY_URL}/ds-dnrrcqd/submit-pics`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Trình phụ trách thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const submitPicsHighTaxRiskPatch = (jwt, payload) => {
  const { id } = payload;
  delete payload.id;
  return (dispatch) => {
    const requests = sendPatch(
      `${API_CATEGORY_URL}/ds-dnrrcqd/submit-pic/${id}`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Trình phụ trách thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const submitLeadersTBTKKTS = (jwt, payload) => {
  return (dispatch) => {
    const requests = sendPost(
      `${API_CATEGORY_URL}/ds-tbktts/submit-leaders`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Trình lãnh đạo thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const submitLeadersHighTaxRisk = (jwt, payload) => {
  return (dispatch) => {
    const requests = sendPost(
      `${API_CATEGORY_URL}/ds-dnrrcqd/submit-leaders`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Trình lãnh đạo thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const submitLeadersHighTaxRiskPatch = (jwt, payload) => {
  const { id } = payload;
  delete payload.id;
  return (dispatch) => {
    const requests = sendPatch(
      `${API_CATEGORY_URL}/ds-dnrrcqd/submit-leader/${id}`,
      null,
      payload,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Trình lãnh đạo thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const rejectTBKTTS = (jwt, body) => {
  const { id, mst } = body;
  delete body.id;
  delete body.mst;
  return (dispatch) => {
    const requests = sendPatch(
      `${API_CATEGORY_URL}/ds-tbktts/reject/${mst}/${id}`,
      null,
      body,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Từ chối phê duyệt thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const rejectHighTaxRiskPatch = (jwt, body) => {
  const { id } = body;
  delete body.id;
  return (dispatch) => {
    const requests = sendPatch(
      `${API_CATEGORY_URL}/ds-dnrrcqd/reject/${id}`,
      null,
      body,
      jwt
    );
    requests
      .then((res) => {
        notification.success("Từ chối phê duyệt thành công");
        return dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: res?.data,
        });
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const getHistoryHighTaxRisk = (jwt, query = {}) => (dispatch) => {
  return sendGet(`${API_CATEGORY_URL}/ds-dnrrcqd-lsu/${query.id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: HISTORY_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const generateXMLHighTaxRisk = (data, jwt, param) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/xml-generators${convertObjectToUrl(param)}`,
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

export const generateXMLListHighTaxRisk = (data, jwt, param) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/list-xml-generators${convertObjectToUrl(
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

export const generateXMLTBKTTS = (data, jwt, param) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-tbktts/list-xml-generate${convertObjectToUrl(
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

export const generateXMLListHighTaxRiskDocument = (param, jwt) => (
  dispatch
) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-tbktts/document-xml-generate`,
    null,
    param,
    jwt
  )
    .then(({ data }) => {
      if (_isEmpty(data?.encodedXmls)) {
        dispatch({
          type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
          payload: data,
        });
      }
      return data?.encodedXmls;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const generateXmlApproveSave = (data, jwt, param) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/approve-save${convertObjectToUrl(param)}`,
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

export const generateXmlApproveSaveDocument = (jwt, data) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-tbktts/document-signed`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      // notification.success("Ký ban hành thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
        payload: data,
      });
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

export const highTaxRiskSignedApprove = (data, jwt) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/signed-approve`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      notification.success("Ký duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const adjustHighTaxRisk = (jwt, data) => (dispatch) => {
  const { id } = data;
  delete data.id;
  return sendPatch(
    `${API_CATEGORY_URL}/ds-dnrrcqd/adjustment/${id}`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      notification.success("Lưu thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const approveHighTaxRiskPost = (jwt, id, payload) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/approved/${id}`,
    null,
    payload,
    jwt
  )
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const signTBKTTS = (jwt, payload, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_CATEGORY_URL}/ds-tbktts/signed-list${convertObjectToUrl(param)}`,
    null,
    payload,
    jwt
  )
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const approveHighTaxRiskPostMultiple = (jwt, payload, param) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/approved${convertObjectToUrl(param)}`,
    null,
    payload,
    jwt
  )
    .then((res) => {
      notification.success("Ký duyệt thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getInvestigateDNRRCVT = (jwt, mst) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd-dnghiep/investigate/${mst}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      // notification.errorStrict(err);
      return { error: err?.response?.data };
    });
};

export const getDecideNumber = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_CATEGORY_URL}/ds-dnrrcqd/tra-cuu-qdso${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: ,
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

export const getAnnouncementDetailDNRRCVT = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, idtbktt, id: identify } = query;
  const id = idtbktt || identify;
  return sendGet(`${API_CATEGORY_URL}/ds-tbktts/${mst}/${id}`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: ,
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

export const getDocumentDNRRCVT = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, idqdinh: id } = query;
  return sendGet(
    `${API_CATEGORY_URL}/ds-tbktts/search-document${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const getCQBH = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/ds-nsdhddttbs/list-cqbhanh`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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
export const getDetailCQBH = (jwt, groupId) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/dm-cqts/${groupId}`, null, jwt)
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

export const getAllCQBH = (jwt, param) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/dm-cqts${convertObjectToUrl(param)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};
export const getAllOfficalCQBH = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/dm-cqts/officer`, null, jwt)
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

export const getAnnouncementDNRRCVT = (jwt, query) => (dispatch) => {
  return sendGet(
    `${API_CATEGORY_URL}/ds-tbktts${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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

export const importDNVNList = (data, jwt) => (dispatch) => {
  return sendPost(
    `${API_CATEGORY_URL}/ds-dnrrcqd/enterprise-import`,
    null,
    data,
    jwt
  )
    .then(({ data }) => {
      // notification.success("Import file thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const rejectHighTaxRiskPatchVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_CATEGORY_URL}/ds-tbktts/reject-documents`,
    null,
    param,
    jwt
  )
    .then(({ data }) => {
      notification.success("Từ chối thành công");
      dispatch({
        type: UPDATE_BUSSINESS_HIGH_TAX_RISK_SUCCESS,
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