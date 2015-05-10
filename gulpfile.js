
var gulp = require('gulp');
var gls = require('gulp-live-server');
 
gulp.task('serve', function () {
    var server = gls.new('app.js');
    server.start();
    
    gulp.watch(['public/*.html','public/*.js'], server.notify);
    gulp.watch(['app.js'], server.start); 
});