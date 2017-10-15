import * as tape from "tape";
import { tapLogger } from "./tapLogger";

tape("tapLogger prints out TAP output", tt => {
	let output = "";
	const logger = tapLogger(3, str => (output += str + "\n"));

	// Initially empty output
	tt.equal(output, "");

	// Logs first successful result with header
	logger({
		group: "Addition",
		name: "adds even numbers together",
		errors: []
	});
	tt.equal(
		output,
		`TAP version 13
1..3
ok 1 Addition - adds even numbers together
`
	);

	// Logs second failed result
	logger({
		group: "Addition",
		name: "adds floats together",
		errors: [`expected ${0.1 + 0.2} to be 0.3`]
	});
	tt.equal(
		output,
		`TAP version 13
1..3
ok 1 Addition - adds even numbers together
not ok 2 Addition - adds floats together
  ---
  errors:
    - expected ${0.1 + 0.2} to be 0.3
  ...
`
	);

	// Logs third failed result with multiple long errors
	logger({
		group: "Division",
		name: "divides by zero",
		errors: [
			`this is a really\n*really* long\nerror message`,
			"this one not so much"
		]
	});

	tt.equal(
		output,
		`TAP version 13
1..3
ok 1 Addition - adds even numbers together
not ok 2 Addition - adds floats together
  ---
  errors:
    - expected ${0.1 + 0.2} to be 0.3
  ...
not ok 3 Division - divides by zero
  ---
  errors:
    - this is a really
      *really* long
      error message
    - this one not so much
  ...
`
	);
	tt.end();
});
