import { ListNode } from ".";

const doPlusStep = (num1: number, num2: number, lastCarry: number = 0) => {
    const sum = num1 + num2 + lastCarry;
    const val = (sum % 10);
    const carry = Math.floor(sum / 10);
    return { carry, val };
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    let pointerL1 = l1;
    let pointerL2 = l2;

    let { carry, val } = doPlusStep(pointerL1?.val || 0, pointerL2?.val || 0);
    const listNode: ListNode = new ListNode(val, null);
    let current = listNode;
    pointerL1 = pointerL1?.next || null;
    pointerL2 = pointerL2?.next || null;

    while (pointerL1 || pointerL2) {
        const num1 = pointerL1?.val || 0;
        const num2 = pointerL2?.val || 0;
        const { val, carry: nextCarry } = doPlusStep(num1, num2, carry);
        carry = nextCarry;
        const newNode = new ListNode(val, null);
        current.next = newNode;
        current = current.next;
        pointerL1 = pointerL1?.next || null;
        pointerL2 = pointerL2?.next || null;
    }

    if (carry) {
        current.next = new ListNode(carry, null)
    }

    return listNode;
};