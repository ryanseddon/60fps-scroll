var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');

gulp.task('build', function() {
    gulp.src('src/main.js')
        .pipe(browserify({
            transform: ['deamdify']
        }))
        .pipe(rename('60fps-scroll.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify('60fps-scroll.min.js', {
            outSourceMap: true
        }))
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
