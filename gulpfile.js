var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');


gulp.task('scripts', function() {
    return gulp.src(['../node_modules/angular/angular.min.js', 'https://code.jquery.com/jquery-1.12.4.min.js', '../node_modules/slick-carousel/slick/slick.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jade', function () {
    var YOUR_LOCALS = {};
    gulp.src('frontend/templates/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('frontend'));
});

gulp.task('watch', function () {
    gulp.watch('frontend/templates/**/*.jade', ['jade']);
    gulp.watch('frontend/styles/**/*.styl', ['stylus']);
    // Other watchers
});

gulp.task('stylus', function () {
    var YOUR_LOCALS = {};
    return gulp.src('./frontend/styles/style.styl')
        .pipe(stylus({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./frontend'));
});

gulp.task('default', ['jade' , 'stylus']);