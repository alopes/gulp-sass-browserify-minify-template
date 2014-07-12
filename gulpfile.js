var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    browserify = require('browserify')
    source = require('vinyl-source-stream')
    minifyHTML = require('gulp-minify-html');

gulp.task('connect', function() {

    connect.server({
        root: 'dist',
        livereload: true
    });

});

gulp.task('sass', function () {

    var config = {
        outputStyle: 'compressed',
        sourceComments: 'none',
        sourceMap: true
    };

    return gulp.src('./src/scss/*.scss')
        .pipe(sass( config ))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());

});

gulp.task('watch', function(){

    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch('./src/*.html', ['minify-html']);

});

gulp.task('browserify', function() {

    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});

gulp.task('minify-html', function() {

    var opts = {comments:true,spare:true};

    gulp.src('./src/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('default', ['minify-html','browserify', 'sass', 'watch', 'connect']);
