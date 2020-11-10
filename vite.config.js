// vite.config.js
export default {
  cors: true,
    proxy: {
      // string shorthand
      '/foo': 'http://localhost:4567/foo',
      // with options
      '/api': {
        target: 'https://api.eyunzhu.com/api/vatfs/resource_site_collect/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }