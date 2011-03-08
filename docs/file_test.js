require('../cupoftea');
var fs = require('fs');
var assert = require('assert');

spec('filecontents', function () {
    fs.readFile('interzone.txt', 'utf-8', shouldCall(function (err, contents) {
        assert.equal(contents, 'Panorama of the City of Interzone. Opening bars of East St. Louis Toodleoo.\n');
    }));
});

spec('reading file', function () {
    var interzone = fs.createReadStream('interzone.txt', {encoding: 'utf-8'});

    var content = '';

    interzone.on('data', function (chunk) {
        content += chunk;
    });

    interzone.on('end', shouldCall(function () {
        assert.equal(content, 'Panorama of the City of Interzone. Opening bars of East St. Louis Toodleoo.\n');
    }));

    interzone.on('error', shouldNotCall());
});
