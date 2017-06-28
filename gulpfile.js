const gulp = require('gulp');
// const babel = require('gulp-babel');
const exec = require('child_process').exec;

gulp.task('default', () => exec('yarn start'));
gulp.watch('src/**/*.js', ['default']);
