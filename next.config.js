const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withOptimizedImages = require("next-optimized-images");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { ANALYZE } = process.env;

const { WEB_PORT, HRM_PORT } = require("./env-config");
const { exportPathMap } = require("./consts/exportPathMap");

module.exports = withCSS(
  withSass({
    ...withOptimizedImages({
      onDemandEntries: {
        websocketPort: HRM_PORT,
        websocketProxyPath: "/hmr",
        websocketProxyPort: WEB_PORT,
        websocketProxyHost: "localhost",
      },
      webpack: (config, options) => {
        config.node = {
          console: true,
          fs: "empty",
          net: "empty",
          tls: "empty",
        };
        config.module.rules.push(
          {
            test: /.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "babel-loader",
              },
              {
                loader: "react-svg-loader",
                options: {
                  jsx: true,
                },
              },
            ],
          },
          {
            test: /\.(ttf|eot|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
          {
            test: /react-icons\/(.)*(.js)$/,
            loader: "babel-loader",
            query: {
              presets: ["es2015", "react"],
            },
          }
        );
        if (ANALYZE) {
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "server",
              analyzerPort: 8888,
              openAnalyzer: true,
            })
          );
        }

        return config;
      },
      exportPathMap,
    }),
    cssModules: false,
  })
);
