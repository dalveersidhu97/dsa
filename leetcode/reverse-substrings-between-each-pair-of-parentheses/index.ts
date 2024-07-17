// You are given a string s that consists of lower case English letters and brackets.

// Reverse the strings in each pair of matching parentheses, starting from the innermost one.

// Your result should not contain any brackets.


// Example 1:

// Input: s = "(abcd)"
// Output: "dcba"
// Example 2:

// Input: s = "(u(love)i)"
// Output: "iloveu"
// Explanation: The substring "love" is reversed first, then the whole string is reversed.
// Example 3:

// Input: s = "(ed(et(oc))el)"
// Output: "leetcode"
// Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.


// Constraints:

// 1 <= s.length <= 2000
// s only contains lower case English characters and parentheses.
// It is guaranteed that all parentheses are balanced.

const getLastIndexOf = (str: string, letter: string) => {
    let index = -1;
    for (let i = 0; i < str.length; i++) {
        const currentLetter = str[i];
        if (currentLetter === letter) {
            index = i;
        }
    }
    return index;
}

const indexOf = (str: string, letter: string, afterIndex: number = 0) => {
    let index = -1;
    for (let i = afterIndex + 1; i < str.length; i++) {
        const currentLetter = str[i];
        if (currentLetter === letter) {
            return i
        }
    }
    return index;
}

const reverseString = (str: string) => {
    if (str.length < 2) return str;
    let reversedStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversedStr = reversedStr + str[i];
    }
    return reversedStr;
}

const replace = (str: string, start: number, rStr: string, l: number = 0) => {
    const part1 = str.substring(0, start);
    const part3 = str.substring(start + l, str.length);
    const part2 = rStr;
    const replacedStr = part1 + part2 + part3;
    return replacedStr;
}

const solveInnermostBracket = (str: string) => {
    const bracketStartIndex = getLastIndexOf(str, '(');
    if (bracketStartIndex === -1)
        return { str: reverseString(str), next: false };
    const bracketEndIndex = indexOf(str, ')', bracketStartIndex);
    if (bracketEndIndex === -1)
        return { str: reverseString(str), next: false };
    const strInBracket = str.substring(bracketStartIndex + 1, bracketEndIndex);
    const reversed = reverseString(strInBracket);
    const bracketLength = bracketEndIndex - bracketStartIndex + 1;
    const solvedStr = replace(str, bracketStartIndex, reversed, bracketLength);
    return { str: solvedStr, next: true };
}


export function reverseParentheses(s: string): string {
    let solvedStr = s;
    let solvedTmp = solveInnermostBracket(s);
    while (solvedTmp.next) {
        solvedStr = solvedTmp.str;
        solvedTmp = solveInnermostBracket(solvedStr);
    }

    return solvedStr;
};