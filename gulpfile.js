var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var rename = require("gulp-rename");

gulp.task('jade-html', function () {
    var YOUR_LOCALS = {};
    gulp.src('src/templates/**/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('templates'));
});

gulp.task('jade-index', function () {
    var YOUR_LOCALS = {};
    gulp.src('src/templates/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('minify-css', function() {
    return gulp.src('src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('styles'));
});

gulp.task('replace-min-js', function(){
    return gulp.src(['src/scripts/*.min.js', 'src/scripts/*.js.map'])
        .pipe(gulp.dest('scripts'));
});

gulp.task('compress', ['replace-min-js'], function() {
    return gulp.src(['src/scripts/*.js', '!src/scripts/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('scripts'));
});

gulp.task('stylus', function () {
    var YOUR_LOCALS = {};
    return gulp.src('./src/styles/style.styl')
        .pipe(stylus({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./src/styles'));
});

gulp.task('css', ['stylus' , 'minify-css']);

gulp.task('watch', ['update'], function () {
    gulp.watch('src/templates/**/*.jade', ['jade-html','jade-index']);
    gulp.watch('src/styles/**/*.styl', ['stylus']);
    gulp.watch('src/styles/**/*.css', ['minify-css']);
    gulp.watch('src/scripts/**/*.js', ['compress']);
    // Other watchers
});

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            port: 8080,
            open: true
        }));
});

gulp.task('dev', ['webserver' , 'watch']);

gulp.task('update', ['jade-html','jade-index' , 'stylus', 'minify-css', 'compress']);