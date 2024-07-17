export function lengthOfLongestSubstringOptimal(s: string): number {
    const charIndexMap: Map<string, number> = new Map();
    let maxLength = 0;
    let start = 0;

    for (let end = 0; end < s.length; end++) {
        const currentChar = s[end];
        if (charIndexMap.has(currentChar)) {
            start = Math.max(charIndexMap.get(currentChar)! + 1, start);
        }
        charIndexMap.set(currentChar, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}
