#!/usr/bin/env node
const path = require("path");
const copyFiles = require("../utils/copyFiles");
const { program } = require("commander");
program
  .option("-v,--version [version]", "版本", require("../package.json").version)
  .option("-i,--init [init]", "初始化开发环境")
  .parse(process.argv);

let opts = program.opts();
let findOption = (name) => {
  return program.options.find((item) => item.long == `--${name}`);
};
if (opts.init) {
  let option = findOption("init");
  let cwd = process.cwd();
  copyFiles({
    src: path.join(__dirname, "../.vscode"),
    dest: path.join(cwd, ".vscode"),
    description: option.description,
  });
}
