class MinHeap {
    private arr: number[];

    constructor(a: number[] = []) {
        this.arr = a;
        if (this.arr.length < 2) return;
        let pi = Math.floor((this.arr.length - 1) / 2);
        while (pi > -1) {
            this.MinHeapify(pi);
            pi--;
        }
    }

    getMin() {
        if (this.arr.length) return this.arr[0];
    }

    extractMin() {
        const arr = this.arr;
        if (!arr.length) return undefined;
        if (arr.length === 1) return arr.pop()!;
        const min = arr[0];
        arr[0] = arr.pop()!;
        this.MinHeapify(0);
        return min;
    }

    insert(key: number) {
        this.arr.push(key);
        let childIndex = this.arr.length - 1;
        let parentIndex = Math.floor(childIndex / 2);
        while (parentIndex > -1 && this.arr[parentIndex] > this.arr[childIndex]) {
            const tmp = this.arr[parentIndex];
            this.arr[parentIndex] = this.arr[childIndex];
            this.arr[childIndex] = tmp;
            childIndex = parentIndex;
            parentIndex = Math.floor(childIndex / 2);
        }
        return childIndex;
    }

    decreaseKey(i: number, newVal: number) {
        const arr = this.arr;
        this.arr[i] = newVal;
        let pi = Math.floor(i / 2);

        if (arr[i] > arr[pi]) {
            this.MinHeapify(i); // do increase key as well
            return;
        }

        while (pi > -1 && this.arr[pi] > this.arr[i]) {
            const tmp = this.arr[pi];
            this.arr[pi] = this.arr[i];
            this.arr[i] = tmp;
            i = pi;
            pi = Math.floor(i / 2);
        }
    }

    delete(i: number) {
        this.decreaseKey(i, -Infinity);
        this.extractMin();
    }

    MinHeapify(i: number) {
        const arr = this.arr;
        let pi = i;
        let li = (pi * 2) + 1;
        let ri = li + 1;

        while (li < arr.length) {
            const mini = (ri >= arr.length || arr[li] < arr[ri]) ? li : ri;
            if (arr[pi] > arr[mini]) {
                const tmp = arr[pi];
                arr[pi] = arr[mini];
                arr[mini] = tmp;
                pi = mini;
                li = (pi * 2) + 1;
                ri = li + 1;
            } else {
                break;
            }
        }
    }
    display() {
        MinHeap.printHeap(this.arr);
    }

    static printHeap(arr: number[]): void {
        let n = arr.length;
        let levels = Math.floor(Math.log2(n)) + 1;  // Calculate the number of levels in the heap
        let index = 0;  // Start from the root node

        for (let level = 0; level < levels; level++) {
            let nodesInLevel = Math.pow(2, level); // Number of nodes at the current level
            let row: number[] = [];

            for (let i = 0; i < nodesInLevel && index < n; i++) {
                row.push(arr[index]);
                index++;
            }

            console.log(row.join(" ")); // Print the nodes in the current level
        }
    }
}

const arrayToSort = [23, 3, 53, 82, 998, 2, 48, 199, 87, 37, 3, 1];
const minHeap = new MinHeap(arrayToSort);
minHeap.display();
console.log('heap has been created!');

const i = minHeap.insert(100);
minHeap.display();
console.log(100, 'has been inserted at index', i);

minHeap.decreaseKey(4, 1);
minHeap.display();
console.log('decreased key at index 4 to ', 1);

let min = minHeap.extractMin();
let sortedArray: number[] = [];
while (min) {
    sortedArray.push(min);
    min = minHeap.extractMin();
}
console.log('Sorted', sortedArray);
