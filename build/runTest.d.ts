import { Test, Result } from "./types";
export declare function runTest({test, onResult, timeoutMs}: {
    test: Test;
    onResult: {
        (result: Result): void;
    };
    timeoutMs?: number;
}): void;
