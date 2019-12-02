module.exports = {
  outputDir: 'dist',
  publicPath: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cn-api.coolkit.cc:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
      '/dispatch': {
        target: 'https://cn-api.coolkit.cc:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/dispatch': '/dispatch',
        },
      },
      '/ap': {
        target: 'http://192.168.31.120/',
        changeOrigin: true,
        pathRewrite: {
          '^/ap': '/ap',
        },
      },
    },
  },
};
