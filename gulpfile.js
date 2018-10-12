'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('sass', function () {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('js', function () {
  gulp.src('assets/js/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./assets/js/**/*.js', ['js']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8000/index.html'
    }));
});

gulp.task('build', ['sass', 'js']);
gulp.task('dev', ['sass:watch', 'js:watch', 'webserver']);