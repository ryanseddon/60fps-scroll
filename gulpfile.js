var gulp = require('gulp');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('transpile', function() {
  gulp.src('src/*.js')
    .pipe(es6ModuleTranspiler({type: 'cjs'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('bundle', function() {
  gulp.src('dist/main.js')
    .pipe(browserify({
      debug: true
    }))
    .pipe(concat('60fps-scroll.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
  gulp.run('transpile');
  // For some reason bundle fails unless I do it as a separate run call?
  gulp.run('bundle');
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build');

  // Watch files and run tasks if they change
  gulp.watch('src/*.js', function(event) {
    gulp.run('build');
  });
});