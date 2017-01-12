/**
 * Builds our libaries into a single file for easy upload to NetSuite
 */
'use strict';

// main version stamp - gets appended to the build filename
var version = require("./package.json").version;
var outdir = "dist";
var webpack = require('webpack')
var gulp = require('gulp');
var del = require("del");

// loads all gulp plugins listed as dependencies from package.json
var $ = require('gulp-load-plugins')();

/**
 * All the sources files we want minimize and combine
 */
var sources = ["References/jQueryAOP/src/aop.js",
    "node_modules/lodash/lodash.js",
    "node_modules/moment/moment.js",
    "node_modules/lazy.js/lazy.js",
    "workarounds.js",
    "EC_SharedLibrary_Common.js",
    "Aurelia-Logger-webpack-lib.js",
    "EC_Defaults.js",
    "EC_Search.js",
    "EC_nsdal.js"
];

// uses webpack to pull together the aurelia logging stuff and depends into a single global "LogManager" identifier
gulp.task('logger', function (cb) {
    var webpackConfig = {
        output: {
            library: "LogManager",
            filename: "Aurelia-Logger-webpack-lib.js"
        },
        entry: "./Logging.js"
    }

    webpack(webpackConfig, function (err, stats) {
        if (err || stats.hasErrors()) {
            console.warn('errors doing the webpack')
        }
        else console.log('webpacked ' + stats.compilation.outputOptions.filename)
        cb(err)
    })
})
// build the project to a single file for easy deployment to NetSuite libraries tab, includes several other open source
// libs
gulp.task('default', ['clean', 'logger'], function () {
    return gulp.src(sources)
    //.pipe($.uglify()) // scrunch them individually
        .pipe($.concat("EC_Libs-" + version + ".js")) // combine into a single file w/version stamp
        .pipe(gulp.dest(outdir))
        .pipe($.size()); // outputs a blurb about how many bytes the final result is
});

// uses plain node del module to delete previous build
gulp.task('clean', function () {
    del(outdir, function () {
        console.log("Deleted " + outdir);
    });
});