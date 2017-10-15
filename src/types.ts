export interface Suite {
	[group: string]: {
		[name: string]: TestFn;
	};
}

export interface Test {
	group: string;
	name: string;
	testFn: TestFn;
}

export interface TestFn {
	(t: T): void;
}

export interface T {
	error: { (msg: string): void };
	end: { (): void };
}

export interface Result {
	group: string;
	name: string;
	errors: string[];
}
