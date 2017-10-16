"use strict";
exports.__esModule = true;
var runTest_1 = require("./runTest");
function runTestsInParallel(_a) {
    var tests = _a.tests, listener = _a.listener, timeoutMs = _a.timeoutMs, now = _a.now;
    for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
        var test = tests_1[_i];
        runTest_1.runTest({ test: test, listener: listener, timeoutMs: timeoutMs, now: now });
    }
}
exports.runTestsInParallel = runTestsInParallel;
