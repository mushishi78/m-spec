import { Test, Result, T } from "./types";

export function runTest({
	test,
	onResult,
	timeoutMs
}: {
	test: Test;
	onResult: { (result: Result): void };
	timeoutMs?: number;
}) {
	let errors: string[] = [];
	let timeoutId = setTimeout(onTimeout, timeoutMs || 10000);

	const end = doOnce(() => {
		clearTimeout(timeoutId);
		onResult({ name: test.name, group: test.group, errors });
	});

	function onTimeout() {
		errors = errors.concat("timed out");
		end();
	}

	try {
		test.testFn({
			error: msg => (errors = errors.concat(msg)),
			end
		});
	} catch (ex) {
		errors = errors.concat(ex.stack);
		end();
	}
}

function doOnce(fn: { (): void }) {
	let done = false;

	return () => {
		if (done) return;
		done = true;
		fn();
	};
}
