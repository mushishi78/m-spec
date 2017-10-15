import { Test, Result, T } from "./types";
import { runTest } from "./runTest";

export function runTestsInParallel({
	tests,
	onResult,
	onEnd
}: {
	tests: Test[];
	onResult?: { (result: Result): void };
	onEnd?: { (results: Result[]): void };
}) {
	let results: Result[] = [];

	for (const test of tests) {
		runTest({
			test,
			onResult: result => {
				results = results.concat(result);
				if (onResult) onResult(result);
				if (onEnd && results.length === tests.length) onEnd(results);
			}
		});
	}
}
