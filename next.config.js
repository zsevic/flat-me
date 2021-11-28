const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: true,

  images: {
    domains: [
      "img.cityexpert.rs",
      "cityexpert.rs",
      "resizer.4zida.rs",
      "www.4zida.rs",
      "img.halooglasi.com",
      "www.halooglasi.com"
    ],
  },
  src: "./src",

  webpack(config) {
    return config;
  },
});
