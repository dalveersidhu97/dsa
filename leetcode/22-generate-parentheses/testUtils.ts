import { expect, test } from "@jest/globals"
import { generateParenthesis } from ".";

const testData = [
    {
        input: 3,
        output: ["()()()", "()(())", "(())()", "(()())", "((()))"]
    },
    {
        input: 1,
        output: ["()"]
    }
];

export const runTests = () => {
    testData.forEach(data => {
        test(`${data.input} => ${data.output}`, () => {
            const output = generateParenthesis(data.input);
            expect(output.length).toEqual(data.output.length);
            expect(output).toEqual(expect.arrayContaining(data.output));
            expect(data.output).toEqual(expect.arrayContaining(output));
        })
    });

}