// ~index.jsconst
path = require("path");
const fs = require("fs");
const { resolve } = path;
function genMap() {
  const alias = new Map();
  function resolve(dir) {
    return path.join(process.cwd(), dir);
  }
  alias.set("~", resolve("src")).set("@", resolve("src")).set("components", resolve("src/components")).set("vux", resolve("src/vux")).set("service", resolve("src/pages/service")).set("vue$", "vue/dist/vue.esm.js");
  return alias;
}
const alias = genMap();
fs.writeFileSync("tmp.txt", "", { flag: "w" }); // eslint-disable-next-line no-unused-vars
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
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
        fs.writeFileSync("tmp.txt", `${importModuleName}\n`, { flag: "a+" });
      },
    },
  };
};
