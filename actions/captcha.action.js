import { sendGet } from "utils/requests";
import {} from "./action_types";
import notification from "utils/notification";

export const captchaGet = () => (dispatch) => {
    return sendGet(`${CAPTCHA_URL}`)
        .then(({ data }) => {
            return data;
        })
        .catch((err) => {
            if (typeof window !== "undefined") notification.errorStrict(err);
            throw err;
        });
};
