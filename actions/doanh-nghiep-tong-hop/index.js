import { sendGet, sendPost, sendPatch, sendPut, sendDelete } from "utils/requests";
import notification from "utils/notification";
import { convertObjectToUrl, generateSearchString } from "../../utils/helper";

export const checkMstCombinedBusiness = (token, mst) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-dngbthop/investigate/${mst}`,
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

export const addNewCombinedBusiness = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-dngbthop`,
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

export const getCombinedBusiness = (token, query = {}) => (dispatch) => {
  query.sort = "ntao:desc";
  return sendGet(
    `${DEV_ENPOINT}category/ds-dngbthop${convertObjectToUrl(query)}`,
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

export const updateCombinedBusiness = (token, data) => (dispatch) => {
  return sendPut(
    `${DEV_ENPOINT}category/ds-dngbthop`,
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

export const deleteCombinedBusiness = (token, id, mst) => {
  return (dispatch) => {
    const requests = sendDelete(
      `${DEV_ENPOINT}category/ds-dngbthop/${mst}/${id}`,
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

export const checkHistoryCombinedBusiness = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-dngbthop/lich-su/${mst}/${id}`,
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

export const importDSBTHList = (data, jwt) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-dngbthop/excel-import`,
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
