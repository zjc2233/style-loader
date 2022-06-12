const path = require("path");
let { parse } = require("@babel/parser");
const traverse =require("@babel/traverse").default;
const { plugins } = require("../postcss.config");

const code = `function square(n) {
    return n * n;
  }`;

const ast = parse(code);
traverse(ast, {
  FunctionDeclaration: function (path) {
    // path.node.id.name = "x";
    console.log(path);
  },
});

const rely = function (source) {
  let code = parse(source, {
    sourceType: "module",
    plugins: ["typescript"],
  });
  // console.log(source);
  traverse(code, {
    CallExpression: (path) => {
      console.log(path);
      // console.log(state);
      debugger;
    },
  });
  return source;
};

module.exports = rely;
