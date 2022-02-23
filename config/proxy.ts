/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 *
 */
const { REACT_APP_ENV = 'dev', API } = process.env;
const serveUrlMap = {
  dev: API,
  pre: API,
  test: API,
};
export default {
  dev: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV],
      pathRewrite: { '^': '' },
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV],
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV],
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
