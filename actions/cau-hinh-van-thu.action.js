import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendGet, sendPost, sendPut } from "utils/requests";
import { GET_CHVTHU_SUCCESS, UPDATE_CHVTHU_SUCESS } from "./action_types";
import { layoutToggleLoading } from "./layout.action";

export const getCHVTHU = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}category/chvthu${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      dispatch({
        type: GET_CHVTHU_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
export const updateCHVTHU = (token, data) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${DEV_ENPOINT}category/chvthu`, null, data, token)
    .then((res) => {
      notification.success("Sửa cấu hình văn thư thành công");
      return dispatch({
        type: UPDATE_CHVTHU_SUCESS,
        payload: res?.data,
      });
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
