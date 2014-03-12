var gulp = require('gulp'),
    plates = require('gulp-asset-plates');

var guid = '123456';

gulp.task('build', function(){
  var context = { 'prefix': "123456" };

  var plates_config = [
    [ ['where', 'src'], 
      ['has', new RegExp('scripts\/.*')], 
      ['use', function(data, value, tag_body){ return context.prefix; }], 
      ['as', 'src'] 
    ] 
  ];

  gulp.src('src/*.html')
  	.pipe(plates( context, plates_config ))
  	.pipe(gulp.dest('build'));
});