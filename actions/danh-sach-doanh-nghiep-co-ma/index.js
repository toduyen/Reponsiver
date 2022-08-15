import { sendGet, sendPost, sendPatch, sendPut, sendDelete } from "utils/requests";
import notification from "utils/notification";
import { convertObjectToUrl, generateSearchString } from "../../utils/helper";

export const getAttachCodeBusinesses = (token, query = {}) => (dispatch) => {
    query.sort = "ntao:desc";
    return sendGet(
        `${DEV_ENPOINT}category/ds-dncma${convertObjectToUrl(query)}`,
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

export const checkMstAttachCodeBusiness = (token, mst) => (dispatch) => {
    return sendGet(
      `${DEV_ENPOINT}category/ds-dncma/investigate/${mst}`,
      null,
      token
    )
    .then(res => {
    // console.log('MST res: ', res)
    return res;
    })
    .catch((err) => {
    // notification.errorStrict(err);
    return err?.response;
    });
};

export const addNewAttachCodeBusiness = (token, data) => (dispatch) => {
    return sendPost(
      `${DEV_ENPOINT}category/ds-dncma`,
      null,
      data,
      token
    )
    .then(( res ) => {
        return res;
    })
    .catch((err) => {
        notification.errorStrict(err);
    });
};

export const updateAttachCodeBusiness = (token, data) => (dispatch) => {
    return sendPut(
      `${DEV_ENPOINT}category/ds-dncma`,
      null,
      data,
      token
    )
    .then(( res ) => {
        return res;
    })
    .catch((err) => {
        notification.errorStrict(err);
    });
};

export const checkHistoryAttachCodeBusiness = (token, mst, id) => (dispatch) => {
    return sendGet(
      `${DEV_ENPOINT}category/ds-dncma/lich-su/${mst}/${id}`,
      null,
      token
    )
    .then(res => {
    // console.log('MST res: ', res)
        return res;
    })
    .catch((err) => {
        notification.errorStrict(err);
    });
};

export const deleteAttachCodeBusiness = (token, id, mst) => {
    return (dispatch) => {
      const requests = sendDelete(
        `${DEV_ENPOINT}category/ds-dncma/${mst}/${id}`,
        null,
        token
      );
      requests
    .then((res) => {
        notification.success("Xoá thành công");
        return res;
    })
    .catch((err) => {
        notification.errorStrict(err);
    });
      return requests;
    };
};

export const importDSDNCMList = (data, jwt) => (dispatch) => {
    return sendPost(
      `${DEV_ENPOINT}category/ds-dncma/excel-import`,
      null,
      data,
      jwt
    )
    .then(res => {
        return res;
    })
    .catch((err) => {
        notification.errorStrict(err);
    });
};
  
  