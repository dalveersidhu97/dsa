export const generateParenthesis = function (n: number) {
    const stack: [number, number, string][] = [[1, 0, '(']];
    const result: string[] = [];
    const l = n + n;
    while (stack.length) {
        const [openCount, closeCount, val] = stack.pop()!;
        if (val.length === l) {
            result.push(val);
            continue;
        } else {
            if (openCount < n)
                stack.push([openCount + 1, closeCount, val + '(']);
            if (openCount > closeCount)
                stack.push([openCount, closeCount + 1, val + ')']);
        }
    }

    return result;
};