const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const del = require('del');

const isDevelopment = process.env.NODE_ENV !== 'production';


gulp.task('views', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function () {
  return gulp.src('./src/app.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.{css,styl}', gulp.series('styles'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('./public')
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'views',
    'styles'
  )));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
  )));
