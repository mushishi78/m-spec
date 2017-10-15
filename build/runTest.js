"use strict";
exports.__esModule = true;
function runTest(_a) {
    var test = _a.test, onResult = _a.onResult, timeoutMs = _a.timeoutMs;
    var errors = [];
    var timeoutId = setTimeout(onTimeout, timeoutMs || 10000);
    var end = doOnce(function () {
        clearTimeout(timeoutId);
        onResult({ name: test.name, group: test.group, errors: errors });
    });
    function onTimeout() {
        errors = errors.concat("timed out");
        end();
    }
    try {
        test.testFn({
            error: function (msg) { return (errors = errors.concat(msg)); },
            end: end
        });
    }
    catch (ex) {
        errors = errors.concat(ex.stack);
        end();
    }
}
exports.runTest = runTest;
function doOnce(fn) {
    var done = false;
    return function () {
        if (done)
            return;
        done = true;
        fn();
    };
}
