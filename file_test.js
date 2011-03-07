require('./cupoftea');
var fs = require('fs');
var assert = require('assert');

spec('filecontents', function () {
    fs.readFile('cupoftea.js', shouldCall(function (err, contents) {
        assert.equal(contents.toString('utf-8', 0, 10), 'var _ = req');
    }));
});
