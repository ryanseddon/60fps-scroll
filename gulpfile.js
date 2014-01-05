var gulp = require('gulp');
var browserify = require('gulp-browserify');
var through = require('through');
var Compiler = require('es6-module-transpiler').Compiler;
var concat = require('gulp-concat');

// I have a gulp task gulp-es6-module-transpiler but I dont know how
// to use it as I'm not sure how to access the buffer from the task so
// browserifies transform task can work correctly? Can you help?
function compile(opts) {
    var buf = '';
    return function () {
        return through(write, end);
    };

    function write(data) {
        buf += data;
    }

    function end() {
        this.queue((new Compiler(buf, '', opts)).toCJS());
        this.queue(null);
        buf = '';
    }
}

gulp.task('build', function() {
    gulp.src('src/main.js')
        .pipe(browserify({
            transform : [compile()]
        }))
        .pipe(concat('60fps-scroll.js'))
        .pipe(gulp.dest('./dist'));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build');

  // Watch files and run tasks if they change
  gulp.watch('src/*.js', function(event) {
    gulp.run('build');
  });
});