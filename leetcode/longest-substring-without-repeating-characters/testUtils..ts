import { lengthOfLongestSubstring, testData } from ".";
import { lengthOfLongestSubstringOptimal } from "./optimalSolution";

const runTestsRaw = (testFn: typeof lengthOfLongestSubstring) => {
    testData.forEach(data => {
        test(`"[${data.input}]" has ${data.output} unique substring is ${data.shouldPass}`, () => {
            const output = testFn(data.input);
            if (data.shouldPass)
                expect(output).toBe(data.output);
            else
                expect(output).not.toBe(data.output);
        })
    })
}

export const runTests = () => runTestsRaw(lengthOfLongestSubstring);

export const runTestsOptimalSolution = () => runTestsRaw(lengthOfLongestSubstringOptimal);