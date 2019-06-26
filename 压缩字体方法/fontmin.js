var Fontmin = require("fontmin");
var Scan = require("charactor-scanner");
var path = require("path");
var fs = require('fs');
var chalk = require('chalk');

let dirnameList = ["views", "components", "locales"]

// 合并数组
const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
// 数组去重
const uniqueElements = arr => [...new Set(arr)];

function getData(_path) {
    return Scan({
        dir: path.resolve(__dirname, `./src/${_path}`)
    })
}

function getAllData(_dirnameList) {
    let promList = []
    _dirnameList.forEach(dir => {
        promList.push(getData(dir))
    });
    return Promise.all(promList).then(data => {
        let result = uniqueElements(flatten(data)).join()
        fs.writeFile(path.resolve(__dirname, "./data.txt"), result, function (err) {
            if (err) {
                throw err;
            }
            console.log('资源文件 data.txt 保存成功');
        });
        return result
    })
}

function fontmin(data) {
    var srcPath = "src/assets/_fonts/*.ttf"; // 字体源文件
    var destPath = "src/assets/fonts/"; // 输出路径
    // 初始化
    var fontminInstance = new Fontmin()
        .src(srcPath) // 输入配置
        .use(
            Fontmin.glyph({
                text: data
            })
        )
        .use(Fontmin.ttf2eot()) // eot 转换插件
        .use(Fontmin.ttf2woff()) // woff 转换插件
        .use(Fontmin.ttf2svg()) // svg 转换插件
        .use(Fontmin.css()) // css 生成插件
        .dest(destPath); // 输出配置
    // 执行
    fontminInstance.run(function (err, files, stream) {
        if (err) {
            console.error(err);
        } else {
            debugger
            files.forEach(fils => {
                
                console.log(`name: ${chalk.green(fils.basename)} -- size: ${chalk.red(fils.stat.size/1000)}KB`);
                
            })
            console.log("压缩完成");
        }

    });
}

getAllData(dirnameList).then(fontmin);