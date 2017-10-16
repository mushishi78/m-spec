import { Test, Listener } from "./types";
import { runTest } from "./runTest";

export function runTestsInParallel({
	tests,
	listener,
	timeoutMs,
	now
}: {
	tests: Test[];
	listener: Listener;
	timeoutMs?: number;
	now?: { (): number };
}) {
	for (const test of tests) {
		runTest({ test, listener, timeoutMs, now });
	}
}
