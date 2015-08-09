var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css'),
    watch = require('gulp-watch');


gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function(){
    gulp.watch('./less/*.less', ['less']);

});