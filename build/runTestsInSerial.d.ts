import { Test, Listener } from "./types";
export declare function runTestsInSerial({tests, listener, timeoutMs, now}: {
    tests: Test[];
    listener: Listener;
    timeoutMs?: number;
    now?: {
        (): number;
    };
}): void;
