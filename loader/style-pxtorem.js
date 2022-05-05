const path = require('path')
var postcss = require("postcss");
var pxtorem = require("postcss-pxtorem/index");
let postcssOptions = require("../postcss.config")

let text = `font-size: 1px`
text = postcss(pxtorem(postcssOptions.plugins['postcss-pxtorem'])).process(text).css
let reg = /[0-9.]*/gi
var fixedVal = text.match(reg)[11]

const stylePxtorem = function (source) {
    let reg = /<template>([\w\W]*)<\/template>/gi;
    // 
    source = source.replace(reg, (item) => {
        // 匹配不以：开头的style
        let reg1 = /([^:]style=)(")(.*)(")/gi
        item = item.replace(reg1, (style, ...$1) => {
            let processed = postcss(pxtorem(postcssOptions.plugins['postcss-pxtorem'])).process($1[2]).css;
            return `${$1[0]}${$1[1]}${processed}${$1[3]}`
        })
        // 匹配以：开头的style
        let reg2 = /(:style=)(")(.*)(")/gi
        item = item.replace(reg2, (style,) => {
            let reg3 = /(:[ *])([0-9a-zA-Z_$]*)([ *]\+[ *]'px')/gi
            style = style.replace(reg3, (stye1, ...$1) => {
                return `${$1[0]}(${$1[1]}*${fixedVal})+'rem'`
            })
            return style
        })

        return item
    });
    return source;
}

module.exports = stylePxtorem