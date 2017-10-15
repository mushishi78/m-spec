import { Test, Result, T } from "./types";
import { runTest } from "./runTest";

export function runTestsInSerial({
	tests,
	onResult,
	onEnd
}: {
	tests: Test[];
	onResult?: { (result: Result): void };
	onEnd?: { (results: Result[]): void };
}) {
	let results: Result[] = [];

	function recurse(i: number) {
		if (!tests[i]) {
			if (onEnd) onEnd(results);
			return;
		}

		runTest({
			test: tests[i],
			onResult: result => {
				results = results.concat(result);
				if (onResult) onResult(result);
				recurse(i + 1);
			}
		});
	}

	recurse(0);
}
