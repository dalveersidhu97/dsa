
export const algorithm = (nums: number[]) => {
    const length = nums.length;
    const stack: [number[], number[]][] = [[[], nums.slice()]];
    const result: number[][] = [];

    const generate_candidates = () => {

    }
    const backtrack = () => {

    }
    const isValid = () => {

    }
    
    while (stack.length > 0) {
        const [current, remaining] = stack.pop()!;

        if (current.length === length) {
            result.push(current.slice());
            continue;
        }

        remaining.forEach((element, i) => {
            stack.push([
                [...current, element],
                [...remaining.slice(0, i), ...remaining.slice(i + 1)]
            ])
        });
    }
    console.log(result);
    return result;
}