import { convertObjectToUrl, savingFile } from "utils/helper";
import notification from "utils/notification";
import { sendGet, sendGetBlob } from "utils/requests";
import { layoutToggleLoading } from "./layout.action";

export const getDiary = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${DEV_ENPOINT}user-activity/activity${convertObjectToUrl(query)}`,
    null,
    jwt
  )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const getOffice = (jwt) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(`${DEV_ENPOINT}user-activity/privilege`, null, jwt)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const exportExcelDiary = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGetBlob(
    `${DEV_ENPOINT}user-activity/activity/export-excel${convertObjectToUrl(
      query
    )}`,
    null,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kết xuất thành công");
      savingFile(data, "Nhật ký hoạt động");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => {
      dispatch(layoutToggleLoading(false));
    });
};
