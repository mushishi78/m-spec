import { Result } from "./types";
export declare function tapLogger(plan: number, printLn: {
    (msg: string): void;
}): (result: Result) => void;
