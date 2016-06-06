var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');

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