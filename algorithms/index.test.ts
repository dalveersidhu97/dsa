import { describe, expect, test } from "@jest/globals";
import * as backtracking from './backtracking';

describe('Backtracking', () => {
    const input = [1, 2, 3];
    const expectedOutput = [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
    ];

    test('Test recursive algorigthm', () => {
        const output = backtracking.algorithmRecursive(input);
        expect(expectedOutput.length).toEqual(output.length);
        expect(expectedOutput).toEqual(expect.arrayContaining(output));
        expect(output).toEqual(expect.arrayContaining(expectedOutput));
    })

    test('Test non recursive algorigthm', () => {
        const output = backtracking.algorithm(input);
        expect(expectedOutput.length).toEqual(output.length);
        expect(expectedOutput).toEqual(expect.arrayContaining(output));
        expect(output).toEqual(expect.arrayContaining(expectedOutput));
    })

})