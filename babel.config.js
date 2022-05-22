const counts = require('./plugin/count')
const index = require('./plugin/index')
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [counts]
}
