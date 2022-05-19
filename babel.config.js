const counts = require('./plugin/count')
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [counts]
}
