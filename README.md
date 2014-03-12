gulp-plates
=========

A gulp plugin for using flatiron plates for DSL-free templating.

```
var gulp = require('gulp'),
    plates = require('gulp-plates');

gulp.task('plates', function(){
  var context = { 'prefix': "123456" };

  // plates_config is an array of mappings to perform
  // each mapping is an array of operations with each
  // operation being an array with 2 values, an operation name
  // and an operation argument.
  var plates_config = [
    [ ['where', 'src'], 
      ['has', new RegExp('scripts\/.*')], 
      ['use', function(data, value, body){ return context.prefix + '/' + value; }], 
      ['as', 'src'] 
    ] 
  ];

  // For a simple binding, omit the plates_config argument.
  // Context properties will be mapped to tag ids
  gulp.src('index.html')
    .pipe(plates( context, plates_config ))
    .pipe(gulp.dest('build'));
});
```


License
----

MIT
    