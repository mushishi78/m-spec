"use strict";
exports.__esModule = true;
var tape = require("tape");
var runTest_1 = require("./runTest");
tape("runTest runs a succesful test", function (tt) {
    runTest_1.runTest({
        test: {
            group: "Addition",
            name: "adds even numbers together",
            testFn: function (t) {
                if (2 + 2 !== 4) {
                    t.error("expected even numbers to add");
                }
                t.end();
            }
        },
        onResult: function (result) {
            tt.equal(result.group, "Addition");
            tt.equal(result.name, "adds even numbers together");
            tt.deepEqual(result.errors, []);
            tt.end();
        }
    });
});
tape("runTest runs a failed test", function (tt) {
    runTest_1.runTest({
        test: {
            group: "Addition",
            name: "adds floating numbers",
            testFn: function (t) {
                if (0.1 + 0.2 !== 0.3) {
                    t.error("expected " + (0.1 + 0.2) + " to be 0.3");
                }
                t.end();
            }
        },
        onResult: function (result) {
            tt.deepEqual(result.errors, ["expected " + (0.1 + 0.2) + " to be 0.3"]);
            tt.end();
        }
    });
});
tape("runTest runs collects multiple errors", function (tt) {
    var a = 5;
    runTest_1.runTest({
        test: {
            group: "A",
            name: "is out of range",
            testFn: function (t) {
                if (a > 0) {
                    t.error("expected " + a + " to be less than 0");
                }
                if (a < 20) {
                    t.error("expected " + a + " to be greater than 20");
                }
                t.end();
            }
        },
        onResult: function (result) {
            tt.deepEqual(result.errors, [
                "expected " + a + " to be less than 0",
                "expected " + a + " to be greater than 20"
            ]);
            tt.end();
        }
    });
});
tape("runTest times out", function (tt) {
    runTest_1.runTest({
        test: {
            group: "Infinity",
            name: "is too long to wait",
            testFn: function (t) {
                if (5 < 0) {
                    t.end();
                }
            }
        },
        timeoutMs: 10,
        onResult: function (result) {
            tt.deepEqual(result.errors, ["timed out"]);
            tt.end();
        }
    });
});
tape("runTest catches synchronous errors", function (tt) {
    runTest_1.runTest({
        test: {
            group: "Panic",
            name: "divides and conquers",
            testFn: function (t) {
                throw new Error("was not expecting that");
            }
        },
        onResult: function (result) {
            tt.equal(result.errors.length, 1);
            tt.end();
        }
    });
});
