
const partition = (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}

const kthSamallest = (arr: number[], k: number) => {
    let low = 0;
    let high = arr.length - 1;
    let p = partition(arr, low, high);
    console.log({ p });
    while(low < high && p + 1 != k){
        if (p + 1 < k) {
            low = p + 1;
        }else {
            high = p - 1;
        }
        p = partition(arr, low, high);
        console.log({ p });
    }
    return arr[p];
}

let list: number[] = [2, 100, 3, 1, 20, 15];
let k = 4;
const list2 = [7, 10, 4, 3, 20, 15];
const k2 = 3;
console.log({ list, k });
console.log(kthSamallest(list, k));
console.log({ list2, k2 });
console.log(kthSamallest(list2, k2));