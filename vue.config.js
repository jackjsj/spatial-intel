module.exports = {
  outputDir: 'dist',
  publicPath: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/kuzhai': {
        target: 'http://mj001.free.idcfengye.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/kuzhai': '/kuzhai',
        },
      },
    },
  },
};
