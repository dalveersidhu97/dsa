

const input = [24, 18, 38, 43, 14, 40, 1, 54];

const merge = (left: number[], right: number[]) => {
    let merged: number[] = [];
    let i = 0, j = 0;
    let count = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            count += (left.length - i);
            j++;
        }
    }
    while (i < left.length) {
        merged.push(left[i]);
        i++;
    }
    while (j < right.length) {
        merged.push(right[j]);
        j++;
    }
    return { count, merged };
};

const countInversion = (arr: number[]) => {
    let inversoinCount = 0;
    const n = arr.length;

    for (let size = 2; size <= n; size = size * 2) {
        for (let i = 0; i < n; i += size) {
            const high = i + size < n ? i + size : n;
            const mid = Math.floor((i + high) / 2);
            const left = arr.slice(i, mid);
            const right = arr.slice(mid, high);
            const { merged, count } = merge(left, right);
            inversoinCount += count;
            let k = i;
            for (let m of merged) {
                arr[k] = m;
                k++;
            }
            console.log({ left, right, merged });
        }
    }

    return inversoinCount;
}

const inversionCount = countInversion(input);
console.log(input, inversionCount);