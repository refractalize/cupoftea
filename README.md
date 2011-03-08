# Cup of tea?

Asynchronous unit testing for node.js

## requiring

    require('upoftea');

And you'll want to `require` an assertion module too, eg:

    var assert = require('assert');

## running

    node my_test_file.js

No command line tool as yet, but soon...

## specs

Specs have a description and a definition:

    spec('integer addition', function () {
        assert.equal(5, 1 + 4);
    });

Produces: `integer addition OK`

Specs can be nested:

    spec('integer', function () {
        var int = 5;

        spec('addition', function () {
            assert.equal(8, int + 3);
        });

        spec('subtraction', function () {
            assert.equal(3, int - 2);
        });
    });

Produces:

    integer addition OK
    integer subtraction OK

So as you can see, each nested spec produces a different test result. Which means that the first `spec('integer',...` is the "setup" that you'll find in most unit testing frameworks. The "teardown" is anything that you run after your spec. Each inner most spec produces its own test result, and is run in isolation from any other spec - leaving you to reuse setups across several tests, like this:

    var assert = require('assert');
    require('cupoftea');

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

## handling asynchronicity: shouldCall and shouldNotCall

Asynchronous callbacks can also tested with `shouldCall` and `shouldNotCall`. To test that a callback was called, with further assertions in the callback, use `shouldCall`. For callbacks that you _don't_ want to be called back, use `shouldNotCall`.

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
