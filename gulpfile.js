const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rimraf = require('rimraf');

/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});


/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./source/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

/* ------------ Copy scripts ------------- */
gulp.task('copy:scripts', function() {
  return gulp.src('./source/js/*.js')
    .pipe(gulp.dest('build/js'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:scripts'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('source/styles/**/*.sass', gulp.series('styles:compile'));
  gulp.watch('source/js/**/*.js', gulp.series('copy'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'copy'),
  gulp.parallel('watch', 'server')
  )
);

