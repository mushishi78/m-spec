# m-spec

Simple, transparent testing tool for javascript.

## Usage

```javascript
import * as m from "m-spec";

// Create a global dictionary to hold tests in

export let testSuite = {};

// Add tests to dictionary per subgroup

testSuite["GroupA"] = {};

testSuite["GroupA"]["description of the test"] = t => {
	if (0 == "") {
		t.error("that can't be true");
	}

	if (0 == "0") {
		t.error("this is weird");
	}

	t.end();
};

testSuite["GroupA"]["some other really important test"] = t => {
	if (0 === "") {
		t.error("this would be really concerning");
	}

	t.end();
};

// Create an output listener

function listener(ev) {
	switch(ev.mType) {
		"Register":
			console.log(`Registerd: ${ev.group} ${ev.name}`);
			break;

		"Start":
			console.log(`Started: ${ev.group} ${ev.name} ${ev.timestamp}ms`);
			break;

		"Error":
			console.log(`Error: ${ev.group} ${ev.name} ${ev.timestamp}ms`);
			console.error(ev.message);
			break;

		"End":
			console.log(`End: ${ev.group} ${ev.name} ${ev.timestamp})ms`);
			break;

		default:
			throw new Error("Unrecognized m-spec event");
	}
}

// Flatten suite to array of tests

const tests = m.flattenSuite(testSuite);

// Register tests with listeners

m.registerTests({ tests, listener });

// Run single test

m.runTest({ test: tests[0], listener })

// Run tests serially

m.runTestsInSerial({ tests, listener });

// Run tests in parallel

m.runTestsInParallel({ tests, listener });
```
