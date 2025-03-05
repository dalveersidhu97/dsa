const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
const n = 4;

const stack = [{ combination: [], remaining: [...arr] }];
const result = [];

while (stack.length) {
    const { combination, remaining } = stack.pop();
    if (combination.length === n) {
        result.push([...combination]); // Store a valid combination
        continue; // Move to the next item in the stack
    }

    for (let i = 0; i < remaining.length; i++) {
        if (combination.length + 1 + remaining.length - (i + 1) < n) 
            continue;
        const newStack = { 
            combination: [...combination, remaining[i]], 
            remaining: remaining.slice(i + 1)
        };
        stack.push(newStack); // Push the new state to the stack
    }
}

console.log(result, result.length); 
