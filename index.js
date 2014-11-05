'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var hbs = require('handlebars');

var PLUGIN_NAME = 'gulp-localization';

/**
 *
 * @params {Object} options
 *         {string} options.locale
 *         {Object} options.translate,
 *         {string} [options.helperName=_t]
 *         {?Function} options.helper
 * @returns {*}
 */
module.exports = function (options) {
	var locale = options.locale;
	var translate = options.translate;

	var fnHelperDefault = function (binding) {
		binding = binding.replace(/\s+/g, ' ').trim(); // if you break lines
		var trans = translate[binding];
		return (trans && trans[locale]) || binding;
	};

	var helperName = options.helperName || '_t';
	var helper = (options.helper) || fnHelperDefault;

	return through.obj(function(file, enc, next) {
		if(file.isNull()) {
			return callback(null, file);
		}

		if(file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return callback();
		}

		var contents = file.contents.toString('utf8');

		hbs.registerHelper(helperName, helper);
		var template = hbs.compile(contents);
		var result = template();

		file.contents = new Buffer(result);

		return next(null, file);
	});
};