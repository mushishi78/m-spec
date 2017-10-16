import * as tape from "tape";
import { Event } from "./types";
import { runTestsInSerial } from "./runTestsInSerial";
import { incrementer } from "./incrementer.test";

tape("runTestsInSerial runs multiple tests serially", tt => {
	let events: Event[] = [];

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
		now: incrementer(25),
		listener: ev => {
			events.push(ev);
			if (events.length !== 6) return;

			tt.deepEqual(events, [
				{
					mType: "Start",
					timestamp: 26,
					testId: "Addition|adds even numbers together|26",
					group: "Addition",
					name: "adds even numbers together"
				},
				{
					mType: "Error",
					timestamp: 27,
					testId: "Addition|adds even numbers together|26",
					group: "Addition",
					name: "adds even numbers together",
					message: "expected even numbers to add to odd number"
				},
				{
					mType: "End",
					timestamp: 28,
					testId: "Addition|adds even numbers together|26",
					group: "Addition",
					name: "adds even numbers together"
				},
				{
					mType: "Start",
					timestamp: 29,
					testId: "Addition|adds odd numbers together|29",
					group: "Addition",
					name: "adds odd numbers together"
				},
				{
					mType: "Error",
					timestamp: 30,
					testId: "Addition|adds odd numbers together|29",
					group: "Addition",
					name: "adds odd numbers together",
					message: "expected odd numbers to add to odd number"
				},
				{
					mType: "End",
					timestamp: 31,
					testId: "Addition|adds odd numbers together|29",
					group: "Addition",
					name: "adds odd numbers together"
				}
			]);
			tt.end();
		}
	});
});
