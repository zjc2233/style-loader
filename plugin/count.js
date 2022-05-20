const path = require("path");
const fs = require("fs");
const { resolve } = path;
function genMap() {
  const alias = new Map();
  function resolve(dir) {
    return path.join(process.cwd(), dir);
  }
  alias
    .set("~", resolve("src"))
    .set("@", resolve("src"))
    .set("components", resolve("src/components"))
    .set("vux", resolve("src/vux"))
    .set("service", resolve("src/pages/service"))
    .set("vue$", "vue/dist/vue.esm.js");
  return alias;
}


var timeout

let res = {}

var num = true
const alias = genMap();
fs.writeFileSync("tmp.json", "", { flag: "w" });
// eslint-disable-next-line no-unused-vars
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        if (num) {
          console.log('path', path);
          console.log('state', state);
          num = false
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
            importModuleName = resolve(state.filename, importModuleName);
          } else {
            return;
          }
        }
        if (timeout) {
          clearTimeout(timeout)
        }
        console.log(importModuleName);
        if (res[importModuleName]) {
          res[importModuleName].push(state.filename)
        } else {
          res[importModuleName] = []
          res[importModuleName].push(state.filename)
        }
        timeout = setTimeout(() => {
          console.log(123456789, res);
          fs.writeFileSync("tmp.json", `${JSON.stringify(res)}`, { flag: "a+" });
        }, 3000);
      },
    },
    post(state) {
      // console.log(456789);
    }
  };
};
