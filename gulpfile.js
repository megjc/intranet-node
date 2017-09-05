(()=>{
  'use strict';
  const gulp = require('gulp'),
        gulpIgnore = require('gulp-ignore'),
        cleanCSS = require('gulp-clean-css'),
        gutil = require('gulp-util'),
        inject = require('gulp-inject'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        annotate = require('gulp-ng-annotate'),
        plumber = require('gulp-plumber'),
        del = require('del'),
        Server = require('karma').Server,
        folders = {
          destination: './src/dist',
          build: './src/build',
          sources: ['./src/dist/*.js'],
          src: './src/'
        },
        files = {
          html: './src/dist/*.js',
          js: ['./src/app/*.js',
                './src/app/**/*.js',
                './src/app/**/**/*.js', '!./src/app/**/*.spec.js'],
          css: './src/assets/*.css',
          minified: './src.min.js'
        }
  /**
   * Executes .spec files within
   * modules containing unit tests.
   */
  gulp.task('tdd', (done)=>{
    return new Server({
      configFile: __dirname + '/karma.conf.js'
    }, done).start()
  })
  /**
   * Cleans up concatenated file
   * after gulp-concat is executed.
   */
  gulp.task('clean', ['dist'], ()=>{
      return del([folders.build]);
  });
  /**
   * Concatenates and minifies
   * a list of source files.
   */
  gulp.task('dist', ()=>{
      return gulp.src( files.js )
              .pipe(plumber())
              .pipe(concat( folders.build + '/concat.js' ))
              .pipe(rename( files.minified ))
              .pipe(annotate())
              .pipe(uglify())
              .pipe(gulp.dest( './src/dist' ));
  });

  gulp.task('minify-css', ()=>{
    return gulp.src(files.css)
               .pipe(cleanCSS())
               .pipe(gulp.dest(folders.destination))
  });
  /**
   * Injects minified source file into html document.
   */
  gulp.task('inject-files', ['dist'], ()=>{
    let target = gulp.src('./src/index.html'),
        sources = gulp.src('./src/dist/src.min.js')

       return target.pipe(inject(sources, {relative: true}))
                    .pipe(gulp.dest('./src'))
  });
  /**
   * Injects unmified source files into html document.
   */
  gulp.task('inject-dev', ()=>{
    let target = gulp.src( './src/index.html' ),
        sources = gulp.src( files.js )

    return target.pipe(inject(sources, {relative: true}))
                 .pipe(gulp.dest('./src'))
  });

  gulp.task('production', ['dist', 'inject-files', 'clean'])

  gulp.task('default', ['watch'])

  gulp.task('watch', function () {
    gulp.watch([files.js], ['inject-dev'])
  });

})();
