import { Test, Result } from "./types";
export declare function runTestsInParallel({tests, onResult, onEnd}: {
    tests: Test[];
    onResult?: {
        (result: Result): void;
    };
    onEnd?: {
        (results: Result[]): void;
    };
}): void;
