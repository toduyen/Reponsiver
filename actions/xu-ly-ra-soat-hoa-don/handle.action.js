import notification from "../../utils/notification";
import { convertObjectToUrl } from "../../utils/helper";
import { sendGet, sendPatch } from "../../utils/requests";
import { layoutToggleLoading } from "../layout.action";

export const getListInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/hdkqkts${convertObjectToUrl(query)}`,
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

export const getDetailInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/hdkqktlquets/detail${convertObjectToUrl(
      query
    )}`,
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

export const getHistoriesInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/hdkqktlquets/histories${convertObjectToUrl(
      query
    )}`,
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

export const getNotificationInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  const { mst, id } = query;
  delete query.mst;
  delete query.id;
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/tbrsdts/${mst}/${id}${convertObjectToUrl(
      query
    )}`,
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

export const getDetailNotificationCancelExplanation = (jwt, query) => (
  dispatch
) => {
  dispatch(layoutToggleLoading(true));
  const { mst, id } = query;
  delete query.mst;
  delete query.id;
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/tbhgtrinhs/${mst}/${id}${convertObjectToUrl(
      query
    )}`,
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

export const getNotificationCancelExplanation = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendGet(
    `${API_VERIFICATION_URL}/hdttkts/tbhgtrinhs${convertObjectToUrl(query)}`,
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

export const acceptanceInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPatch(
    `${API_VERIFICATION_URL}/hdttkts/hdkqkts/acceptance`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("Ch???p nh???n th??nh c??ng");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};

export const nonAcceptanceInvoiceNeedInspect = (jwt, query) => (dispatch) => {
  dispatch(layoutToggleLoading(true));
  return sendPatch(
    `${API_VERIFICATION_URL}/hdttkts/hdkqkts/non-acceptance`,
    null,
    query,
    jwt
  )
    .then(({ data }) => {
      notification.success("Kh??ng ch???p nh???n th??nh c??ng");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
    .finally(() => dispatch(layoutToggleLoading(false)));
};
