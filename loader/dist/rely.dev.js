"use strict";

var path = require('path');

var parse = require('@babel/parser');

var traverse = require('@babel/traverse');

var rely = function rely(source) {
  // let code = parse.parse(source)
  console.log(source); // traverse(code, {
  //     ImportExpression(path, state) {
  //         console.log(path);
  //         // console.log(state);
  //         debugger
  //     }
  // })

  return source;
};

module.exports = rely;