var gulp = require('gulp');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var sources = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var bs = require('browser-sync').create();

var
  source = 'src/',
  dest = 'build/';

var bootstrapSass = { in: './node_modules/bootstrap-sass/'
};

gulp.task('traspaso-build', function () {
  gulp.src([source + 'index.html',
      source + 'images/**'
    ], {
      base: './src'
    })
    .pipe(gulp.dest(dest));
});

gulp.task('compass', function () {

  gulp.src([source + 'sass/**/*.scss'])
    .pipe(compass({
      css: dest + 'css',
      sass: source + 'sass',
      import_path: bootstrapSass.in + 'assets/stylesheets'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cssnano())
    .pipe(gulp.dest(dest + 'css'))
    .pipe(gulp.dest(source + 'css'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('javascript', function () {

  return browserify(source + 'js/app.js')
    .bundle()
    .pipe(sources('app.js')) // gives streaming vinyl file object
    .pipe(buffer()) // convert from streaming to buffered vinyl file object
    .pipe(uglify({
      compress: {
        drop_console: true
      }
    })) // now gulp-uglify works 
    .pipe(gulp.dest(dest + 'js/'));
});

gulp.task('watch', function () {
  gulp.watch([source + 'lib/**', 'src/images/**', 'src/fonts/**', 'src/individuales/**', 'src/index.html'], ['traspaso-build']);
  gulp.watch(source + 'sass/*.scss', ['compass']);
  gulp.watch(source + 'js/**/*.js', ['javascript']);
  gulp.watch(source + '**/*.html').on('change', bs.reload);
});

gulp.task('browser-sync', function () {
  bs.init({
    server: './build',
    https: true
  });
});

gulp.task('default', ['traspaso-build', 'compass', 'javascript', 'watch', 'browser-sync'], function () {});