const gulp = require('gulp');
const apidoc = require('gulp-apidoc');
const config = require('config');

gulp.task('apidoc', (done) => {
  apidoc(
    {
      src: './src/controller',
      dest: './apidoc',
      config: './',
      debug: config.get('apidoc.debug'),
    },
    done
  );
});

gulp.task('watch', () => gulp.watch(['./src/controller'], ['apidoc']));
