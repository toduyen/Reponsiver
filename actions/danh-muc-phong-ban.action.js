import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendPost, sendPut } from "utils/requests";
import { GET_LIST_DMPBAN } from "./action_types";
import { layoutToggleLoading } from "./layout.action";
import cloneDeep from "lodash/cloneDeep";

export const getDMPBANlist = (jwt, query) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/dm-pbans${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DMPBAN,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getDMPBANlistByCqt = (jwt, query) => (dispatch) => {
  const param = cloneDeep(query);
  param.search["ten,ma"] = param.search["ten,ma"] || param.search.ten;
  param.search.ten = undefined;
  return sendGet(
    `${DEV_ENPOINT}category/dm-pbans/qlnd${convertObjectToUrl(param)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DMPBAN,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
