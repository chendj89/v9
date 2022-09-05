#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { program } = require("commander");
const ProgressBar = require('progress');
program
  .option("-v,--version [version]", "版本", require("../package.json").version)
  .option("-i,--init [init]", "初始化开发环境", "")
  .parse(process.argv);

let opts = program.opts();

let findOption = (name) => {
  return program.options.find((item) => item.long == `--${name}`);
};

if (opts.init) {
  let option = findOption("init");
  let cwd = process.cwd();
  console.log(option.description+"开始");
  CopyDirectory(
    path.join(__dirname, "../src/vscode"),
    path.join(cwd, ".vscode")
  );
  console.log(option.description+"结束");
}
function CopyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  let dirs = fs.readdirSync(src);
  dirs.forEach(function (item) {
    let item_path = path.join(src, item);
    let temp = fs.statSync(item_path);
    if (temp.isFile()) {
      // 是文件
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) {
      // 是目录
      CopyDirectory(item_path, path.join(dest, item));
    }
  });
}

var bar = new ProgressBar(':bar', { total: 4 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);

fs.readdir(path.join(__dirname, "../src/vscode"),(err,files)=>{
  console.log(files.length);
});