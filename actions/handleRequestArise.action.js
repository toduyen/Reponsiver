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
      notification.success("In email thành công");
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
        0: "Thêm mới thành công",
        2: "Thêm mới và trình thành công",
        3: "Thêm mới và trình thành công",
        4: "Thêm mới và phê duyệt thành công",
      };
      notification.success(
        TYPE_NOTIFICATION[query.ttxly] || "Thêm mới thành công"
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
        2: "Trình phụ trách thành công",
        3: "Trình lãnh đạo thành công",
        4: "Phê duyệt thành công",
      };
      notification.success(
        TYPE_NOTIFICATION[query.ttxly] || "Cập nhật thành công"
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
      notification.success("Xóa đề nghị thành công");
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
      notification.success("Trình lãnh đạo thành công");
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
      notification.success("Phê duyệt thành công");
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
      notification.success("Từ chối thành công");
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
      notification.success("Cấp mã thành công");
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
        0: "Thêm mới thành công",
        2: "Thêm mới và trình thành công",
        3: "Thêm mới và trình thành công",
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
        2: "Trình phụ trách thành công",
        3: "Trình lãnh đạo thành công",
      };
      notification.success(NOTIFICATION[query.ttxly] || "Cập nhật thành công");
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
      notification.success("Xóa thành công");
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
      notification.success("Trình lãnh đạo thành công");
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
      notification.success("Từ chối thành công");
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
      notification.success("In thông báo thành công");
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
      notification.success("Đóng hồ sơ thành công");
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
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách đề nghị cấp hoá đơn điện tử có mã");
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
      notification.success("Kết xuất thành công");
      savingFile(res.data, "DANH SÁCH ĐỀ NGHỊ PHÁT SINH");
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
      notification.success("Từ chối thành công");
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