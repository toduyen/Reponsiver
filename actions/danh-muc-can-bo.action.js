import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendPost, sendPut } from "utils/requests";
import { GET_LIST_DMCBO } from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getDMCBOlist = (jwt, query) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/dm-cbos${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DMCBO,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getDMCBOlistByCqt = (jwt, query) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/dm-cbos/qlnd${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_LIST_DMCBO,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};
