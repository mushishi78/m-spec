"use strict";
exports.__esModule = true;
function tapLogger(plan, printLn) {
    var i = 0;
    return function (result) {
        i++;
        // Header
        if (i == 1) {
            printLn("TAP version 13");
            printLn("1.." + plan);
        }
        // ok
        if (result.errors.length === 0) {
            printLn("ok " + i + " " + result.group + " - " + result.name);
            return;
        }
        // not ok
        printLn("not ok " + i + " " + result.group + " - " + result.name);
        printLn("  ---");
        printLn("  errors:");
        for (var _i = 0, _a = result.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            printLn("    - " + error.replace(/\n/g, "\n      "));
        }
        printLn("  ...");
    };
}
exports.tapLogger = tapLogger;
