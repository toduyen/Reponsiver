import { convertObjectToUrl, savingFile } from "utils/helper";
import notification from "utils/notification";
import { sendGet, sendGetBlob, sendPost } from "utils/requests";
import {
  DM_LOAIDL_SELECT_ACTION_SUCCESS,
  DSDL_DMDC_SEARCH_ACTION_SUCCESS,
  DSDL_DATAHUB_SEARCH_ACTION_SUCCESS,
  DSDL_UQCM_SEARCH_ACTION_SUCCESS,
  DSDL_UQCM_DETAIL_SEARCH_ACTION_SUCCESS,
} from "../action_types";
import { layoutToggleLoading } from "../layout.action";

export const getDMLoaiDL = (jwt, loai) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}category/dmucs/loais/${loai}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DM_LOAIDL_SELECT_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDataDmdc = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/dmdc${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DSDL_DMDC_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDataHub = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/datahub${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DSDL_DATAHUB_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDataDmdcDetail = (jwt, params) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/detail${convertObjectToUrl(params)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// Màn TCTN
export const getDataTctn = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/dmdc${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      // dispatch({
      //   type: DSDL_DMDC_SEARCH_ACTION_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getListTCTN = (jwt, loai) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}cross-check/${loai}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DM_LOAIDL_SELECT_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};


// Màn TCUQ
// luồng cũ, có param
export const getDataUqcm = (jwt, query) => (dispatch) => {
  // debugger
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/delegations${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// getDataTcuqTable (Luồng mới):
export const getDataTcuqTable = (jwt, query) => (dispatch) => {
  console.log("đang đợi confirm ...");
  debugger;
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/delegations/jobs${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    // .finally(() => dispatch(layoutToggleLoading(false)));
};

// get detail uqcm
export const getDetailUqcm = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}cross-check/delegations/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_DETAIL_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// get detail Datahub
export const getDetailDATAHUB = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}cross-check/categories/datahub/detail/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_DETAIL_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// get detail DMDC
export const getDetailDMDC = (jwt, id) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}cross-check/categories/dmdc/detail/${id}`, null, jwt)
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_DETAIL_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getResultToShow = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/delegations/jobs/detail/${id}`,
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

export const getResultToShowDMDC = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/dmdc/result/${id}`,
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

export const getResultToShowDATAHUB = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/categories/datahub/result/${id}`,
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

// Exprot excel UQCM
export const exportExcelUqcmTable = (jobid, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/delegations/export-excel/${jobid}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách đối soát với Tổ chức ủy quyền");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// Exprot excel TCTN
export const exportExcelTCTNTable = (jobid, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/ds-tvans/jobs/${jobid}/resources`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Danh sách đối soát với Tổ chức truyền nhận");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};


// Exprot excel DMDC
export const exportExcelDMDCTable = (jobid, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/dmdc/result/export-excel/${jobid}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Kết quả đối soát DMDC");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// Exprot excel DATAHUB
export const exportExcelDATAHUBTable = (jobid, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/datahub/result/export-excel/${jobid}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, "Kết quả đối soát DMDC");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// post new job:
export const postNewJobDoisoat = (jwt, body) => (dispatch) => {
  // debugger;

  dispatch(layoutToggleLoading(true));
  return sendPost(`${DEV_ENPOINT}cross-check/delegations/jobs`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới đối soát thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// post new job man DMDC
export const postNewJobDoisoatDMDC = (jwt, body) => (dispatch) => {
  // debugger;

  dispatch(layoutToggleLoading(true));
  return sendPost(`${DEV_ENPOINT}cross-check/ds-dmuc-jobs/jobs`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới đối soát thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// post new job man DMDC
export const postNewJobDoisoatDATAHUB = (jwt, body) => (dispatch) => {
  // debugger;

  dispatch(layoutToggleLoading(true));
  return sendPost(`${DEV_ENPOINT}cross-check/ds-dmuc-jobs/jobs`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới đối soát thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

// post new job màn TCTN
export const postNewJobDoisoatTCTN = (jwt, body) => (dispatch) => {
  // debugger;

  dispatch(layoutToggleLoading(true));
  return sendPost(`${DEV_ENPOINT}cross-check/tvans-jobs/jobs`, null, body, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới đối soát thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getResulTctnTab = (id, jwt, tabName) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/ds-tvans/jobs/${id}/${tabName}`,
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

// export detail UQCM
export const exportExcelDetailUqcm = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/delegations/export-excel/detail/${id}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, `Danh sách chi tiết của bản ghi ${id}`);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// export detail DMDC
export const exportExcelDetailDMDC = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/dmdc/detail/export-excel/${id}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, `Danh sách chi tiết đối soát DMDC`);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// export detail DATAHUB
export const exportExcelDetailDATAHUB = (id, jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/datahub/detail/export-excel/${id}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, `Danh sách chi tiết đối soát DATAHUB`);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// Đối soát với TCTN
export const getDataTCTNTable = (jwt, query) => (dispatch) => {
  console.log("GET Tìm kiếm với TCTN ...");
  debugger;
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}cross-check/tvans-jobs/jobs${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: DSDL_UQCM_SEARCH_ACTION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    // .finally(() => dispatch(layoutToggleLoading(false)));
};




// Data hub:
// export const exportExcelDataHubTable = (query, jwt) => (dispatch) => {
//   console.log("đã vào được tới đây rồi");
//   dispatch(layoutToggleLoading(true));
//   return sendGetBlob(
//     `${DEV_ENPOINT}cross-check/categories/datahub/export-excel${convertObjectToUrl(
//       query
//     )}`,
//     null,
//     jwt
//   )
//     .then((res) => {
//       notification.success("Kết xuất thành công");
//       savingFile(res.data, "Danh sách đối soát với DATAHUB");
//       return res;
//     })
//     .catch((err) => {
//       notification.errorStrict(err);
//     })
//     .finally(() => {
//       dispatch(layoutToggleLoading(false));
//     });
// };

export const exportExcelFullLechDataHub = (query, jwt) => (dispatch) => {
  // console.log('chưa có api case này đâu')
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/datahub/detail/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, `Danh sách đối soát Lệch DataHub`);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// export const exportExcelDetailDataHub = (jwt, params) => (dispatch) => {
//   dispatch(layoutToggleLoading(true));
//   return sendGetBlob(
//     `${DEV_ENPOINT}cross-check/categories/detail/export-excel${convertObjectToUrl(
//       params
//     )}`,
//     null,
//     jwt
//   )
//     .then((res) => {
//       notification.success("Kết xuất thành công");
//       savingFile(res.data, "Đối soát chi tiết với DATAHUB");
//       return res;
//     })
//     .catch((err) => {
//       notification.errorStrict(err);
//     })
//     .finally(() => {
//       dispatch(layoutToggleLoading(false));
//     });
// };

// màn DMDC:
// export const exportExcelDMDCTable = (query, jwt) => (dispatch) => {
//   console.log("đã vào được tới đây rồi");
//   dispatch(layoutToggleLoading(true));
//   return sendGetBlob(
//     `${DEV_ENPOINT}cross-check/categories/dmdc/export-excel${convertObjectToUrl(
//       query
//     )}`,
//     null,
//     jwt
//   )
//     .then((res) => {
//       notification.success("Kết xuất thành công");
//       savingFile(res.data, "Danh sách đối soát với DMDC");
//       return res;
//     })
//     .catch((err) => {
//       notification.errorStrict(err);
//     })
//     .finally(() => {
//       dispatch(layoutToggleLoading(false));
//     });
// };

export const exportExcelFullLechDMDC = (query, jwt) => (dispatch) => {
  // console.log('chưa có api case này đâu')
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}cross-check/categories/dmdc/detail/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then((res) => {
      notification.success("Kết xuất thành công");
      savingFile(res.data, `Danh sách đối soát Lệch DMDC`);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};

// export const exportExcelDetailDMDC = (jwt, params) => (dispatch) => {
//   console.log("đã vào được tới đây rồi");
//   dispatch(layoutToggleLoading(true));
//   return sendGetBlob(
//     `${DEV_ENPOINT}cross-check/categories/detail/export-excel${convertObjectToUrl(
//       params
//     )}`,
//     null,
//     jwt
//   )
//     .then((res) => {
//       notification.success("Kết xuất thành công");
//       savingFile(res.data, "Đối soát chi tiết với DMDC");
//       return res;
//     })
//     .catch((err) => {
//       notification.errorStrict(err);
//     })
//     .finally(() => {
//       dispatch(layoutToggleLoading(false));
//     });
// };
