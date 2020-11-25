module.exports = {
  lintOnSave: false,
  devServer:{
    proxy: {
      // with options
      '/api': {
        target: 'http://api.eyunzhu.com/api/vatfs/resource_site_collect',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  
}