require('../cupoftea');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');

spec('set', function () {
    var set = {};

    spec('adding item', function () {
        set[0] = true;

        spec('and retrieving it', function () {
            assert.ok(set[0]);
        });

        spec('and then unsetting it', function () {
            set[0] = undefined;
            assert.ok(!set[0]);
        });
    });

    spec('can add items and enumerate items', function () {
        set[0] = true;
        set[2] = true;
        delete set[2];
        set[3] = true;

        var keys = _.keys(set);
        assert.ok(_(keys).contains('0'));
        assert.ok(_(keys).contains('3'));
        assert.equal(keys.length, 2);
    });

    spec('getting item not set', function () {
        assert.ok(!set[0]);
    });
});
