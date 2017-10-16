"use strict";
exports.__esModule = true;
var tape = require("tape");
var runTest_1 = require("./runTest");
var incrementer_test_1 = require("./incrementer.test");
tape("runTest runs a succesful test", function (tt) {
    var events = [];
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
        now: incrementer_test_1.incrementer(78),
        listener: function (ev) {
            events.push(ev);
            if (ev.mType !== "End")
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 79,
                    testId: "Addition|adds even numbers together|79",
                    group: "Addition",
                    name: "adds even numbers together"
                },
                {
                    mType: "End",
                    timestamp: 80,
                    testId: "Addition|adds even numbers together|79",
                    group: "Addition",
                    name: "adds even numbers together"
                }
            ]);
            tt.end();
        }
    });
});
tape("runTest runs a failed test", function (tt) {
    var events = [];
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
        now: incrementer_test_1.incrementer(34),
        listener: function (ev) {
            events.push(ev);
            if (ev.mType !== "End")
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 35,
                    testId: "Addition|adds floating numbers|35",
                    group: "Addition",
                    name: "adds floating numbers"
                },
                {
                    mType: "Error",
                    timestamp: 36,
                    testId: "Addition|adds floating numbers|35",
                    group: "Addition",
                    name: "adds floating numbers",
                    message: "expected " + (0.1 + 0.2) + " to be 0.3"
                },
                {
                    mType: "End",
                    timestamp: 37,
                    testId: "Addition|adds floating numbers|35",
                    group: "Addition",
                    name: "adds floating numbers"
                }
            ]);
            tt.end();
        }
    });
});
tape("runTest runs collects multiple errors", function (tt) {
    var events = [];
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
        now: incrementer_test_1.incrementer(97),
        listener: function (ev) {
            events.push(ev);
            if (ev.mType !== "End")
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 98,
                    testId: "A|is out of range|98",
                    group: "A",
                    name: "is out of range"
                },
                {
                    mType: "Error",
                    timestamp: 99,
                    testId: "A|is out of range|98",
                    group: "A",
                    name: "is out of range",
                    message: "expected " + a + " to be less than 0"
                },
                {
                    mType: "Error",
                    timestamp: 100,
                    testId: "A|is out of range|98",
                    group: "A",
                    name: "is out of range",
                    message: "expected " + a + " to be greater than 20"
                },
                {
                    mType: "End",
                    timestamp: 101,
                    testId: "A|is out of range|98",
                    group: "A",
                    name: "is out of range"
                }
            ]);
            tt.end();
        }
    });
});
tape("runTest times out", function (tt) {
    var events = [];
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
        now: incrementer_test_1.incrementer(167),
        listener: function (ev) {
            events.push(ev);
            if (ev.mType !== "End")
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 168,
                    testId: "Infinity|is too long to wait|168",
                    group: "Infinity",
                    name: "is too long to wait"
                },
                {
                    mType: "Error",
                    timestamp: 169,
                    testId: "Infinity|is too long to wait|168",
                    group: "Infinity",
                    name: "is too long to wait",
                    message: "timed out"
                },
                {
                    mType: "End",
                    timestamp: 170,
                    testId: "Infinity|is too long to wait|168",
                    group: "Infinity",
                    name: "is too long to wait"
                }
            ]);
            tt.end();
        }
    });
});
tape("runTest catches synchronous errors", function (tt) {
    var events = [];
    runTest_1.runTest({
        test: {
            group: "Panic",
            name: "divides and conquers",
            testFn: function (t) {
                throw new Error("was not expecting that");
            }
        },
        now: incrementer_test_1.incrementer(347),
        listener: function (ev) {
            events.push(ev);
            if (ev.mType !== "End")
                return;
            tt.deepEqual(events, [
                {
                    mType: "Start",
                    timestamp: 348,
                    testId: "Panic|divides and conquers|348",
                    group: "Panic",
                    name: "divides and conquers"
                },
                {
                    mType: "Error",
                    timestamp: 349,
                    testId: "Panic|divides and conquers|348",
                    group: "Panic",
                    name: "divides and conquers",
                    message: "unexpected exception"
                },
                {
                    mType: "End",
                    timestamp: 350,
                    testId: "Panic|divides and conquers|348",
                    group: "Panic",
                    name: "divides and conquers"
                }
            ]);
            tt.end();
        }
    });
});
