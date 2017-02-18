var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');

gulp.task('check-js', function(){
  return gulp.src('test_check/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
});

gulp.task('check-css', function(){
  return gulp.src('test_check/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('start', ['check-js', 'check-css'], function () {
  var started = false;
	return nodemon({
		script: 'app_hw.js',
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('default', ['start'], function () {
  gulp.watch('test_check/*.js', ['check-js']);
  gulp.watch('test_check/*.css', ['check-css']);
});
