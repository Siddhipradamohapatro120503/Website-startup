const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://shreetech.org',
      changeOrigin: true,
      secure: true
    })
  );
};
