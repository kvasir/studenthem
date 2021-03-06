var gulp = require('gulp');
var gls = require('gulp-live-server');
var less = require('gulp-less');
var ghPages = require('gulp-gh-pages');
var openIt = require('gulp-open');

gulp.task('serve', function () {
    var server = gls.new('app.js');
    server.start();

    gulp.watch(['public/*.html','public/*.js', 'public/*.css'], server.notify);
    gulp.watch(['app.js'], server.start);
    gulp.watch('public/components/**/*.less', ['less']);

    var options = {
        url: 'http://localhost:3000',
    };

    gulp.src('public/index.html')
    .pipe(openIt('', options));
});

gulp.task('less', function() {
    gulp.src('public/components/app.less')
        .pipe(less())
        .on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest('public/'));
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve', 'less']);
