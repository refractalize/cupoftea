require('./cupoftea');
var assert = require('assert');

var d = function (msg) {
    //console.log(msg);
};

spec('cupoftea', function () {
    d('top');
    var x = 10;

    spec('inner_a', function () {
        d('inner a');
        assert.equal(x, 10);
        x = 20;

        spec('inner_inner_a', function () {
            d('inner inner a');
            x++;
            assert.equal(x, 21);
        });

        spec('inner_inner_b', function () {
            d('inner inner b');
            x++;
            x++;
            assert.equal(x, 22);
        });

        spec('inner b (failing)', function () {
            d('inner inner b');
            x++;
            assert.equal(x, 22);
        });
    });

    spec('inner_b', function () {
        d('inner b');
        assert.equal(x, 10);
        x = 20;
    });

    spec('should not call (failing)', function () {
        d('should not call');
        process.nextTick(shouldNotCall());
        assert.equal(x, 10);
    });

    spec("should not call and isn't", function () {
        d('should not call ---------------');
        shouldNotCall();
        assert.equal(x, 10);
    });

    spec('should call', function () {
        d('should call');
        process.nextTick(shouldCall(function () {
            d('stuff');
        }));
        assert.equal(x, 10);
    });

    spec('should call but exception thrown (failing)', function () {
        d('should call');
        process.nextTick(shouldCall(function () {
            d('stuff');
            throw new Error('exception!');
        }));
        assert.equal(x, 10);
    });

    spec("should call but isn't (failing)", function () {
        d('should call');
        shouldCall(function () {
            d('stuff');
        });
        assert.equal(x, 10);
    });
});
