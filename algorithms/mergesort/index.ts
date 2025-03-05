
const arrayToSort = [23, 3, 53, 82, 998, 2, 48, 199, 87, 37, 3, 1];

const merge = (arr1: number[], arr2: number[]) => {
    let i = 0, j = 0;
    const mergedArray: number[] = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j])
            mergedArray.push(arr1[i++]);
        else
            mergedArray.push(arr2[j++]);
    }
    while (i < arr1.length) {
        mergedArray.push(arr1[i++])
    }
    while (j < arr2.length) {
        mergedArray.push(arr2[j++])
    }
    return mergedArray;
}

const mergeSort = (arrayToSort: number[]) => {
    let pairs = [...arrayToSort].map(e => [e]);

    while (pairs.length > 1) {
        const newPairs: number[][] = [];
        for (let i = 0; i < pairs.length; i += 2) {
            const arr1 = pairs[i];
            const arr2 = pairs[i + 1] || [];
            const merged = merge(arr1, arr2);
            newPairs.push(merged);
        }
        pairs = newPairs;
    }
    return pairs[0];
}

const sortedArray = mergeSort(arrayToSort);
console.log('Sorted Array', sortedArray);