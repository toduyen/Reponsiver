import _isEmpty from "lodash/isEmpty";
import { convertObjectToUrl } from "utils/helper";
import notification from "utils/notification";
import { sendDelete, sendGet, sendPost, sendPatch } from "utils/requests";
import { generateSearchString } from "../utils/helper";

export const createSchedule = (data, jwt) => (dispatch) => {
  return sendPost(`${API_SCHEDULE_URL}/dky-chinh`, null, data, jwt)
    .then(({ data }) => {
      notification.success("Thêm mới dữ liệu thành công");
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const updateSchedule = (id, type, data = {}, token) => {
  return (dispatch) => {
    const requests = sendPatch(
      `${API_SCHEDULE_URL}/dky-chinh/${type}/${id}`,
      null,
      data,
      token
    );
    requests
      .then((res) => {
        notification.success("Cập nhật dữ liệu thành công");
        return res;
      })
      .catch((e) => {
        if((e?.response?.data?.message || e?.message) && !e?.response?.data?.details) {
          notification.errorStrict(e);
        }
        throw e;
      });
    return requests;
  };
};

export const deleteSchedule = (id, type, token) => {
  return (dispatch) => {
    const requests = sendDelete(
      `${API_SCHEDULE_URL}/dky-chinh/${type}/${id}`,
      null,
      token
    );
    requests
      .then((res) => {
        notification.success("Xoá dữ liệu thành công");
        return res;
      })
      .catch((err) => {
        notification.errorStrict(err);
        throw err;
      });
    return requests;
  };
};

export const getAllSchedule = (type, token) => (dispatch) => {
  return sendGet(
    `${API_SCHEDULE_URL}/dky-chinh${(type ? `?search=mldky==${type}`: '')}&sorts=ncnhat:desc`,
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

export const getScheduleDetail = (id, type, token) => (dispatch) => {
  return sendGet(
    `${API_SCHEDULE_URL}/dky-chinh/${type}/${id}`,
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

export const searchCqThue = (query = {}, token) => (dispatch) => {
  const { search, pageSize, state } = query;
  return sendGet(
      `${API_SCHEDULE_URL}/dky-cqthue${
        search ? `?search=${generateSearchString(search, ";")}` : ""
      }${(pageSize ? `&size=${pageSize}`: '')}${
          state ? `&state=${state}` : ""
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

export const searchCqThueForCreate = (query = {}, type, token) => (dispatch) => {
  const { search, pageSize, state } = query;
  return sendGet(
      `${API_SCHEDULE_URL}/dky-cqthue/create/${type}${
        search ? `?search=${generateSearchString(search, ";")}` : ""
      }${(pageSize ? `&size=${pageSize}`: '')}${
          state ? `&state=${state}` : ""
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

export const searchCqThueForUpdate = (query = {}, id, type, token) => (dispatch) => {
  const { search, pageSize, state } = query;
  return sendGet(
      `${API_SCHEDULE_URL}/dky-cqthue/update/${type}/${id}${
        search ? `?search=${generateSearchString(search, ";")}` : ""
      }${(pageSize ? `&size=${pageSize}`: '')}${
          state ? `&state=${state}` : ""
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

export const getAllCqThue = (token) => (dispatch) => {
  return sendGet(
      `${API_SCHEDULE_URL}/dky-cqthue`,
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