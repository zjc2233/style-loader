const path = require('path')
var postcss = require("postcss");
var pxtorem = require("postcss-pxtorem/index");

const stylePxtorem = function (source) {
    let reg = /<template>([\w\W]*)<\/template>/gi;
    source = source.replace(reg, (item) => {
        let reg1 = /style=(")(.*)(")/gi
        item = item.replace(reg1, (style, ...$1) => {
            // console.log(style);
            // console.log('$1', $1); 
            var processed = postcss(pxtorem()).process($1[1]).css;
            console.log(123);
            console.log(processed);
            console.log(123);
            style = style.replace('px', 'rem')
            return style
        })
        return item
    });
    return source;
}

module.exports = stylePxtorem