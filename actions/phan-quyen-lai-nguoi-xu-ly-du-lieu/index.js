/* eslint-disable no-undef */
import { sendGet, sendPost, sendPatch } from "utils/requests";
import notification from "utils/notification";
import { layoutToggleLoading } from "./../layout.action";
import { convertObjectToUrl, generateSearchString , savingFile } from "utils/helper";
import {
  GET_DS_HDCCM_SUCCESS,
  GET_DETAIL_HDCCM_SUCESS,
  REJECT_HDCCM_SUCCESS,
  GENERATE_XML_HDCCM_SUCCESS,
  GET_DS_NOTI_HDCCM_SUCCESS,
  GET_DETAIL_NOTI_HDCCM_SUCESS,
  HISTORY_NOTI_HDCCM_SUCCESS,
  UPDATE_NOTI_HDCCM_SUCCESS,
  LEADER_NOTI_HDCCM_SUCCESS,
  OVERSEER_NOTI_HDCCM_SUCCESS,
  ACTION_NOTI_HDCCM_SUCCESS,
  UPDATE_LIST_ARISE_RESULT_SUCCESS,
  UPDATE_LIST_ARISE_SUCCESS,
} from "actions/action_types";
import _isEmpty from "lodash/isEmpty";


function handelTtxlyUrl(ttxly, user) {
  switch (ttxly) {
    case 1:
      return `ttxly=in=(1)`;
    case 2:
      return `ttxly=in=(2)`;
    case 6:
      return `ttxly=in=(6)`;
    case 4:
      return `ttxly=in=(4)`;
    case 5:
      return `ttxly=in=(5)`;
    case 3:
      return `ttxly=in=(3)`;
    case 7:
      return `ttxly=in=(7)`;
    case 8:
      return `ttxly=in=(8)`;

    default:
      return `ttxly=in=(1,2,3,4,5,6,7,8)`;
  }
}

export const getMergedErrorInvoices = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}explanation/official/office-mergers?size=${pageSize}${
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

export const getMergedUsers = (token, query = {}) => (dispatch) => {
  return sendGet(
    `${API_SYS_URL}/user-lookup/users${convertObjectToUrl(query)}`,
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

export const updateMergedErrorInvoices = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}explanation/official/office-mergers`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getMergedDeclaration =
  (token, user, search, query) => (dispatch) => {
    dispatch(layoutToggleLoading(true));
    // return sendGet(
    //   `${API_REGISTRATION_URL}/lookup/tax-official/declarations/snhap?search=${
    //     search?.mst?.length > 0 ? `mst=in=(` + search?.mst + `)` : ``
    //   }${search?.nlap_tu ? `;nnhan=gt=${search?.nlap_tu}` : ``}${
    //     search?.nlap_den ? `;nnhan=lt=${search?.nlap_den}` : ``
    //   }&sort=nnhan:DESC&size=${query?.size}${
    //     query?.state ? `&state=${query?.state}` : ``
    //   }`,

    //   null,
    //   token
    // )

    return sendGet(
      `${API_REGISTRATION_URL}/lookup/tax-official/declarations/snhap?search=${
        search?.mst?.length > 0 ? `mst=in=(` + search?.mst + `)` : ``
      }${search?.nlap_tu ? (search?.mst?.length > 0 ? `;nnhan=gt=${search?.nlap_tu}` : `nnhan=gt=${search?.nlap_tu}`) : ``}${
        search?.nlap_den ? ((search?.mst?.length > 0 || search?.nlap_tu) ? `;nnhan=lt=${search?.nlap_den}` : `nnhan=lt=${search?.nlap_den}`) : ``
      }&sort=nnhan:DESC&size=${query?.size}${
        query?.state ? `&state=${query?.state}` : ``
      }`,

      null,
      token
    )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  };

export const updateMergedTokhai = (token, data) => (dispatch) => {
  return sendPatch(
    `${API_REGISTRATION_URL}/office-merger`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getMergedProposalArisesList = (jwt, query) => (dispatch) => {
  // dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official-merger/01-1/QTr${convertObjectToUrl(query)}`,
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
      // dispatch(layoutToggleLoading(false));
    });
};

export const updateMergedQTR01 = (token, data) => (dispatch) => {
  return sendPatch(
    `${API_ADHOC}/official-merger/01-1/QTr`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getMergedAnnouncementList = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}category/lookup/ds-nsdhddttb/snhap?size=${pageSize}&sort=ngay:DESC${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
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

export const updateMergedAnnouncementList = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/snhap`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};


//getListProposalArises
export const getListProposalArises = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_ADHOC}/official-merger/de-nghi${convertObjectToUrl(query)}`,
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

//updateListProposalArises 
export const updateListProposalArises = (token, data) => (dispatch) => {
  return sendPatch(
    `${API_ADHOC}/official-merger/de-nghi`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

// getListInvoicesArises 
export const getListInvoicesArises = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_INVOICE}/official-merger${convertObjectToUrl(query)}`,
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

// updateListInvoicesArises
export const updateListInvoicesArises = (token, data) => (dispatch) => {
  return sendPatch(
    `${API_INVOICE}/official-merger`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

// getListHightTaxRisks
export const getListHightTaxRisks = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}category/lookup/ds-dnrrcqd/snhap${convertObjectToUrl(query)}`,
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
// updateListHightTaxRisks
export const updateListHightTaxRisks = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-dnrrcqd/snhap`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
// getApproveAnnouncement
export const getApproveAnnouncement = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}category/lookup/ds-tbktt/snhap${convertObjectToUrl(query)}`,
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
// updateApproveAnnouncement
export const updateApproveAnnouncement = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-tbktts/snhap`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

// getSmallMediumBusiness
export const getSmallMediumBusiness = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}category/lookup/ds-dnnvqd/snhap${convertObjectToUrl(query)}`,
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
// updateSmallMediumBusiness
export const updateSmallMediumBusiness = (token, data) => (dispatch) => {
  // console.log('sadasadadsa', data);
  return sendPatch(
    `${DEV_ENPOINT}category/ds-dnnvqd/snhap`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

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

export const getSnhapActive = (token, query = {}) => (dispatch) => {
  return sendGet(
    `${API_SYS_URL}/snhap/active`,
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
