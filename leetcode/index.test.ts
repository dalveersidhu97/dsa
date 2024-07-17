import { describe } from "@jest/globals";
import * as addTwoNumberSolution1 from "./2-add-two-number";
import * as addTwoNumberSolution2 from "./2-add-two-number/solution2";
import * as addTwoNumbers from "./2-add-two-number/testUtils";
import * as longestSubstringWithoutRepeatingCharacters from "./longest-substring-without-repeating-characters/testUtils.";
import * as reversesubstringsbetweeneachpairofparentheses from "./reverse-substrings-between-each-pair-of-parentheses/testUtils";

describe('reverse-substrings-between-each-pair-of-parentheses', () =>{
    reversesubstringsbetweeneachpairofparentheses.runTests();
})

// describe.skip('add-two-number solution 1', () => {
//     addTwoNumbers.runTests(addTwoNumberSolution1.addTwoNumbers);
// })

describe('add-two-number solution 2', () => {
    addTwoNumbers.runTests(addTwoNumberSolution2.addTwoNumbers);
})

describe('longest-substring-without-repeating-characters', () => {
    longestSubstringWithoutRepeatingCharacters.runTests();
})

describe('longest-substring-without-repeating-characters-optimal', () => {
    longestSubstringWithoutRepeatingCharacters.runTestsOptimalSolution();
})