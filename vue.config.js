module.exports = {
  outputDir: 'space-intel',
  publicPath: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/space-ingelligent': {
        // target: 'http://mj002.vipgz2.idcfengye.com/',
        target: 'http://47.105.171.29:8082/',
        changeOrigin: true,
        pathRewrite: {
          '^/space-ingelligent': '/space-ingelligent',
        },
      },
    },
  },
};
