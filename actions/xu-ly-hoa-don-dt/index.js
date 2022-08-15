import { sendGet, sendGetBlob, sendPost } from "utils/requests";
import {
  GET_DECLARATION_SUCCESS,
  APPROVE_DECLARATION_SUCCESS,
  GET_DECLARATION_HISTORY_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_CENSOR_USER_SUCCESS,
  GET_RECORDS_SUCCESS,
  GET_NOTIFI_01TNDT_SUCCESS,
} from "../action_types";
import notification from "utils/notification";
import { layoutToggleLoading } from "../layout.action";
import { convertObjectToUrl, savingFile } from "utils/helper";

export const getDeclaration = (token, user, search, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  // const ascName = query?.isApproval ? "pdcbngay" : "nnhan";
  const ascName = "nnhan";
  return sendGet(
    // `${DEV_ENPOINT}registration/declarations?search=0101&sort=nlap&size=10`,
    `${API_REGISTRATION_URL}/tax-official/declarations?search=${`ttxly=in=(${
      !isNaN(search?.ttxly) ? search?.ttxly : `0,1,2,6`
    })`}${search?.nlap_tu ? `;nnhan=ge=${search?.nlap_tu}` : ``}${
      search?.nlap_den ? `;nnhan=le=${search?.nlap_den}` : ``
    }${
      search?.mst?.length > 0 ? `;mst=in=(` + search?.mst + `)` : ``
    }&sort=${ascName}:ASC${
      query?.isApproval
        ? `&pdldao=${user?.username}&pdptrach=${user?.username}`
        : ``
    }&size=${query?.size || 15}${query?.state ? `&state=${query?.state}` : ``}`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DECLARATION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDeclarationApprove =
  (token, user, search, query) => (dispatch) => {
    dispatch(layoutToggleLoading(true));
    const ascName = "nnhan";
    return sendGet(
      `${API_REGISTRATION_URL}/tax-official/declarations?search=${
        query?.isApproval
          ? `ttxly=in=(${search?.ttxly ? search?.ttxly : `3,4,7`})`
          : ``
      }${search?.nlap_tu ? `;ntrinh=ge=${search?.nlap_tu}` : ``}${
        search?.nlap_den ? `;ntrinh=le=${search?.nlap_den}` : ``
      }${
        search?.mst?.length > 0 ? `;mst=in=(` + search?.mst + `)` : ``
      }&sort=${ascName}:ASC${
        query?.isApproval
          ? `&pdldao=${user?.username}&pdptrach=${user?.username}`
          : ``
      }&size=${query?.size || 15}${
        query?.state ? `&state=${query?.state}` : ``
      }`,
      null,
      token
    )
      .then(({ data }) => {
        dispatch({
          type: GET_DECLARATION_SUCCESS,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  };

export const getDeclarationApproveVT =
  (token, user, search, query) => (dispatch) => {
    dispatch(layoutToggleLoading(true));
    const ascName = "nnhan";
    return sendGet(
      `${API_REGISTRATION_URL}/tax-official/declarations?search=${
        query?.isApproval
          ? `ttxly=in=(${search?.ttxly ? search?.ttxly : `5`})`
          : ``
      }${search?.pdptngay_tu ? `;pdldngay=ge=${search?.pdptngay_tu}` : ``}${
        search?.pdptngay_den ? `;pdldngay=le=${search?.pdptngay_den}` : ``
      }${
        search?.mst?.length > 0 ? `;mst=in=(` + search?.mst + `)` : ``
      }&sort=${ascName}:ASC&size=${query?.size || 15}${
        query?.state ? `&state=${query?.state}` : ``
      }`,
      null,
      token
    )
      .then(({ data }) => {
        dispatch({
          type: GET_DECLARATION_SUCCESS,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => dispatch(layoutToggleLoading(false)));
  };

function handelTtxlyUrl(ttxly, user) {
  switch (ttxly) {
    case 0:
      return `ttxly=in=(0)`;
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
      return `ttxly=in=(0,1,2,3,4,5,6,7,8)`;
  }
}

// export const getSearchDeclaration =
//   (token, user, search, query) => (dispatch) => {
//     // debugger
//     dispatch(layoutToggleLoading(true));
//     return sendGet(
//       // `${DEV_ENPOINT}registration/declarations?search=0101&sort=nlap&size=10`,
//       `${API_REGISTRATION_URL}/tax-official/declarations?search=${handelTtxlyUrl(
//         search?.ttxly,
//         user
//       )}${search?.nlap_tu ? `;nnhan=gt=${search?.nlap_tu}` : ``}${
//         search?.nlap_den ? `;nnhan=lt=${search?.nlap_den}` : ``
//       }${
//         search?.mst?.length > 0 ? `;mst=in=(` + search?.mst + `)` : ``
//       }&sort=nnhan:DESC&size=${query?.size}${
//         query?.state ? `&state=${query?.state}` : ``
//       }`,

//       null,
//       token
//     )
//       .then(({ data }) => {
//         dispatch({
//           type: GET_DECLARATION_SUCCESS,
//           payload: data,
//         });
//         return data;
//       })
//       .catch((err) => {
//         notification.errorStrict(err);
//       })
//       .finally(() => dispatch(layoutToggleLoading(false)));
//   };

export const getSearchDeclaration = (token, search) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/declarations${convertObjectToUrl(
      search
    )}`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DECLARATION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getLoaiNguoiNopThue = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/dm-lnnts?size=1000`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_DECLARATION_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getLoaiHinhKinhTe = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/dm-lhkts?size=1000`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_DECLARATION_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getLoaiHinhKinhTeChiTiet = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_CATEGORY_URL}/dm-lhktcts?size=1000`, null, jwt)
    .then(({ data }) => {
      // dispatch({
      //   type: GET_DECLARATION_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const registerDeclarations = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/validate`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      // dispatch({
      //   type: APPROVE_DECLARATION_SUCCESS,
      //   payload: data,
      // });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const approveDeclaration = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: APPROVE_DECLARATION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const approveDeclarationMultiple = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/multiple`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      // notification.success("Phê duyệt và ký thành công");
      dispatch({
        type: APPROVE_DECLARATION_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDeclarationHistory = (token, idtkhai) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/declarations/${idtkhai}/histories`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_DECLARATION_HISTORY_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getDeclarationDetail = (token, idtkhai) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/declarations/${idtkhai}`,
    null,
    token
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
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getCriterions = (token, idtkhai) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/declarations/criterias/all-records`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_CRITERIONS_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getCensorUser = (token, type) => (dispatch) => {
  const code = type == "ASSISTANT_REVIEW" ? "PTPDDK" : "LDPDDK";
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_SYS_URL}/users/privilege?privilege_code=${code}`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_CENSOR_USER_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getRecords = (token) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/declarations/criterias/all-records`,
    null,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_RECORDS_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getXmlDeclaration = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/xml-generators`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_RECORDS_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getXmlDeclarationNew = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/documentation-presigned`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      dispatch({
        type: GET_RECORDS_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
  // .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getNotificationTB01NDT = (token, param) => (dispatch) => {
  const { mst, idtbtnhan } = param || {};
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/notices/received/${mst}/${idtbtnhan}`,
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
export const getNotification01TBHDDT = (token, param) => (dispatch) => {
  const { mst, idtbao } = param || {};
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_REGISTRATION_URL}/tax-official/notices/accepted/${mst}/${idtbao}`,
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
// van thu signing
export const approveDocumentationSigned = (token, data) => (dispatch) => {
  return sendPost(
    `${API_REGISTRATION_URL}/tax-official/declarations/documentation-signed`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      // notification.success("Phê duyệt và ký thành công");
      dispatch({
        type: APPROVE_DECLARATION_SUCCESS,
        payload: data,
      });
      // dispatch(layoutToggleLoading(false));
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {});
};

// /tax-official/declarations
export const exportExcelDeclaration =
  (param, jwt) =>
  (dispatch) => {
    dispatch(layoutToggleLoading(true));
    return sendGetBlob(
      `${API_REGISTRATION_URL}/tax-official/declarations/export-excel${convertObjectToUrl(
        param
      )}`,
      null,
      jwt
    )
      .then((res) => {
        notification.success("Kết xuất thành công");
        savingFile(res.data, "Danh sách đăng ký sử dụng hoá đơn điện tử");
        return res;
      })
      .catch((err) => {
        notification.errorStrict(err);
      })
      .finally(() => {
        dispatch(layoutToggleLoading(false));
      });
  };
