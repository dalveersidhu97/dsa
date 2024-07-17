import { describe, test, expect } from "@jest/globals"
import { reverseParentheses } from ".";

const testData = [
    { input: '(abcd)', output: 'dcba', equals: true },
    { input: '(u(love)i)', output: 'iloveu', equals: true },
    { input: '(ed(et(oc))el)', output: 'leetcode', equals: true }
];

export const runTests = () => {
    testData.forEach(data => {
        test(`"${data.input}" => "${data.output}" should ${data.equals?'Pass':'Fail'}`, () =>{
            const output = reverseParentheses(data.input);
            expect(output).toEqual(data.output)
        })
    })
}