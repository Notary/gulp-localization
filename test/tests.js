var gulp = require('gulp');
var localization = require('../index');
var assert = require('stream-assert');
var should = require('should');
var path = require('path');
var fs = require('fs');
var translate = require('./inputFiles/local');
require('mocha');

var globalPath = function (input) {
	return path.join(__dirname, input);
};

describe('gulp-localization', function () {
	it('ru', function (done) {
		gulp.src(globalPath('inputFiles/test.html'))
			.pipe(localization({
				locale: 'ru',
				translate: translate
			}))
			.pipe(assert.first(function (data) {
				data.contents.toString('utf8')
					.should
					.equal(fs.readFileSync(globalPath('standards/test.html'), 'utf8'));
			}))
			.pipe(assert.end(done));
	});

	it('en', function (done) {
		gulp.src(globalPath('inputFiles/test.html'))
			.pipe(localization({
				locale: 'en',
				translate: translate
			}))
			.pipe(assert.first(function (data) {
				data.contents.toString('utf8')
					.should
					.equal(fs.readFileSync(globalPath('standards/test-en.html'), 'utf8'));
			}))
			.pipe(assert.end(done));
	});
});





