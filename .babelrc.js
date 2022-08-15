const env = require("./env-config.js");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["transform-define", env],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-optional-chaining"],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          styles: "./styles",
        },
        cwd: "babelrc",
      },
    ],
    ["lodash"],
    [
      "import",
      {
        libraryName: "antd",
      },
    ],
    [
      "styled-components",
      {
        ssr: true,
      },
    ],
  ],
};
