import { Test, Listener } from "./types";
import { runTest } from "./runTest";

export function runTestsInSerial({
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
	function recurse(i: number) {
		if (!tests[i]) return;

		runTest({
			test: tests[i],
			listener: ev => {
				listener(ev);
				if (ev.mType === "End") recurse(i + 1);
			},
			timeoutMs,
			now
		});
	}

	recurse(0);
}
