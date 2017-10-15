"use strict";
exports.__esModule = true;
var runTest_1 = require("./runTest");
function runTestsInParallel(_a) {
    var tests = _a.tests, onResult = _a.onResult, onEnd = _a.onEnd;
    var results = [];
    for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
        var test = tests_1[_i];
        runTest_1.runTest({
            test: test,
            onResult: function (result) {
                results = results.concat(result);
                if (onResult)
                    onResult(result);
                if (onEnd && results.length === tests.length)
                    onEnd(results);
            }
        });
    }
}
exports.runTestsInParallel = runTestsInParallel;
