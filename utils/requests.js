const axios = require("axios");
const { CancelToken } = axios;

const endPoint = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return window?.location?.pathname;
};

axios.interceptors.request.use(function (config) {
  config.headers["End-Point"] = `${endPoint()}`;
  return config;
});

export const sendGet = (url, params, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      params,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  promise.cancel = cancel;
  return promise;
};

export const sendGetBlob = (url, params, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      params,
      responseType: "blob",
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  promise.cancel = cancel;
  return promise;
};

export const sendPost = (url, params, data, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      data: data,
      params,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendPostBlob = (url, params, data, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      data: data,
      params,
      responseType: "blob",
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendPut = (url, params, data, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "put",
      url,
      params,
      data: data,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendPatch = (url, params, data, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "patch",
      url,
      data: data,
      params,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendDeleteWithBody = (url, params, data, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url,
      data: data,
      params,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendDelete = (url, params, _token) => {
  let cancel;
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url,
      params,
      headers: _token && {
        Authorization: `Bearer ${_token}`,
        "Accept-Language": "vi",
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  promise.cancel = cancel;
  return promise;
};
