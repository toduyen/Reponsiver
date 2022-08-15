import { sendGet, sendPost, sendPatch } from "utils/requests";
import notification from "utils/notification";
import { generateSearchString } from "../../utils/helper";

export * from "./search.action";

export const getCheckedResults = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}verification/kqkthd-xlttins/dsmsts?sort=mst:DESC&size=${pageSize}${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    token
  )
  .then(({data}) => {

    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getInvoiceCates = (token) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/dmucs/loais/khmshdon`,
    null,
    token
  )
    .then(res => {
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getInvoiceNeedToVerify = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}verification/kqkthd-xlttins/hdkqkts?size=${pageSize}${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    token
  )
  .then(({data})  => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const handleCheckedInvoice = (token, data, type) => (dispatch) => {
  let endPoint = (type === 'approve') 
                  ? 'acceptance' 
                  : ( (type === 'reject') ? 'non-acceptance' : 'hdbhp');

  return sendPatch(
    `${DEV_ENPOINT}verification/kqkthd-xlttins/hdkqkts/${endPoint}`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Cập nhật dữ liệu thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getAnnouncementNeedToVerify = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins?size=${pageSize}${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    token
  )
  .then(({data})  => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const sendVerifiedInvoiceBoss = (token, data, type) => (dispatch) => {
  let endpoint = (type === 'boss') ? "tldao" : "tptrach";
  let successMes = (type === 'boss') ? "Trình lãnh đạo thành công" : "Trình phụ trách thành công";

  return sendPatch(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/${endpoint}`,
    null,
    data,
    token
  )
    .then(({ data }) => {
      notification.success(successMes);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const requestXmlVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const createAnnouncementVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}verification/kqkthd-xlttins/hdkqkts/tbrsdts`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const cancelAnnouncementVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/cancellation`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Hủy thông báo thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const signVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/kgui`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Ký phê duyệt thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getApprovedVerifiedInvoice = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}verification/tbrsdt-pduyets?size=${pageSize}${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getApprovedVerifiedInvoiceVT = (token, query = {}) => (dispatch) => {
  const { search, pageSize, state } = query;

  return sendGet(
    `${DEV_ENPOINT}verification/vt-tbrsdt-pds?size=${pageSize}${
      state ? `&state=${state}` : ""
    }${
      search ? `&search=${generateSearchString(search, ";")}` : ""
    }`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const handleApprovingVerifiedInvoice = (token, data, type = 'rejection') => (dispatch) => {
  let successMes = (type === 'rejection') 
                      ? 'Từ chối thông báo thành công' 
                      : (
                        (type === 'submission') ? "Trình lãnh đạo thành công" : "Phê duyệt thông báo thành công"
                      )

  return sendPatch(
    `${DEV_ENPOINT}verification/tbrsdt-pduyets/${type}`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success(successMes);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const requestXmlApprovingVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}verification/tbrsdt-pduyets/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const requestXmlApprovingVerifiedInvoiceVT = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}verification/vt-tbrsdt-pds/xml-generation`,
    null,
    data,
    token
  )
    .then(( { data } ) => {
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const signApprovingVerifiedInvoice = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}verification/tbrsdt-pduyets/approval`,
    null,
    data,
    token
  )
    .then(res => {
      notification.success("Ký phê duyệt thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const signApprovingVerifiedInvoiceVT = (token, data) => (dispatch) => {
  return sendPatch(
    `${DEV_ENPOINT}verification/vt-tbrsdt-pds/approval`,
    null,
    data,
    token
  )
    .then(res => {
      // notification.success("Ký ban hành thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const get01AnnouncementCheckingResult = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}verification/kqkthd-xlttins/tbrsdts/${mst}/${id}`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const get01AnnouncementApprovingVerifiedInvoice = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}verification/tbrsdt-pduyets/${mst}/${id}`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const get01AnnouncementHandlingVerifiedInvoice = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/${mst}/${id}`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getHandlingVerifiedInvoiceHistory = (token, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}verification/tbrsdt-xlttins/${id}/histories`,
    null,
    token
  )
  .then(({data}) => {
    return data;
  })
    .catch((err) => {
      notification.errorStrict(err);
    });
};