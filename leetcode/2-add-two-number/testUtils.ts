import { addTwoNumbers, ListNode } from ".";

export const testData = [
    { input1: [2, 4, 3], input2: [5, 6, 4], output: [7, 0, 8], shouldPass: true },
    { input1: [0], input2: [0], output: [0], shouldPass: true },
    { input1: [9, 9, 9, 9, 9, 9, 9], input2: [9, 9, 9, 9], output: [8, 9, 9, 9, 0, 0, 0, 1], shouldPass: true },
    {
        input1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        input2: [5, 6, 4],
        output: [6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        shouldPass: true
    },
    { input1: [2, 4, 3], input2: [5, 6, 4], output: [7, 8, 0], shouldPass: false },
    { input1: [0], input2: [5, 6, 4], output: [5, 6, 4], shouldPass: true },
    { input1: [5], input2: [5, 6, 4], output: [], shouldPass: false },
];

export const arrayToListNode = (numArr: number[]) => {
    const listNode = new ListNode(numArr[0], null);
    let lastNode = listNode;

    for (let index = 1; index < numArr.length; index++) {
        const num = numArr[index];
        const newNode = new ListNode(num, null)
        lastNode.next = newNode;
        lastNode = newNode;
    }
    return listNode;
}

export const listToArray = (l: ListNode | null) => {
    let pointer: ListNode | null = l;
    const arr: number[] = [];
    while (pointer && pointer.val!==null) {
        arr.push(pointer.val)
        pointer = pointer.next;
    }
    return arr;
}

export const arrayExactEqual = (a1:number[], a2: number[]) => {
    if (a1.length !== a2.length) return false;
    for (let index = 0; index < a1.length; index++) {
        const a1E = a1[index];
        const a2E = a2[index];
        if (a1E !== a2E) return false;
    }
    return true;
}

export const runTests = (testFn: typeof addTwoNumbers) => {
    testData.forEach(data => {
        test(`"[${data.input1}]", "[${data.input2}]" => "[${data.output}]", should ${data.shouldPass ? 'pass' : 'fail'}`, () => {
            const l1 = arrayToListNode(data.input1);
            const l2 = arrayToListNode(data.input2);
            const output = testFn(l1, l2);
            if (data.shouldPass) {
                expect(listToArray(output)).toEqual(expect.arrayContaining(data.output));
                expect(data.output).toEqual(expect.arrayContaining(listToArray(output)));
            }
            expect(arrayExactEqual(listToArray(output), data.output)).toEqual(data.shouldPass);
        })
    })
}
