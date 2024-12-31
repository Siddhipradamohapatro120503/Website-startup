module.exports = {
  allowedHosts: [
    'shreetech.org',
    '.shreetech.org',
    'localhost',
    '.localhost'
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  },
  https: true,
  host: '0.0.0.0',
  port: 3000
};
