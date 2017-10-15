(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.m = f();
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw ((f.code = "MODULE_NOT_FOUND"), f);
                }
                var l = (n[o] = { exports: {} });
                t[o][0].call(
                    l.exports,
                    function(e) {
                        var n = t[o][1][e];
                        return s(n ? n : e);
                    },
                    l,
                    l.exports,
                    e,
                    t,
                    n,
                    r
                );
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
    })(
        {
            1: [
                function(require, module, exports) {
                    "use strict";
                    exports.__esModule = true;
                    function flattenSuite(suite) {
                        var tests = [];
                        for (var group in suite) {
                            for (var name_1 in suite[group]) {
                                tests.push({
                                    group: group,
                                    name: name_1,
                                    testFn: suite[group][name_1]
                                });
                            }
                        }
                        return tests;
                    }
                    exports.flattenSuite = flattenSuite;
                },
                {}
            ],
            2: [
                function(require, module, exports) {
                    "use strict";
                    exports.__esModule = true;
                    var flattenSuite_1 = require("./flattenSuite");
                    exports.flattenSuite = flattenSuite_1.flattenSuite;
                    var runTest_1 = require("./runTest");
                    exports.runTest = runTest_1.runTest;
                    var runTestsInSerial_1 = require("./runTestsInSerial");
                    exports.runTestsInSerial =
                        runTestsInSerial_1.runTestsInSerial;
                    var tapLogger_1 = require("./tapLogger");
                    exports.tapLogger = tapLogger_1.tapLogger;
                },
                {
                    "./flattenSuite": 1,
                    "./runTest": 3,
                    "./runTestsInSerial": 4,
                    "./tapLogger": 5
                }
            ],
            3: [
                function(require, module, exports) {
                    "use strict";
                    exports.__esModule = true;
                    function runTest(_a) {
                        var test = _a.test,
                            onResult = _a.onResult,
                            timeoutMs = _a.timeoutMs;
                        var errors = [];
                        var timeoutId = setTimeout(
                            onTimeout,
                            timeoutMs || 10000
                        );
                        var end = doOnce(function() {
                            clearTimeout(timeoutId);
                            onResult({
                                name: test.name,
                                group: test.group,
                                errors: errors
                            });
                        });
                        function onTimeout() {
                            errors = errors.concat("timed out");
                            end();
                        }
                        try {
                            test.testFn({
                                error: function(msg) {
                                    return (errors = errors.concat(msg));
                                },
                                end: end
                            });
                        } catch (ex) {
                            errors = errors.concat(ex.stack);
                            end();
                        }
                    }
                    exports.runTest = runTest;
                    function doOnce(fn) {
                        var done = false;
                        return function() {
                            if (done) return;
                            done = true;
                            fn();
                        };
                    }
                },
                {}
            ],
            4: [
                function(require, module, exports) {
                    "use strict";
                    exports.__esModule = true;
                    var runTest_1 = require("./runTest");
                    function runTestsInSerial(_a) {
                        var tests = _a.tests,
                            onResult = _a.onResult,
                            onEnd = _a.onEnd;
                        var results = [];
                        function recurse(i) {
                            if (!tests[i]) {
                                if (onEnd) onEnd(results);
                                return;
                            }
                            runTest_1.runTest({
                                test: tests[i],
                                onResult: function(result) {
                                    results = results.concat(result);
                                    if (onResult) onResult(result);
                                    recurse(i + 1);
                                }
                            });
                        }
                        recurse(0);
                    }
                    exports.runTestsInSerial = runTestsInSerial;
                },
                { "./runTest": 3 }
            ],
            5: [
                function(require, module, exports) {
                    "use strict";
                    exports.__esModule = true;
                    function tapLogger(plan, printLn) {
                        var i = 0;
                        return function(result) {
                            i++;
                            // Header
                            if (i == 1) {
                                printLn("TAP version 13");
                                printLn("1.." + plan);
                            }
                            // ok
                            if (result.errors.length === 0) {
                                printLn(
                                    "ok " +
                                        i +
                                        " " +
                                        result.group +
                                        " - " +
                                        result.name
                                );
                                return;
                            }
                            // not ok
                            printLn(
                                "not ok " +
                                    i +
                                    " " +
                                    result.group +
                                    " - " +
                                    result.name
                            );
                            printLn("  ---");
                            printLn("  errors:");
                            for (
                                var _i = 0, _a = result.errors;
                                _i < _a.length;
                                _i++
                            ) {
                                var error = _a[_i];
                                printLn(
                                    "    - " + error.replace(/\n/g, "\n      ")
                                );
                            }
                            printLn("  ...");
                        };
                    }
                    exports.tapLogger = tapLogger;
                },
                {}
            ]
        },
        {},
        [2]
    )(2);
});
