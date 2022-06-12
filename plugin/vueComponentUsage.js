const path = require("path");
const fs = require("fs");
const { resolve, dirname } = path;

var timeout;

function genMap() {
  const alias = new Map();
  function resolve(dir) {
    return path.join(process.cwd(), dir);
  }
  alias.set("~", resolve("src")).set("@", resolve("src")).set("components", resolve("src/components")).set("vux", resolve("src/vux")).set("service", resolve("src/pages/service")).set("vue$", "vue/dist/vue.esm.js");
  return alias;
}

// 晴空tmp.json中的内容
function clearTmp(state) {
  // 如果是main.js或者main.ts文件，则清空tem.json文件，重新写入
  if (state.filename.endsWith("main.ts") || state.filename.endsWith("main.js")) {
    fs.writeFileSync("tmp.json", "", { flag: "w" });
  }
}
// 处理importModuleName(导入的文件路径)
function importModuleNameFormat(path, state, importModuleName) {
  let found = false;
  // debugger
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
      // return;
    }
  }
  return importModuleName
}

// 写入tmp.json文件
function writeTem(path, state, importModuleName, options) {
  if (timeout) {
    clearTimeout(timeout);
  }
  importModuleName = importModuleName.replace(/\\/g, "/").replace(resolve(), '');
  let fileUrl = state.filename.replace(resolve(), '')
  if (res[importModuleName] && res[importModuleName].indexOf(fileUrl) === -1) {
    res[importModuleName].push(fileUrl);
  } else {
    res[importModuleName] = [];
    res[importModuleName].push(fileUrl);
  }
  timeout = setTimeout(() => {
    fs.writeFileSync("tmp.json", `${JSON.stringify(res)}`, { flag: "a+" });
  }, options.time || 10000);
}

// 存储最后输出到结果Í
let res = {};
const alias = genMap();

module.exports = function (options) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        clearTmp(state);
        let importModuleName = importModuleNameFormat(path, state, path.node.source.value);

        // 如果是node_modules的文件的话，直接过滤掉
        if (importModuleName.indexOf("node_modules") !== -1) {
          return;
        }
        // 判断是否是vue文件，不是的话，过滤掉
        if (!importModuleName.endsWith(".vue") && !fs.existsSync(`${importModuleName}.vue`)) {
          return;
        }
        writeTem(path, state, importModuleName, options)
      },
      Import(path, state) {
        clearTmp(state);
        let importModuleName = importModuleNameFormat(path, state, path.container.arguments[0].value);

        // 如果是node_modules的文件的话，直接过滤掉
        if (importModuleName.indexOf("node_modules") !== -1) {
          return;
        }
        // 判断是否是vue文件，不是的话，过滤掉
        if (!importModuleName.endsWith(".vue") && !fs.existsSync(`${importModuleName}.vue`)) {
          return;
        }
        writeTem(path, state, importModuleName, options)
      },
    },
  };
};
