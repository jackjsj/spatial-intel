module.exports = {
  outputDir: 'space-intel',
  publicPath: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/spaceIngelligent': {
        // target: 'http://mj002.vipgz2.idcfengye.com/',
        target: 'http://47.105.171.29:8082/',
        changeOrigin: true,
        pathRewrite: {
          '^/spaceIngelligent': '/space-ingelligent',
        },
      },
    },
  },
};
