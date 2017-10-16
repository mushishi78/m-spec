"use strict";
exports.__esModule = true;
function runTest(args) {
    var _a = args.test, name = _a.name, group = _a.group, testFn = _a.testFn;
    var timeoutMs = args.timeoutMs == null ? 10000 : args.timeoutMs;
    var now = args.now || performance.now;
    var startNow = now();
    var id = group + "|" + name + "|" + startNow;
    var ended = false;
    var timeoutId = setTimeout(onTimeout, timeoutMs);
    // Start
    args.listener({
        mType: "Start",
        timestamp: startNow,
        testId: id,
        group: group,
        name: name
    });
    // Error
    function error(message) {
        if (ended)
            throw new Error("Error occured after test ended");
        args.listener({
            mType: "Error",
            timestamp: now(),
            testId: id,
            group: group,
            name: name,
            message: message
        });
    }
    // End
    function end() {
        if (ended)
            return;
        ended = true;
        clearTimeout(timeoutId);
        args.listener({
            mType: "End",
            timestamp: now(),
            testId: id,
            group: group,
            name: name
        });
    }
    // Timeout
    function onTimeout() {
        if (ended)
            return;
        error("timed out");
        end();
    }
    // Test with catch
    try {
        testFn({ error: error, end: end });
    }
    catch (_ex) {
        error("unexpected exception");
        end();
    }
}
exports.runTest = runTest;
