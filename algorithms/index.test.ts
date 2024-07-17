import { describe, expect, test } from "@jest/globals";
import * as backtracking from './backtracking';

describe('Backtracking', () => {
    test('Sample test', () => {
        const input = [1, 2, 3];
        const expectedOutput = [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1]
        ];
        const output = backtracking.algorithm(input);
        // const output = [
        //     [3, 2, 1],
        //     [3, 1, 2],
        //     [2, 3, 1],
        //     [2, 1, 3],
        //     [1, 3, 2],
        //     [1, 2, 3]
        // ];
        expect(expectedOutput.length).toEqual(output.length);
        expect(expectedOutput).toEqual(expect.arrayContaining(output));
        expect(output).toEqual(expect.arrayContaining(expectedOutput));
    })
})