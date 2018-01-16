var gulp = require('gulp');
var webpack = require('webpack-stream');
var gutil = require("gulp-util");
var del = require("del");
var connect = require('gulp-connect');
// 引入组件
var minifycss = require('gulp-minify-css'),//css压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息
var rev = require('gulp-rev'),
    revC = require('gulp-rev-collector'),
    RevAll = require('gulp-rev-all'),
    cssMin = require('gulp-csso')


var rest = require('connect-rest');
var src = {
    html: "src/html/*.html",                          // html 文件
    vendor: ["src/vendor/**/*", "bower_components/**/*"], // vendor 目录和 bower_components
    style: "src/css/*.css",                  // style 目录下所有 xx/index.less
    assets: "src/assets/**/*"                             // 图片等应用资源
};

var dist = {
    root: "dist/",
    html: "dist/templates",
    style: "dist/static/css",
    vendor: "dist/static/vendor",
    assets: "dist/static/assets"
};

var bin = {
    root: "bin/",
    html: "bin/templates",
    style: "bin/static/css",
    vendor: "bin/static/vendor",
    assets: "bin/astatic/ssets"
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
    del.sync(dist.root);
    done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
    return gulp.src(dist.root + '**/*')
        .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
        .pipe(gulp.dest(dist.html))
}

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/static/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/static/css'))
        .pipe(notify({message: 'css task ok'}));
}

exports.style = style;
function styledev() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/static/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/static/css'))
        .pipe(notify({message: 'css task ok'}));
}

exports.styledev = styledev;

//Html替换css、js引用文件版本
function revHtml() {
    return gulp.src(['dist/**/*.json', src.html])
        .pipe(revC())
        .pipe(gulp.dest(dist.html));
}

exports.revHtml = revHtml;

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
    connect.server({
        root: dist.root,
        port: 8080,
        livereload: true,
        middleware: function (connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
    gulp.watch(src.html, html);
    gulp.watch("src/**/*.js", webpackDevelopment);
    gulp.watch("src/**/*.css", style);
    gulp.watch("dist/**/*").on('change', function (file) {
        gulp.src('dist/')
            .pipe(connect.reload());
    });
}

/**
 * default task
 */
gulp.task("default", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, styledev, webpackDevelopment,),
    revHtml,
    connectServer,
    watch
));

/**
 * production build task
 */
gulp.task("build", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, style, webpackProduction),
    revHtml,
    cleanBin,
    copyDist,
    function (done) {
        console.log('build success');
        done();
    }
));

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
    connect.reload();
}

function webpackDevelopment() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            config: require('./webpack.common.js'),
            config: require('./webpack.dev.js')
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(notify({message: 'js task ok'}));


}

exports.webpackDevelopment = webpackDevelopment;

function webpackProduction() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            config: require('./webpack.common.js'),
            config: require('./webpack.prod.js')
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(notify({message: 'js task ok'}));
}

exports.webpackProduction = webpackProduction;
