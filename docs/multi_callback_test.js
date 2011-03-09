require('../cupoftea');
var fs = require('fs');
var assert = require('assert');

spec('multiple callbacks', function () {
    var i = 1;
    setInterval(shouldCall(function () {
        console.log('first');
    }), 100);

    setTimeout(shouldCall(function () {
        console.log('second');
    }), 1000);
});
