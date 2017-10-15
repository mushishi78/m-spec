import * as tape from "tape";
import { runTestsInSerial } from "./runTestsInSerial";

tape("runTestsInSerial runs multiple tests serially", tt => {
	runTestsInSerial({
		tests: [
			{
				group: "Addition",
				name: "adds even numbers together",
				testFn: t => {
					if (2 + 2 === 4) {
						t.error("expected even numbers to add to odd number");
					}
					t.end();
				}
			},
			{
				group: "Addition",
				name: "adds odd numbers together",
				testFn: t => {
					if (1 + 1 === 2) {
						t.error("expected odd numbers to add to odd number");
					}
					t.end();
				}
			}
		],
		onEnd: results => {
			tt.deepEqual(results, [
				{
					group: "Addition",
					name: "adds even numbers together",
					errors: ["expected even numbers to add to odd number"]
				},
				{
					group: "Addition",
					name: "adds odd numbers together",
					errors: ["expected odd numbers to add to odd number"]
				}
			]);
			tt.end();
		}
	});
});
