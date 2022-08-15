const DEV = process.env.NODE_ENV !== "production";
const WEB_PORT = DEV ? 3001 : 9000;
const HRM_PORT = 6689;
// const DEV_ENPOINT = "http://10.0.147.44:8888/";
// const DEV_ENPOINT = "http://10.100.131.52:8888/";
const DEV_ENPOINT = "http://192.168.1.82:8888/";
const LOCAL_DEV_ENDPOINT = "http://localhost:8080";
// const SOCKET_URL = "http://10.0.147.44:3001/";
// const SOCKET_URL = "http://10.100.131.57:3001/";
const CAPTCHA_URL = "http://10.100.131.10:4000";

module.exports = {
  DEV,
  WEB_PORT,
  DEV_ENPOINT,
  HRM_PORT,
  // SOCKET_URL,
  API_URL: `${DEV_ENPOINT}security-official`,
  API_CATEGORY_URL: `${DEV_ENPOINT}category`,
  API_QUERY_URL: `${DEV_ENPOINT}query`,
  API_JOB_URL: `${DEV_ENPOINT}job`,
  API_CONFIG_URL: `${DEV_ENPOINT}configuration`,
  API_SCHEDULE_URL: `${DEV_ENPOINT}job-config`,
  API_REGISTRATION_URL: `${DEV_ENPOINT}registration`,
  API_HDDT_REGISTRATION_URL: `http://192.168.1.82:30100`,
  API_RESULT_URL: `${DEV_ENPOINT}result`,
  API_ADHOC: `${DEV_ENPOINT}hddt-adhoc`,
  API_INVOICE: `${DEV_ENPOINT}invoice`,
  API_SYS_URL: `${DEV_ENPOINT}system-official`,
  API_VERIFICATION_URL: `${DEV_ENPOINT}verification`,
  API_MANUALLY_URL: `${DEV_ENPOINT}examination`,
  API_MANDATE: `${DEV_ENPOINT}delegation`,
  API_LOOKUP: `${DEV_ENPOINT}lookup`,
  CAPTCHA_URL,
  // API_REGISTRATION_URL: `${LOCAL_DEV_ENDPOINT}`
};
