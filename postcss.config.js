module.exports = {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: 50, // 根元素字体大小
        // propList: ['width', 'height']
        propList: ['*']
      }
    }
  }