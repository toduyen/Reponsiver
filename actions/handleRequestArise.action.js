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
  GET_LIST_ARISE_SUCCESS,
  UPDATE_LIST_ARISE_SUCCESS,
  GET_LIST_ARISE_RESULT_SUCCESS,
  UPDATE_LIST_ARISE_RESULT_SUCCESS,
} from "./action_types";
import { layoutToggleLoading } from "./layout.action";

// official

export const getProposalArisesList = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official/proposal-arises${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_SUCCESS,
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

export const getProposalArisesApproval = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official/proposal-arises/approves${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_SUCCESS,
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

export const getProposalArisesResultDocument = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises/van-thu${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_SUCCESS,
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

export const getProposalArisesResultList = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_SUCCESS,
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

export const getProposalArisesDetail = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official/proposal-arises/${query.id}/detail`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_SUCCESS,
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

export const getProposalArisesHistory = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official/proposal-arises/${query.id}/lsu`,
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

export const printEmailProposalArises = (jwt, query) => (dispatch) => {
  const { id } = query;
  delete query.id;
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_ADHOC}/official/proposal-arises/${id}/print-email${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("In email th??nh c??ng");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const createProposalArise = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_ADHOC}/official/proposal-arises`, null, query, jwt)
    .then(({ data }) => {
      const TYPE_NOTIFICATION = {
        0: "Th??m m???i th??nh c??ng",
        2: "Th??m m???i v?? tr??nh th??nh c??ng",
        3: "Th??m m???i v?? tr??nh th??nh c??ng",
        4: "Th??m m???i v?? ph?? duy???t th??nh c??ng",
      };
      notification.success(
        TYPE_NOTIFICATION[query.ttxly] || "Th??m m???i th??nh c??ng"
      );
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const updateProposalArise = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_ADHOC}/official/proposal-arises`, null, query, jwt)
    .then(({ data }) => {
      const TYPE_NOTIFICATION = {
        2: "Tr??nh ph??? tr??ch th??nh c??ng",
        3: "Tr??nh l??nh ?????o th??nh c??ng",
        4: "Ph?? duy???t th??nh c??ng",
      };
      notification.success(
        TYPE_NOTIFICATION[query.ttxly] || "C???p nh???t th??nh c??ng"
      );
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const deleteProposalArise = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(
    `${API_ADHOC}/official/proposal-arises/${query.id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("X??a ????? ngh??? th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const leaderSubmitProposalArise = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/official/proposal-arises/batch/leader-submit${convertObjectToUrl(
      query.url
    )}`,
    null,
    query.body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Tr??nh l??nh ?????o th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const approvalProposalArise = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/official/proposal-arises/batch/approve${convertObjectToUrl(
      query.url
    )}`,
    null,
    query.body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Ph?? duy???t th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const rejectProposalArise = (jwt, query) => (dispatch) => {
  const { id } = query;
  delete query.id;
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/official/proposal-arises/${id}/reject${convertObjectToUrl(
      query
    )}`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("T??? ch???i th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const provideCodeProposalArise = (jwt, query) => (dispatch) => {
  const { id } = query;
  delete query.id;
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/official/proposal-arises/${id}/provide-code`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("C???p m?? th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

// result

export const getProposalArisesResult = (jwt, query) => (dispatch) => {
  const { id } = query;
  delete query.id;
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises/${id}${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_ARISE_RESULT_SUCCESS,
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

export const getProposalArisesDetailResult = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises/${query.id}/detail`,
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

export const getProposalArisesHistoryResult = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/result/proposal-arises/${query.id}/lsu`,
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

export const createProposalAriseResult = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_ADHOC}/result/proposal-arises`, null, query, jwt)
    .then(({ data }) => {
      const NOTIFICATION = {
        0: "Th??m m???i th??nh c??ng",
        2: "Th??m m???i v?? tr??nh th??nh c??ng",
        3: "Th??m m???i v?? tr??nh th??nh c??ng",
      };
      notification.success(NOTIFICATION[query.ttxly]);
      dispatch({
        type: UPDATE_LIST_ARISE_RESULT_SUCCESS,
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

export const updateProposalAriseResult = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(`${API_ADHOC}/result/proposal-arises`, null, query, jwt)
    .then(({ data }) => {
      const NOTIFICATION = {
        2: "Tr??nh ph??? tr??ch th??nh c??ng",
        3: "Tr??nh l??nh ?????o th??nh c??ng",
      };
      notification.success(NOTIFICATION[query.ttxly] || "C???p nh???t th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_RESULT_SUCCESS,
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

export const deleteProposalAriseResult = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendDelete(
    `${API_ADHOC}/result/proposal-arises/${query.id}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("X??a th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_RESULT_SUCCESS,
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

export const approvalResultsLeader = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/result/proposal-arises/batch/leader-submit${convertObjectToUrl(
      query.url
    )}`,
    null,
    query.body,
    jwt
  )
    .then(({ data }) => {
      notification.success("Tr??nh l??nh ?????o th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const approvalResultsReject = (jwt, query) => (dispatch) => {
  const { id } = query;
  delete query.id;
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/result/proposal-arises/${id}/reject${convertObjectToUrl(
      query
    )}`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("T??? ch???i th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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

export const printNotificationProposalArises = (jwt, query) => (dispatch) => {
  const { id } = query;
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_ADHOC}/result/proposal-arises/${id}/print-pdf`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("In th??ng b??o th??nh c??ng");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const closeDocument = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPut(
    `${API_ADHOC}/official/proposal-arises/${id}/close`,
    null,
    null,
    jwt
  )
    .then((res) => {
      notification.success("????ng h??? s?? th??nh c??ng");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelProposalArises = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_ADHOC}/official/proposal-arises/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("K???t xu???t th??nh c??ng");
      savingFile(res.data, "Danh s??ch ????? ngh??? c???p ho?? ????n ??i???n t??? c?? m??");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const exportExcelHandleRequestArise = (query, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${API_ADHOC}/lookup/official/proposal-arises/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("K???t xu???t th??nh c??ng");
      savingFile(res.data, "DANH S??CH ????? NGH??? PH??T SINH");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const rejectProposalArisesVT = (jwt, param) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${DEV_ENPOINT}adhoc/result/proposal-arises/reject`,
    null,
    param,
    jwt
  )
    .then(({ data }) => {
      notification.success("T??? ch???i th??nh c??ng");
      dispatch({
        type: UPDATE_LIST_ARISE_SUCCESS,
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