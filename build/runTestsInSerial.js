"use strict";
exports.__esModule = true;
var runTest_1 = require("./runTest");
function runTestsInSerial(_a) {
    var tests = _a.tests, listener = _a.listener, timeoutMs = _a.timeoutMs, now = _a.now;
    function recurse(i) {
        if (!tests[i])
            return;
        runTest_1.runTest({
            test: tests[i],
            listener: function (ev) {
                listener(ev);
                if (ev.mType === "End")
                    recurse(i + 1);
            },
            timeoutMs: timeoutMs,
            now: now
        });
    }
    recurse(0);
}
exports.runTestsInSerial = runTestsInSerial;
