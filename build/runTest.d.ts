import { Test, Listener } from "./types";
export declare function runTest(args: {
    test: Test;
    listener: Listener;
    timeoutMs?: number;
    now?: {
        (): number;
    };
}): void;
