const helmet = require("helmet");
const next = require("next");
const fs = require("fs");
const path = require("path");
// const https = require("https");
const http = require("http");
const cookiesMiddleware = require("universal-cookie-express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./next-auth.config");

const certOptions = {
  key: fs.readFileSync(path.resolve("cer/cert.key")),
  cert: fs.readFileSync(path.resolve("cer/cert.crt")),
};

const { DEV, WEB_PORT, HRM_PORT } = require("./env-config");
const app = next({
  dev: DEV,
});
var morgan = require("morgan");

app
  .prepare()
  .then(() => {
    return nextAuthConfig();
  })
  .then((nextAuthOptions) => {
    return nextAuth(app, nextAuthOptions);
  })
  .then(({ expressApp: server }) => {
    server.use(helmet.frameguard({ action: "deny" }));

    if (!DEV) {
      server.use(morgan("combined"));
    }
    
    server.use(cookiesMiddleware());

    server.set("WEB_PORT", WEB_PORT);

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all("*", async (req, res) => {
      let nextRequestHandler = app.getRequestHandler();
      return nextRequestHandler(req, res);
    });

    if (DEV) {
      const wsProxy = createProxyMiddleware("/hmr", {
        target: `ws://[::1]:${HRM_PORT}`,
      });
      // https
      //   .createServer(certOptions, server)
      //   .listen(server.get("WEB_PORT"), (err) => {
      //     if (err) throw err;
      //     console.log(`> Ready on https://localhost:${server.get("WEB_PORT")}`);
      //   })
      //   .on("upgrade", wsProxy.upgrade);
      http
        .createServer(server)
        .listen(server.get("WEB_PORT"), (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${server.get("WEB_PORT")}`);
        })
        .on("upgrade", wsProxy.upgrade);
    } else {
      server.listen(server.get("WEB_PORT"), (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${server.get("WEB_PORT")}`);
      });
    }
  });
