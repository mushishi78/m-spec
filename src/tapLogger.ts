import { Result } from "./types";

export function tapLogger(plan: number, printLn: { (msg: string): void }) {
	let i = 0;
	return (result: Result) => {
		i++;

		// Header
		if (i == 1) {
			printLn("TAP version 13");
			printLn(`1..${plan}`);
		}

		// ok
		if (result.errors.length === 0) {
			printLn(`ok ${i} ${result.group} - ${result.name}`);
			return;
		}

		// not ok
		printLn(`not ok ${i} ${result.group} - ${result.name}`);
		printLn(`  ---`);
		printLn(`  errors:`);
		for (const error of result.errors) {
			printLn(`    - ${error.replace(/\n/g, "\n      ")}`);
		}
		printLn(`  ...`);
	};
}
