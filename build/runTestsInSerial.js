"use strict";
exports.__esModule = true;
var runTest_1 = require("./runTest");
function runTestsInSerial(_a) {
    var tests = _a.tests, onResult = _a.onResult, onEnd = _a.onEnd;
    var results = [];
    function recurse(i) {
        if (!tests[i]) {
            if (onEnd)
                onEnd(results);
            return;
        }
        runTest_1.runTest({
            test: tests[i],
            onResult: function (result) {
                results = results.concat(result);
                if (onResult)
                    onResult(result);
                recurse(i + 1);
            }
        });
    }
    recurse(0);
}
exports.runTestsInSerial = runTestsInSerial;
