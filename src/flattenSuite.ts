import { Suite, Test } from "./types";

export function flattenSuite(suite: Suite) {
	let tests: Test[] = [];

	for (const group in suite) {
		for (const name in suite[group]) {
			tests.push({ group, name, testFn: suite[group][name] });
		}
	}

	return tests;
}
