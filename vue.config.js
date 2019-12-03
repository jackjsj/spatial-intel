module.exports = {
  outputDir: 'dist',
  publicPath: './',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/spaceIngelligent': {
        // target: 'http://mj001.free.idcfengye.com/',
        target: 'http://baota.qdaoliqi.cn:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/spaceIngelligent': '/spaceIngelligent',
        },
      },
    },
  },
};
