const expressSession = require("express-session");
const { WEB_PORT } = require("./env-config");

const SERVER_URL = `https://localhost:${WEB_PORT}`;

module.exports = () => {
  return new Promise((resolve) => {
    resolve({
      sessionSecret: "SECRECT_SESSION_KEY",
      sessionMaxAge: 60000 * 60 * 24 * 7,
      sessionRevalidateAge: 60000,
      serverUrl: SERVER_URL,
      expressSession: expressSession,
      sessionStore: undefined,
      providers: [],
    });
  });
};
