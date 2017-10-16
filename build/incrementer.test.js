"use strict";
exports.__esModule = true;
function incrementer(i) {
    return function () {
        i++;
        return i;
    };
}
exports.incrementer = incrementer;
