"use strict";
exports.__esModule = true;
function flattenSuite(suite) {
    var tests = [];
    for (var group in suite) {
        for (var name_1 in suite[group]) {
            tests.push({ group: group, name: name_1, testFn: suite[group][name_1] });
        }
    }
    return tests;
}
exports.flattenSuite = flattenSuite;
