var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps');


gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        //.pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function(){
    gulp.watch('./less/*.less', ['less']);
    gulp.watch([
        'app/*.html',
        'app/css/*.css'
    ]).on('change', reload);
});

gulp.task('server', function () {
    browserSync({
        notify: true,
        port: 9700,
        server: {
            baseDir: 'app/'
        }
    })
});

gulp.task('default', ['less', 'server', 'watch']);