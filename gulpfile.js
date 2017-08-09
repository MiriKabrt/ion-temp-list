var gulp = require('gulp')

gulp.task('copy', function() {
  gulp
  .src(['./src/ion-temp-list.html'])
  .pipe(gulp.dest('./bundle'))
})
