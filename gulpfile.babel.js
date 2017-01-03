'use strict';

import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpChanged from 'gulp-changed';
import gulpEslint from 'gulp-eslint';
import gulpSequence from 'gulp-sequence';
import gulpUtil from 'gulp-util';
import rimraf from 'rimraf';
import through from 'through';

// Paths
const pathApp = [
  './src/**/*.js'
];
const pathJS = ['./*.js', ...pathApp];

// Functions
const count = (taskName) => {
  let fileCount = 0;

  function countFiles() {
    fileCount += 1;
  }

  function endStream() {
    gulpUtil.log(`${gulpUtil.colors.cyan(`${taskName}: `)} ${fileCount} files processed.`);
    this.emit('end');
  }

  return through(countFiles, endStream);
};

const remove = (glob) => {
  return new Promise((resolve, reject) => {
    rimraf('dist', (err) => {
      if (err) {
        gulpUtil.log(`${gulpUtil.colors.red('Rimraf: ')} ${glob} can't be deleted`);

        return reject(err);
      }

      gulpUtil.log(`${gulpUtil.colors.cyan('Rimraf: ')} ${glob}`);
      return resolve();
    });
  });
};

gulp.task('babelAll', () => {
  remove('dist').then(() => {
    return gulp.src(pathApp)
      .pipe(gulpBabel())
      .on('error', (err) => {
        gulpUtil.log(gulpUtil.colors.red(err));
      })
      .pipe(gulp.dest('dist'))
      .pipe(count('Babel'));
  });
});

gulp.task('babel', () => {
  return gulp.src(pathApp)
    .pipe(gulpChanged('dist'))
    .pipe(gulpBabel())
    .on('error', (err) => {
      gulpUtil.log(gulpUtil.colors.red(err));
    })
    .pipe(gulp.dest('dist'))
    .pipe(count('Babel'));
});

gulp.task('eslint', () => {
  return gulp.src(pathJS)
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(count('Eslint'));
});

gulp.task('watch', () => {
  gulp.watch(pathJS, ['eslint']);
  gulp.watch(pathApp, ['babel']);
});

// Default tasks
const defaultTasks = gulpSequence(['eslint', 'babelAll'], 'watch');

gulp.task('build', ['babelAll']);
gulp.task('default', defaultTasks);
