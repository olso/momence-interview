const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://www.cnb.cz/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
