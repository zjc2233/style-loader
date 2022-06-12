const vueComponentUsage = require('./plugin/vueComponentUsage')
const index = require('./plugin/index')
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [vueComponentUsage({time: 20000})]
}
