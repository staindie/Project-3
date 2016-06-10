var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('jade', function () {
    var YOUR_LOCALS = {};
    gulp.src('frontend/templates/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('frontend'));
});

gulp.task('minify-css', function() {
    return gulp.src('frontend/styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('frontend'));
});

gulp.task('compress', function() {
    return gulp.src('frontend/scripts/*.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('frontend'));
});

gulp.task('stylus', function () {
    var YOUR_LOCALS = {};
    return gulp.src('./frontend/styles/style.styl')
        .pipe(stylus({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./frontend/styles'));
});

gulp.task('css', ['stylus' , 'minify-css']);

gulp.task('watch', function () {
    gulp.watch('frontend/templates/**/*.jade', ['jade']);
    gulp.watch('frontend/styles/**/*.styl', ['stylus']);
    gulp.watch('frontend/styles/**/*.css', ['minify-css']);
    gulp.watch('frontend/scripts/**/*.js', ['compress']);
    // Other watchers
});



gulp.task('default', ['jade' , 'stylus']);