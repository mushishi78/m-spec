"use strict";
exports.__esModule = true;
var tape = require("tape");
var tapLogger_1 = require("./tapLogger");
tape("tapLogger prints out TAP output", function (tt) {
    var output = "";
    var logger = tapLogger_1.tapLogger(3, function (str) { return (output += str + "\n"); });
    // Initially empty output
    tt.equal(output, "");
    // Logs first successful result with header
    logger({
        group: "Addition",
        name: "adds even numbers together",
        errors: []
    });
    tt.equal(output, "TAP version 13\n1..3\nok 1 Addition - adds even numbers together\n");
    // Logs second failed result
    logger({
        group: "Addition",
        name: "adds floats together",
        errors: ["expected " + (0.1 + 0.2) + " to be 0.3"]
    });
    tt.equal(output, "TAP version 13\n1..3\nok 1 Addition - adds even numbers together\nnot ok 2 Addition - adds floats together\n  ---\n  errors:\n    - expected " + (0.1 + 0.2) + " to be 0.3\n  ...\n");
    // Logs third failed result with multiple long errors
    logger({
        group: "Division",
        name: "divides by zero",
        errors: [
            "this is a really\n*really* long\nerror message",
            "this one not so much"
        ]
    });
    tt.equal(output, "TAP version 13\n1..3\nok 1 Addition - adds even numbers together\nnot ok 2 Addition - adds floats together\n  ---\n  errors:\n    - expected " + (0.1 + 0.2) + " to be 0.3\n  ...\nnot ok 3 Division - divides by zero\n  ---\n  errors:\n    - this is a really\n      *really* long\n      error message\n    - this one not so much\n  ...\n");
    tt.end();
});
