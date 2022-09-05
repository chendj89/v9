const path = require("path");
const fs = require("fs");
const ProgressBar = require("progress");
/**
 * 拷贝文件
 * @param {*} opts
 * @param opts.src 源目录
 * @param opts.dest 目标目录
 * @param opts.description 描述
 */
function copyFiles(opts) {
  // 判断目录是否存在
  // 没有就创建
  if (!fs.existsSync(opts.dest)) {
    fs.mkdirSync(opts.dest);
  }
  // 判断来源是否存在
  if (fs.existsSync(opts.src) == false) {
    return false;
  }
  if (opts.src.startsWith(process.cwd())) {
    console.log(`不能自己复制给自己`);
    return false;
  }
  let dirs = fs.readdirSync(opts.src);
  var bar = new ProgressBar(
    `${opts.description || ""}：[:bar] :percent :etas`,
    {
      total: dirs.length,
    }
  );
  new Promise((resolve) => {
    for (let i = 0; i < dirs.length; i++) {
      let item = dirs[i];
      let item_path = path.join(opts.src, item);
      let temp = fs.statSync(item_path);
      if (temp.isFile()) {
        fs.copyFileSync(item_path, path.join(opts.dest, item));
        bar.tick();
      }
    }
    resolve(true);
  });
  bar = null;
}
module.exports = copyFiles;
