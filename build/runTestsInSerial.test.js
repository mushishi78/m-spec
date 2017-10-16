"use strict";
exports.__esModule = true;
var tape = require("tape");
var runTestsInSerial_1 = require("./runTestsInSerial");
var incrementer_test_1 = require("./incrementer.test");
tape("runTestsInSerial runs multiple tests serially", function (tt) {
    var events = [];
    runTestsInSerial_1.runTestsInSerial({
        tests: [
            {
                group: "Addition",
                name: "adds even numbers together",
                testFn: function (t) {
                    if (2 + 2 === 4) {
                        t.error("expected even numbers to add to odd number");
                    }
                    t.end();
                }
            },
            {
                group: "Addition",
                name: "adds odd numbers together",
                testFn: function (t) {
                    if (1 + 1 === 2) {
                        t.error("expected odd numbers to add to odd number");
                    }
                    t.end();
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
                    mType: "Error",
                    timestamp: 27,
                    testId: "Addition|adds even numbers together|26",
                    group: "Addition",
                    name: "adds even numbers together",
                    message: "expected even numbers to add to odd number"
                },
                {
                    mType: "End",
                    timestamp: 28,
                    testId: "Addition|adds even numbers together|26",
                    group: "Addition",
                    name: "adds even numbers together"
                },
                {
                    mType: "Start",
                    timestamp: 29,
                    testId: "Addition|adds odd numbers together|29",
                    group: "Addition",
                    name: "adds odd numbers together"
                },
                {
                    mType: "Error",
                    timestamp: 30,
                    testId: "Addition|adds odd numbers together|29",
                    group: "Addition",
                    name: "adds odd numbers together",
                    message: "expected odd numbers to add to odd number"
                },
                {
                    mType: "End",
                    timestamp: 31,
                    testId: "Addition|adds odd numbers together|29",
                    group: "Addition",
                    name: "adds odd numbers together"
                }
            ]);
            tt.end();
        }
    });
});
