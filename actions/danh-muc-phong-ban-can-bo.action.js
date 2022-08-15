import notification from "utils/notification";
import { sendGet } from "utils/requests";
import { GET_LIST_DMPBAN } from "./action_types";

export const getDMPBCBolist = (jwt, query) => (dispatch) => {
  return sendGet(`${API_SYS_URL}/users/departments/${query}`, null, jwt)
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
