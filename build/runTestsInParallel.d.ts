import { Test, Listener } from "./types";
export declare function runTestsInParallel({tests, listener, timeoutMs, now}: {
    tests: Test[];
    listener: Listener;
    timeoutMs?: number;
    now?: {
        (): number;
    };
}): void;
