// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.


// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]


// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.


// Definition for singly-linked list.
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

const listToNumber = (l: ListNode | null) => {
    if(!l) return 0;

    let sum = l.val;
    let multiplier = 10;
    let pointer = l;

    while(pointer.next) {
        sum = pointer.next.val * multiplier + sum;
        multiplier = multiplier * 10;
        pointer = pointer.next;
    }
    
    return sum;
}

const numToList = (num: number) => {
    let n = num;
    let lastNum = n % 10;
    n = (n - lastNum) / 10;
    const listNode: ListNode = new ListNode(lastNum, null);
    let lastNode = listNode

    while (n !== 0) {
        lastNum = n % 10;
        n = (n - lastNum) / 10;
        const newNode = new ListNode(lastNum, null);
        lastNode.next = newNode;
        lastNode = newNode;
    }
    return listNode;
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const num1 = listToNumber(l1);
    const num2 = listToNumber(l2);
    const sum = (num1 + num2);
    console.log('Sum = ', sum);
    return numToList(sum);
};

