var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');  // 文件重命名
var rev = require('gulp-rev');   // 更改版本号
var revCollector = require('gulp-rev-collector');   //用户html模板更改引用路径
var merge = require('merge-stream');
var scsslint = require('gulp-scss-lint');
var cache = require('gulp-cached');

gulp.task('scss-lint', function () {
  return gulp.src('src/**/*.scss')
    .pipe(scsslint({
      'config': '.scss-lint.yml'
    }));
});


gulp.task('watch', function () {
  gulp.watch(['src/**/*.scss'], ['scss-lint']);
  gulp.watch(['src/index.html'], ['copy']);
});

gulp.task('clean', function () {
  return gulp.src('public')
    .pipe(clean());
});

// 复制文件
gulp.task('copy', function () {
  return merge(
    gulp.src('src/index.html')
      .pipe(gulp.dest('public')),
    gulp.src(['src/mixin/*.png', 'src/mixin/*.ttf', 'src/mixin/*.otf', 'src/mixin/*.wav'])
      .pipe(gulp.dest('public')),
    gulp.src([
        'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
        'node_modules/react/dist/react.js',
        'node_modules/react/dist/react-with-addons.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/react-router/umd/ReactRouter.js',
        'node_modules/history/umd/History.js',
        'node_modules/babel-polyfill/dist/polyfill.js',
        'node_modules/redux/dist/redux.js',
        'node_modules/react-redux/dist/react-redux.js'
      ])
      .pipe(gulp.dest('public'))
  );
});


gulp.task('default', ['copy', 'scss-lint']);
