import { Test, Listener } from "./types";

export function runTest(args: {
	test: Test;
	listener: Listener;
	timeoutMs?: number;
	now?: { (): number };
}) {
	const { name, group, testFn } = args.test;
	const timeoutMs = args.timeoutMs == null ? 10000 : args.timeoutMs;
	const now = args.now || performance.now;
	const startNow = now();
	const id = `${group}|${name}|${startNow}`;
	let ended = false;
	let timeoutId = setTimeout(onTimeout, timeoutMs);

	// Start
	args.listener({
		mType: "Start",
		timestamp: startNow,
		testId: id,
		group,
		name
	});

	// Error
	function error(message: string) {
		if (ended) throw new Error("Error occured after test ended");

		args.listener({
			mType: "Error",
			timestamp: now(),
			testId: id,
			group,
			name,
			message
		});
	}

	// End
	function end() {
		if (ended) return;
		ended = true;

		clearTimeout(timeoutId);

		args.listener({
			mType: "End",
			timestamp: now(),
			testId: id,
			group,
			name
		});
	}

	// Timeout
	function onTimeout() {
		if (ended) return;
		error("timed out");
		end();
	}

	// Test with catch
	try {
		testFn({ error, end });
	} catch (_ex) {
		error("unexpected exception");
		end();
	}
}
