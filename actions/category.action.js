import { sendGet, sendPost } from "utils/requests";
import notification from "utils/notification";

export const getLstCQT = (jwt, size) => {
  return sendGet(
    `${API_CATEGORY_URL}/dm-cqts?size=${size || 10000}`,
    null,
    jwt
  );
};

export const getCDCKS = (jwt) => {
  return Promise.resolve({
    datas: [
      {
        cqt: "0101",
        ma: "CT",
        ngtao: "anhpd2",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-11T07:45:49.946Z",
        ten: "Cục trưởng",
      },
      {
        cqt: "0101",
        ma: "PCT",
        ngtao: "anhpd2",
        ngcnhat: "lentn",
        ncnhat: "2021-10-16T04:07:16.605Z",
        ntao: "2021-10-11T07:46:26.833Z",
        ten: "Phó cục trưởng",
      },
      {
        cqt: "0101",
        ma: "CCT",
        ngtao: "anhpd2",
        ngcnhat: "lentn",
        ncnhat: "2021-10-16T04:07:16.605Z",
        ntao: "2021-10-11T07:46:26.833Z",
        ten: "Chi cục trưởng",
      },
      {
        cqt: "0101",
        ma: "PCCT",
        ngtao: "anhpd2",
        ngcnhat: "lentn",
        ncnhat: "2021-10-16T04:07:16.605Z",
        ntao: "2021-10-11T07:46:26.833Z",
        ten: "Phó chi cục trưởng",
      },
      {
        cqt: "0101",
        ma: "TP",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-16T04:07:36.543Z",
        ten: "Trưởng phòng",
      },
      {
        cqt: "0101",
        ma: "PTP",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-16T04:07:36.543Z",
        ten: "Phó trưởng phòng",
      },
      {
        cqt: "0101",
        ma: "DT",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-16T04:07:36.543Z",
        ten: "Đội trưởng",
      },
      {
        cqt: "0101",
        ma: "PDT",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-16T04:07:36.543Z",
        ten: "Phó đội trưởng",
      },
    ],
    total: 6,
    state: null,
    time: 11,
  });
  return sendGet(`${API_CATEGORY_URL}/ds-cdcks`, null, jwt)
    .then(({ data }) => data)
    .catch((err) => notification.errorStrict(err));
};

export const getHTCKS = (jwt) => {
  return Promise.resolve({
    datas: [
      {
        cqt: "0101",
        ma: "KT",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-08T07:34:42.358Z",
        ten: "Ký thay",
      },
      {
        cqt: "0101",
        ma: "KTUQ",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-08T07:36:44.597Z",
        ten: "Ký thừa ủy quyền",
      },
      {
        cqt: "0101",
        ma: "KTL",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-08T07:36:44.597Z",
        ten: "Ký thừa lệnh",
      },
      {
        cqt: "0101",
        ma: "KD",
        ngtao: "lentn",
        ngcnhat: null,
        ncnhat: null,
        ntao: "2021-10-16T04:08:40.226Z",
        ten: "Ký duyệt",
      },
    ],
    total: 7,
    state: null,
    time: 9,
  });
  return sendGet(`${API_CATEGORY_URL}/ds-htcks`, null, jwt)
    .then(({ data }) => data)
    .catch((err) => notification.errorStrict(err));
};
