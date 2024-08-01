type State = [number[], number[]];

const isValid = (element: number) => {
    return true;
}

const statisfyConstraints = ([current, remaining]: State) => {
    return true;
}

const isSolution = (current: number[], nums: number[]) => {
    if (current.length === nums.length) return true;
    return false;
}

export const algorithm = (nums: number[]) => {
    const stack: State[] = [[[], nums.slice()]];
    const result: number[][] = [];

    while (stack.length > 0) {
        const state = stack.pop()!;
        const [current, remaining] = state;

        for (let i = 0; i < remaining.length; i++) {
            const element = remaining[i];
            if (!isValid(element))
                continue;
            const nextState: State = [
                [...current, element],
                [...remaining.slice(0, i), ...remaining.slice(i + 1)]
            ];
            if (isSolution(nextState[0], nums))
                result.push(nextState[0])
            else if (statisfyConstraints(nextState))
                stack.push(nextState)
        }
    }
    console.log(result);
    return result;
}

export const algorithmRecursive = (nums: number[]) => {
    const initialState: State = [[], nums.slice()];
    const result: number[][] = [];

    const recurse = ([current, remaining]: State) => {
        for (let i = 0; i < remaining.length; i++) {
            const element = remaining[i];
            if (!isValid(element))
                continue;
            const nextState: State = [
                [...current, element],
                [...remaining.slice(0, i), ...remaining.slice(i + 1)]
            ];
            if (isSolution(nextState[0], nums))
                result.push(nextState[0])
            else if (statisfyConstraints(nextState))
                recurse(nextState)
        }
    }
    recurse(initialState)
    console.log(result);
    return result;
}