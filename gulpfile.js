var gulp = require('gulp'),
    plates = require('gulp-asset-plates');

var guid = '123456';

gulp.task('build', function(){
  gulp.src('src/*.html')
  	.pipe(plates( guid, [{
  		attr: 'src',
  		selector: /scripts\/.*/
  	},{
  		attr: 'href',
  		selector: /stylesheets\/.*/
  	}] ))
  	.pipe(gulp.dest('build'))
});