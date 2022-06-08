const path = require('path')
let parse = require('@babel/parser')
let traverse = require('@babel/traverse')

const rely = function (source) {
    let code = parse(source)
    traverse(code, {
        
    })
    return source;
}

module.exports = rely