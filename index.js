'use strict';
var through = require('through2'),
    plates = require('plates');

module.exports = function(context, args) {

	var methods = {
		'where': function(a, b){ return a.where(b); },
		'class':  function(a, b){ return a.class(b); },
		'className':  function(a, b){ return a.className(b); },
		'is':  function(a, b){ return a.is(b); },
		'has':  function(a, b){ return a.has(b); },
		'insert':  function(a, b){ return a.insert(b); },
		'use':  function(a, b){ return a.use(b); },
		'to':  function(a, b){ return a.to(b); },
		'as':  function(a, b){ return a.as(b); },
		'remove':  function(a, b){ return a.remove(b); },
		'append':  function(a, b){ return a.append(b); },
		'partial':  function(a, b){ return a.partial(b); }
	};

	// create a stream through which each file will pass
	return through.obj(function(file, enc, callback) {

		if (file.isNull()) {
			this.push(file);
			// do nothing if no contents
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-plates', 'Streaming not supported'));
			return callback();
		}

		if (file.isBuffer()) {

			var text = String(file.contents);

			if (!args) {
				text = plates.bind(text, context);
			} else {
				// Parse each mapping
				for (var a in args) {
					var map = plates.Map();

					// Parse each argument
					for (var b in args[a]) {
						map = methods[args[a][b][0]](map, args[a][b][1]);
					}

					text = plates.bind(text, context, map)
				}
			}

			file.contents = new Buffer(text);

			return callback(null, file);
		}
	});
}; 