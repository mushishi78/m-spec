"use strict";
exports.__esModule = true;
var tape = require("tape");
var runTestsInParallel_1 = require("./runTestsInParallel");
var incrementer_test_1 = require("./incrementer.test");
tape("runTestsInParallel runs multiple tests in parrallel", function (tt) {
    var events = [];
    runTestsInParallel_1.runTestsInParallel({
        tests: [
            {
                group: "Addition",
                name: "adds even numbers together",
                testFn: function (t) {
                    setTimeout(onTimeout, 5);
                    function onTimeout() {
                        if (2 + 2 === 4) {
                            t.error("expected even numbers to add to odd number");
                        }
                        t.end();
                    }
                }
            },
            {
                group: "Addition",
                name: "adds odd numbers together",
                testFn: function (t) {
                    setTimeout(onTimeout, 2);
                    function onTimeout() {
                        if (1 + 1 === 2) {
                            t.error("expected odd numbers to add to odd number");
                        }
                        t.end();
                    }
                }
            }
        ],
        now: incrementer_test_1.incrementer(25),
        listener: function (ev) {
            events.push(ev);
            if (events.length !== 6)
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 26,
                    testId: "Addition|adds even numbers together|26",
                    group: "Addition",
                    name: "adds even numbers together"
                },
                {
                    mType: "Start",
                    timestamp: 27,
                    testId: "Addition|adds odd numbers together|27",
                    group: "Addition",
                    name: "adds odd numbers together"
                },
                {
                    mType: "Error",
                    timestamp: 28,
                    testId: "Addition|adds odd numbers together|27",
                    group: "Addition",
                    name: "adds odd numbers together",
                    message: "expected odd numbers to add to odd number"
                },
                {
                    mType: "End",
                    timestamp: 29,
                    testId: "Addition|adds odd numbers together|27",
                    group: "Addition",
                    name: "adds odd numbers together"
                },
                {
                    mType: "Error",
                    timestamp: 30,
                    testId: "Addition|adds even numbers together|26",
                    group: "Addition",
                    name: "adds even numbers together",
                    message: "expected even numbers to add to odd number"
                },
                {
                    mType: "End",
                    timestamp: 31,
                    testId: "Addition|adds even numbers together|26",
                    group: "Addition",
                    name: "adds even numbers together"
                }
            ]);
            tt.end();
        }
    });
});
