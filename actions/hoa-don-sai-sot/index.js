import { sendGet, sendPost, sendPatch, sendGetBlob } from "utils/requests";
import {
  GET_LIST_INVOICE_ERRORS
} from "../action_types";
import notification from "utils/notification";
import { convertObjectToUrl, generateSearchString, savingFile } from "../../utils/helper";
import { layoutToggleLoading } from "./../layout.action";

export const getCQT = (token) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/dm-cqts/childs`,
    null,
    token
  )
    .then(res => {
      // console.log('cqt list: ', res);
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getErrorInvoices = (token, query = {}, type = 'search') => (dispatch) => {
  const { search, pageSize, state, pvdlieu } = query;
  let endpoint = (type === 'search') ? 'cbt-tctbsses' : ((type === 'handle') ? 'cbt-tbhddtsses' : "cbt-approvals");
  let sortColName = (type === 'approve') ? 'pdcbngay' : 'nnhan';

  return sendGet(
    `${DEV_ENPOINT}explanation/${endpoint}?size=${pageSize}&sort=${sortColName}:ASC${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }&pvdlieu=${pvdlieu}`,
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

export const getErrorInvoicesVT = (token, query = {}, type = 'search') => (dispatch) => {
  const { search, pageSize, state } = query;
  let endpoint = (type === 'search') ? 'vt-tctbsses' : ((type === 'handle') ? 'vt-tbhddtsses' : "vt-approvals");
  let sortColName = (type === 'approve') ? 'pdcbngay' : 'nnhan';

  return sendGet(
    `${DEV_ENPOINT}explanation/${endpoint}?size=${pageSize}&sort=${sortColName}:ASC${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
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

export const getInvoice04Detail = (token, mst, id, type) => (dispatch) => {
  let endpoint = (type === 'search') ? 'cbt-tctbsses' : ((type === 'handle') ? 'cbt-tbhddtsses' : (type=== 'approval') ? "cbt-approvals": "vt-approvals");

  return sendGet(
    `${DEV_ENPOINT}explanation/${endpoint}/${mst}/${id}`,
    null,
    token
  )
    .then(res => {
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getInvoice01Detail = (token, mst, id, type) => (dispatch) => {
  let endpoint = (type === 'search') ? 'cbt-tctbsses' : ((type === 'handle') ? 'cbt-tbhddtsses' : (type=== 'approval') ? "cbt-approvals": "vt-approvals");

  return sendGet(
    `${DEV_ENPOINT}explanation/${endpoint}/tbssdts/${mst}/${id}`,
    null,
    token
  )
    .then(res => {
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getHistories = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/${mst}/${id}/histories`,
    null,
    token
  )
    .then(res => {
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const errorChecking = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/${mst}/${id}/error-checking`,
    null,
    token
  )
    .then(({data}) => {
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      console.log('errorChecking: ', data);
      notification.success("Kiểm tra dữ liệu thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const saveErrorInvoice = (token, mst, id, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/${mst}/${id}/tbhgthds`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Cập nhật dữ liệu thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getRightApprovedList = (token, code) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/users/privilege?privilege_code=${code}`,
    null,
    token
  )
    .then(res => {
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

export const sendForApproving = (token, mst, id, data, type) => (dispatch) => {
  let endpoint = (type === 'boss') ? "tldao" : "tptrach";
  let successMes = (type === 'boss') ? "Trình lãnh đạo thành công" : "Trình phụ trách thành công";

  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/${mst}/${id}/${endpoint}`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      console.log('sendForApproving:', data);
      notification.success(successMes);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const sendForRejecting = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-approvals/rejection`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      console.log('sendForRejecting:', data);
      notification.success("Từ chối phê duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const sendToBoss = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-approvals/submission`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      console.log('sendToBoss:', data);
      notification.success("Trình lãnh đạo thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const xmlGenerationHandling = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      console.log("xmlGenerationHandling:", data);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const handleSignature = (token, mst, id, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-tbhddtsses/${mst}/${id}/kgui`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Ký phê duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const xmlGenerationApproving = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-approvals/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      console.log("xmlGenerationApproving:", data);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const handleApprovingSignature = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/cbt-approvals`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success("Ký phê duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getChucdanhList = (token) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-htcks`,
    null,
    token
  )
    .then(res => {
      // console.log('cqt list: ', res);
      // dispatch({
      //   type: GET_LIST_INVOICE_ERRORS,
      //   payload: data,
      // });
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const xmlGenerationHandlingVT = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/vt-approvals/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const handleApprovingSignatureVT = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/vt-approvals`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      // notification.success("Ký ban hành thành công");
      // console.log('data: ', data)
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getKBHInfo = (token) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/chvthu`,
    null,
    token
  )
    .then(res => {
      return res;
    })
    .catch((err) => {
      // notification.errorStrict(err);
    });
};
// explanation
export const exportExcelErrorInvoices = (query, jwt) => (dispatch) => {
  const { search, pvdlieu } = query || {}; 
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}explanation/cbt-tctbsses/excel-export${
      search ? `?search=${generateSearchString(search, ";")}` : ""
    }&pvdlieu=${pvdlieu}&sort=nnhan:ASC`,
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

export const sendForRejectingVT = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/vt-approvals/rejection`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      console.log('sendForRejecting:', data);
      notification.success("Từ chối phê duyệt thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
