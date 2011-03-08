var assert = require('assert');
require('../cupoftea');

spec('queue object', function () {
    var queue = new function () {
        var queue = [];

        return {
            queue: function (item) {
                queue.push(item);
            },
            dequeue: function () {
                return queue.shift();
            },
            size: function () {
                return queue.length;
            }
        };
    };

    spec('with 4 enqueued', function () {
        queue.queue(4);

        spec('dequeues 4', function () {
            assert.equal(4, queue.dequeue());

            spec('and has size 0', function () {
                assert.equal(0, queue.size());
            });

            spec('then dequeues nothing', function () {
                assert.equal(undefined, queue.dequeue());
            });
        });

        spec('then 5 enqueued dequeues 4 then 5', function () {
            queue.queue(5);
            assert.equal(4, queue.dequeue());
            assert.equal(5, queue.dequeue());
        });

        spec('has size 1', function () {
            assert.equal(1, queue.size());
        });
    });
});
