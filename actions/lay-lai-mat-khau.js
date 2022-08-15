import notification from "utils/notification";
import { sendGet, sendPost } from "utils/requests";
import { layoutToggleLoading } from "./layout.action";

export const getPasswordRetrievalInfo = (jwt, { mst }) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${API_SYS_URL}/reset-pasword/user/${mst}`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const postPasswordRetrieval = (jwt, { mst }) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPost(`${API_SYS_URL}/reset-pasword/user/${mst}`, null, {}, jwt)
    .then(({ data }) => {
      notification.success(`Mật khẩu đã được gửi về ${data.email}`);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
