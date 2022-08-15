import { sendGet, sendPost, sendPut, sendGetBlob, sendDelete } from "utils/requests";
import notification from "utils/notification";
import { convertObjectToUrl, generateSearchString } from "../../utils/helper";

export const getAnnouncementList = (token, query = {}, pageKey) => (dispatch) => {
    const { search, pageSize, state } = query;

    let searchApiEndpoint = (pageKey === "approvement") ? "ds-nsdhddttbs/search-approve" : "ds-nsdhddttbs";

    return sendGet(
      `${DEV_ENPOINT}category/${searchApiEndpoint}?size=${pageSize}&sort=ngay:DESC${
        state ? `&state=${state}` : ""
      }${
        search ? `&search=${generateSearchString(search, ";")}` : ""
      }`,
      null,
      token
    )
    .then(({ data }) => {
      return data;
    })
      .catch((err) => {
        notification.errorStrict(err);
      });
};

export const getAnnouncementDetail = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/${mst}/${id}`,
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

export const addAnnouncement = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-nsdhddttbs`,
    null,
    data,
    token
  )
    .then(( res ) => {
      // notification.success("Tao mới thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
      throw err;
    });
};

export const updateAnnouncementStatus = (token, data) => (dispatch) => {
  return sendPut(
    `${DEV_ENPOINT}category/ds-nsdhddttbs`,
    null,
    data,
    token
  )
    .then(( res ) => {
      notification.success("Cập nhật thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const sendAnnouncement = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/submit`,
    null,
    data,
    token
  )
    .then(( res ) => {
      // notification.success("Trình phê duyệt thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const approveAnnouncement = (token, data) => (dispatch) => {
  return sendPost(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/approve`,
    null,
    data,
    token
  )
    .then(( res ) => {
      // notification.success("Phê duyệt thành công");
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    });
};

export const getHistoryListByMst = (token, mst, id) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-nsdhddttblses/${mst}/${id}`,
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

export const getRightApprovedCBT = (token) => (dispatch) => {
  return sendGet(
    `${API_SYS_URL}/users/privilege?privilege_code=PDTBSDHD`,
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

export const exportAnnouncements = (token, query = {}) => (dispatch) => {
  const { search } = query;
  return sendGetBlob(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/export-excel/${
      search ? `?search=${generateSearchString(search, ";")}` : ""
    }&sort=ngay:DESC`,
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

export const deleteAnnouncement = (token, id, mst) => {
  return (dispatch) => {
    const requests = sendDelete(
      `${DEV_ENPOINT}category/ds-nsdhddttbs/${mst}/${id}`,
      null,
      token
    );
    requests
      .then((res) => {
        notification.success("Xoá thông báo thành công");
      })
      .catch((err) => {
        notification.errorStrict(err);
      });
    return requests;
  };
};

export const checkMstExistRequest = (token, mst, displayError=true) => (dispatch) => {
  return sendGet(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/investigate/${mst}`,
    null,
    token
  )
    .then(res => {
      return res;
    })
    .catch((err) => {
      if(displayError) notification.errorStrict(err);
      return err?.response;
    });
};
export const importFileAnnouncement = (data, jwt) => (dispatch) => {
  return sendPost(`${DEV_ENPOINT}category/ds-nsdhddttbs/excel-import`, null, data, jwt)
    .then(({ data }) => {
      notification.success(`Import thành công`);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
};

export const submitCorrectAnnouncements = (data, jwt) => (dispatch) => {
  return sendPost(`${DEV_ENPOINT}category/ds-nsdhddttbs/batch`, null, data, jwt)
    .then(({ data }) => {
      notification.success(`Đã thêm mới thành công ${data?.length} bản ghi`);
      return data;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
};

export const getTbsoList = (token, mst, ngay) => (dispatch) => {
  const param = {
    mst,
    ngay  
  };

  return sendGet(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/get-ds-tbso${convertObjectToUrl(param)}`,
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

export const getDsTbNgay = (token, mst, so, ngay) => (dispatch) => {
  const param = {
    mst,
    so,
    ngay
  };

  return sendGet(
    `${DEV_ENPOINT}category/ds-nsdhddttbs/get-ds-tbngay?mst=${mst}&so=${so}&ngay=${ngay}`,
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

export const checkImportExcelItem = (data, jwt) => (dispatch) => {
  return sendPost(`${DEV_ENPOINT}category/ds-nsdhddttbs/validate-import`, null, data, jwt)
    .then(res => {
      console.log('checkImportExcelItem:', checkImportExcelItem);
      return res;
    })
    .catch((err) => {
      notification.errorStrict(err);
    })
};