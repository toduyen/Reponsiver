import { sendGet, sendPost, sendPatch, sendGetBlob } from "utils/requests";
import {
  GET_LIST_INVOICE_ERRORS
} from "../action_types";
import notification from "utils/notification";
import { convertObjectToUrl, generateSearchString, savingFile } from "../../utils/helper";
import { layoutToggleLoading } from "./../layout.action";

export const getCQTArise = (token) => (dispatch) => {
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

export const getErrorInvoicesArise = (token, query = {}, type = 'search') => (dispatch) => {
  const { search, pageSize, state } = query;
  let endpoint = (type === 'search') ? 'arisingexp/official-lookup' : ((type === 'handle') ? 'arisingexp/official-progresses' : "arisingexp/official-approvals");
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

export const getErrorInvoicesVTArise = (token, query = {}, type = 'search') => (dispatch) => {
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

export const getInvoice04DetailArise = (token, mst, id, type) => (dispatch) => {
  let endpoint = (type === 'search') ? 'arisingexp/official-lookup' : ((type === 'handle') ? 'arisingexp/official-progresses' : "arisingexp/official-approvals");

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

export const getInvoice01DetailArise = (token, mst, id, type) => (dispatch) => {
  let endpoint = (type === 'search') ? 'arisingexp/official-lookup' : ((type === 'handle') ? 'arisingexp/official-progresses' : "arisingexp/official-approvals");

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

export const getHistoriesArise = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/${mst}/${id}/histories`,
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

export const errorCheckingArise = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/${mst}/${id}/error-checking`,
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

export const saveErrorInvoiceArise = (token, mst, id, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/${mst}/${id}/tbhgthds`,
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

export const getRightApprovedListArise = (token, code) => (dispatch) => {
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

export const sendForApprovingArise = (token, mst, id, data, type) => (dispatch) => {
  let endpoint = (type === 'boss') ? "tldao" : "tptrach";
  let successMes = (type === 'boss') ? "Trình lãnh đạo thành công" : "Trình phụ trách thành công";

  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/${mst}/${id}/${endpoint}`,
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

export const sendForRejectingArise = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-approvals/rejection`,
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

export const sendToBossArise = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-approvals/submission`,
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

export const xmlGenerationHandlingArise = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/xml-generation`,
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

export const handleSignatureArise = (token, mst, id, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-progresses/${mst}/${id}/kgui`,
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

export const xmlGenerationApprovingArise = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-approvals/xml-generation`,
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

export const handleApprovingSignatureArise = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/arisingexp/official-approvals`,
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

export const getChucdanhListArise = (token) => (dispatch) => {
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

export const xmlGenerationHandlingVTArise = (token, data) => (dispatch) => {
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

export const handleApprovingSignatureVTArise = (token, data) => (dispatch) => {
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

export const getKBHInfoArise = (token) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/chvthu`,
    null,
    token
  )
    .then(res => {
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
// explanation
export const exportExcelErrorInvoicesArise = (query, jwt) => (dispatch) => {
  const { search } = query || {}; 
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}explanation/arisingexp/official-lookup/excel-export${
      search ? `?search=${generateSearchString(search, ";")}` : ""
    }`,
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