const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io/',
    createProxyMiddleware({
      target: 'http://localhost:3001/socket.io/',
      changeOrigin: true,
    })
  );
};
