# m-spec

Simple, transparent testing tool for javascript.

## Usage

```javascript
import * as m from "m-spec";

// Create a global dictionary to hold tests in
export let testSuite = {};

// Add tests to dictionary per subgroup
testSuite["GroupA"] = {
	"description of the test": t => {
		if (0 == "") {
			t.error("that can't be true");
		}

		if (0 == "0") {
			t.error("this is weird");
		}

		t.end();
	},
	"some other really important test": t => {
		if (0 === "") {
			t.error("this would be really concerning");
		}

		t.end();
	}
};

// Flatten suite to array of tests
const tests = m.flattenSuite(testSuite);

// Run the tests serially
m.runTestsInSerial({
	tests,
	onResult: r => console.log(r.errors.length === 0 ? "." : "x"),
	onDone: rs => {
		console.log(`${rs.length} tests completed`);

		for (const r of rs) {
			if (r.errors.length === 0) continue;
			console.error(`### ${r.group} - ${r.name}\n${r.errors.join("\n")}`);
		}
	}
});


// Run the tests and output TAP
const tapLogger = m.tapLogger(tests.length, console.log);
m.runTestsInSerial({ tests, onResult: tapLogger });

/*
TAP version 13
1..2
not ok 1 GroupA - description of the test
  ---
  errors:
    - that can't be true
    - this is weird
  ...
ok 2 GroupA - some other really important test
*/

// Run the tests in parallel
m.runTestsInParallel({ tests, onResult: tapLogger });

```
