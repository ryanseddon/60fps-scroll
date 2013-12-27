/*
  This is an EXAMPLE gulpfile.js
  You'll want to change it to match your project.
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
*/
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  gulp.src(['client/js/**/*.js', '!client/js/vendor/**'])
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

  // Copy vendor files
  gulp.src('client/js/vendor/**')
    .pipe(gulp.dest('build/js/vendor'));
});

// Copy all static assets
gulp.task('copy', function() {
  gulp.src('client/img/**')
    .pipe(gulp.dest('build/img'));

  gulp.src('client/css/**')
    .pipe(gulp.dest('build/css'));

  gulp.src('client/*.html')
    .pipe(gulp.dest('build'));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('scripts', 'copy');

  // Watch files and run tasks if they change
  gulp.watch('client/js/**', function(event) {
    gulp.run('scripts');
  });

  gulp.watch([
    'client/img/**',
    'client/css/**',
    'client/*.html'
  ], function(event) {
    gulp.run('copy');
  });
});