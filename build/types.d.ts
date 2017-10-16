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
    error: {
        (msg: string): void;
    };
    end: {
        (): void;
    };
}
export interface Listener {
    (ev: Event): void;
}
export declare type Event = Register | Start | Error | End;
export interface Register {
    mType: "Register";
    tests: {
        group: string;
        name: string;
    }[];
}
export interface Start {
    mType: "Start";
    timestamp: number;
    testId: string;
    group: string;
    name: string;
}
export interface Error {
    mType: "Error";
    timestamp: number;
    testId: string;
    group: string;
    name: string;
    message: string;
}
export interface End {
    mType: "End";
    timestamp: number;
    testId: string;
    group: string;
    name: string;
}
