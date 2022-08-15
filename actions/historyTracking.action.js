import _isEmpty from "lodash/isEmpty";
import notification from "utils/notification";
import { sendGet } from "utils/requests";
import { generateSearchString } from "../utils/helper";

export const searchScheduleHistory = (query = {}, token) => (dispatch) => {
    const { search, pageSize, state } = query;
    return sendGet(
        `${API_SCHEDULE_URL}/dky-kqua?size=${pageSize}${
            state ? `&state=${state}` : ""
          }${
            search ? `&search=${generateSearchString(search, ";")}` : ""
          }`,
        null,
        token
    )
        .then(res => {
            // console.log('getAnnouncementDetail: ', res);
            return res;
        })
        .catch((err) => {
            notification.errorStrict(err);
            throw err;
        });
};

export const getScheduleHistoryDetail = (id, token) => (dispatch) => {
    return sendGet(
        `${API_SCHEDULE_URL}/dky-kqua-ctiet/${id}`,
        null,
        token
    )
        .then(res => {
            // console.log('getAnnouncementDetail: ', res);
            return res;
        })
        .catch((err) => {
            notification.errorStrict(err);
            throw err;
        });
};