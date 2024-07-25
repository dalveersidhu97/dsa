import { expect, test } from "@jest/globals";
import { convert } from ".";

const testData = [
    { input: { str: 'PAYPALISHIRING', numRows: 3 }, output: 'PAHNAPLSIIGYIR' },
    { input: { str: 'PAYPALISHIRING', numRows: 4 }, output: 'PINALSIGYAHRPI' },
    { input: { str: 'A', numRows: 1 }, output: 'A' },
];

export const runTests = () => {
    testData.forEach(({ input, output: expectedOutput }) => {
        test(`${input.str} sohould be converted to ${expectedOutput} if numRows is ${input.numRows}`, () => {
            const output = convert(input.str, input.numRows);
            expect(output).toEqual(expectedOutput);
        })
    });
}