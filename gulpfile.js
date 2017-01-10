/**
 * Builds our libaries into a single file for easy upload to NetSuite
 */
'use strict';

// main version stamp - gets appended to the build filename
var version = require("./package.json").version;
var outdir = "dist";

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
    "EC_SharedLibrary_ServerSide.js",
    "EC_Search.js",
    "EC_nsdal.js",
    "consoleAppender.js",
    "EC_Logging.js"
];

// build the project to a single file for easy deployment to NetSuite libraries tab, includes several other open source
// libs
gulp.task('default',['clean'], function () {
    return gulp.src(sources)
        .pipe($.uglify()) // scrunch them individually
        .pipe($.concat("EC_Libs-" + version + ".js")) // combine into a single file w/version stamp
        .pipe(gulp.dest(outdir))
        .pipe($.size()); // outputs a blurb about how many bytes the final result is
});

// uses plain node del module to delete previous build
gulp.task('clean', function(){
    del(outdir, function() {
        console.log("Deleted " + outdir);
    });
});