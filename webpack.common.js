const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
var ROOT_PATH = __dirname;

var fs = require('fs');
var SOURCES_PATH = path.join(ROOT_PATH, 'src/js');
var ASSET_PATH = path.join(ROOT_PATH, 'src/assets/js');
var NODE_PATH = path.join(ROOT_PATH, 'node_modules');
var resolve = {
    modules: [SOURCES_PATH, ROOT_PATH, NODE_PATH,ASSET_PATH],
    alias: {
        //  也可以不写
        jquery: 'src/assets/js/jquery.min.js',
    }
};

var externals = [
    {
        jquery: {
            root: '$',
            commonjs2: 'jquery',
            commonjs: 'jquery',
            amd: 'jquery'
        }
    }
];

function getEntry(jspath, key) {
    var jsPath = path.resolve(jspath, key);
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        // console.log(matchs);
        if (matchs) {
            files.push(path.resolve(jspath, key, item));
        }
    });
    //console.log(JSON.stringify(files));
    return files;
}

var commonjs = getEntry(SOURCES_PATH, 'common');
var mainjs = getEntry(SOURCES_PATH, '');
var usersjs = getEntry(SOURCES_PATH, 'users');
module.exports = {
    entry: {
        'common/common': commonjs,
        main: mainjs,
        users: usersjs

    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
                   name: 'vendor' // 指定公共 bundle 的名称。
      })

    ],
    externals: externals,
    output: {
        filename: '[name].js',//.[chunkhash]
        chunkFilename:
            "[name].[chunkhash].js",
        path: path.resolve(__dirname, 'dist/static/js/'),
        libraryTarget: 'umd'
    },
    resolve: resolve
};