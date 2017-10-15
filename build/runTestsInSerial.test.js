"use strict";
exports.__esModule = true;
var tape = require("tape");
var runTestsInSerial_1 = require("./runTestsInSerial");
tape("runTestsInSerial runs multiple tests serially", function (tt) {
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
        onEnd: function (results) {
            tt.deepEqual(results, [
                {
                    group: "Addition",
                    name: "adds even numbers together",
                    errors: ["expected even numbers to add to odd number"]
                },
                {
                    group: "Addition",
                    name: "adds odd numbers together",
                    errors: ["expected odd numbers to add to odd number"]
                }
            ]);
            tt.end();
        }
    });
});
