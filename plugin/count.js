const path = require("path");
const fs = require("fs");
const { resolve, dirname } = path;
function genMap() {
  const alias = new Map();
  function resolve(dir) {
    return path.join(process.cwd(), dir);
  }
  alias.set("~", resolve("src")).set("@", resolve("src")).set("components", resolve("src/components")).set("vux", resolve("src/vux")).set("service", resolve("src/pages/service")).set("vue$", "vue/dist/vue.esm.js");
  return alias;
}

var timeout;

let res = {};

var num = true;
const alias = genMap();
// eslint-disable-next-line no-unused-vars
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        // 如果是main.js或者main.ts文件，则清空tem.json文件，重新写入
        // if (state.filename.endsWith("main.ts") || state.filename.endsWith("main.js")) {
          fs.writeFileSync("tmp.json", "", { flag: "w" });
        // }
        if (num) {
          debugger
          console.log("path", path);
          console.log("state", state);
          num = false;
        }
        // debugger
        let importModuleName = path.node.source.value;
        let found = false;
        alias.forEach((value, key) => {
          if (importModuleName.startsWith(`${key}/`)) {
            importModuleName = importModuleName.replace(key, value);
            found = true;
          }
        });
        if (!found) {
          if (importModuleName.startsWith(".")) {
            importModuleName = resolve(dirname(state.filename), importModuleName);
          } else {
            return;
          }
        }
        if (timeout) {
          clearTimeout(timeout);
        }
        console.log(importModuleName);
        if (res[importModuleName] && (res[importModuleName].indexOf(state.filename) === -1)) {
          res[importModuleName].push(state.filename);
        } else {
          res[importModuleName] = [];
          res[importModuleName].push(state.filename);
        }
        timeout = setTimeout(() => {
          console.log(123456789, res);
          fs.writeFileSync("tmp.json", `${JSON.stringify(res)}`, { flag: "a+" });
        }, 10000);
      },
    },
    post(state) {
      // console.log('post');
    },
  };
};
