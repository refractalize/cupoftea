require('../cupoftea');
var assert = require('assert');

spec('integer', function () {
    var int = 5;

    spec('addition', function () {
        assert.equal(8, int + 3);
    });

    spec('subtraction', function () {
        assert.equal(3, int - 2);
    });
});
