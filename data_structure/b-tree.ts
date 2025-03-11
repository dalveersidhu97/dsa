class BTreeNode {
    key: number[];
    child: BTreeNode[];
    isLeaf: boolean;

    constructor(keys: number[], isLeaf: boolean = true, children: BTreeNode[] = []) {
        this.key = keys;
        this.isLeaf = isLeaf;
        this.child = children;
    }

    split() {
        const l = this.key.length;
        const c = Math.floor(l / 2);
        const leftKeys: number[] = [];
        const leftChildren: BTreeNode[] = [];
        const rightKeys: number[] = [];
        const rightChildren: BTreeNode[] = [];

        for (let i = 0; i < l; i++) {
            if (i < c) leftKeys.push(this.key[i]);
            else if (i > c) rightKeys.push(this.key[i]);
        }

        for (let i = 0; i < this.child.length; i++) {
            if (i <= c) leftChildren.push(this.child[i]);
            else rightChildren.push(this.child[i]);
        }

        const isLeaf = this.child.length === 0;
        const leftNode = new BTreeNode(leftKeys, isLeaf, leftChildren);
        const rightNode = new BTreeNode(rightKeys, isLeaf, rightChildren);
        return { keyToMoveUp: this.key[c], leftNode, rightNode };
    }

    insert(newKey: number) {
        this.key.push(newKey);
        let i: number;
        for (i = this.key.length - 2; i >= 0; i--) {
            if (this.key[i] > this.key[i + 1]) {
                const tmp = this.key[i];
                this.key[i] = this.key[i + 1];
                this.key[i + 1] = tmp;
            } else {
                break;
            }
        }
        return i + 1;
    }
}

class BTree {
    t: number;
    root: BTreeNode | null = null;
    minKeys: number;
    maxKeys: number;

    constructor(t: number) {
        this.t = t;
        this.minKeys = t - 1;
        this.maxKeys = 2 * t - 1;
    }

    getLeaf(newKey: number) {
        let leafNode = this.root!;
        const parents: BTreeNode[] = [];

        // find the leaf not where key should be inserted
        while (!leafNode.isLeaf) {
            let nextNodeIndex: number;
            for (nextNodeIndex = 0; nextNodeIndex < leafNode.key.length; nextNodeIndex++) {
                if (newKey === leafNode.key[nextNodeIndex]) {
                    throw new Error(`${newKey} already exists!`);
                }
                if (newKey < leafNode.key[nextNodeIndex]) {
                    break;
                }
            }
            parents.push(leafNode);
            leafNode = leafNode.child[nextNodeIndex];
        }
        return { leafNode, parents };
    }

    insert(newKey: number) {

        // if tree is empty, create a root node with 1 key
        if (!this.root) {
            this.root = new BTreeNode([newKey]);
            return;
        }

        let { leafNode, parents } = this.getLeaf(newKey);

        if (leafNode.key.includes(newKey))
            throw new Error(`${newKey} already exists!`);

        // if leaf node has space then insert
        if (leafNode.key.length < this.maxKeys) {
            leafNode.insert(newKey);
            return;
        }

        let keyToInsert = newKey;
        let currentNode = leafNode;
        let keyChildren: BTreeNode[] = [];

        while (currentNode.key.length === this.maxKeys) {
            let split = currentNode.split();
            const { keyToMoveUp, leftNode, rightNode } = split;

            const insertToNode = keyToInsert < keyToMoveUp ? leftNode : rightNode;
            const insertedAt = insertToNode.insert(keyToInsert);
            !insertToNode.isLeaf && insertToNode.child.splice(insertedAt, 1, ...keyChildren); // if not isLeaf

            if (currentNode === this.root) {
                this.root = new BTreeNode([keyToMoveUp], false, [leftNode, rightNode]);
                break;
            }
            const parent = parents.pop()!;
            if (parent.key.length < this.maxKeys) {
                const insertedAt = parent.insert(keyToMoveUp);
                parent.child.splice(insertedAt, 1, ...[leftNode, rightNode]);
                break;
            }
            currentNode = parent;
            keyToInsert = keyToMoveUp;
            keyChildren = [leftNode, rightNode];
        }
    }

    print() {
        if (!this.root) return;
        let currentLevel: { node: BTreeNode, parent: null | BTreeNode }[] = [{ node: this.root, parent: null }];
        const parentText = (node: BTreeNode | null) => {
            const arr = node?.key || [];
            if (!arr || arr.length === 0) return 'root';
            if (arr.length === 1) return arr[0];
            if (arr.length > 1) return `${arr[0]}..${arr[arr.length - 1]}`;
        }
        while (currentLevel.length) {
            console.log(currentLevel.map(node => node.node.key.join(' ') + ` (${parentText(node.parent)})`).join(`       `));
            let nextLevel: typeof currentLevel = [];
            for (let node of currentLevel) {
                for (let i = 0; i < node.node.child.length; i++) {
                    const child = node.node.child[i];
                    nextLevel.push({ node: child, parent: node.node });
                }
            }
            currentLevel = nextLevel;
        }
    }
}

const bTree = new BTree(3);

bTree.insert(4);
bTree.insert(5);
bTree.insert(8);
bTree.insert(10);
bTree.insert(15);
bTree.insert(20);
bTree.insert(6);
bTree.insert(7);
bTree.insert(9);
bTree.insert(2);
bTree.insert(25);
bTree.insert(1);
bTree.insert(30);
bTree.insert(14);
bTree.insert(12);
bTree.insert(13);
bTree.insert(11);
bTree.insert(40);
bTree.insert(50);
bTree.insert(60);
bTree.insert(70);
bTree.insert(80);
bTree.insert(16);
bTree.insert(17);
bTree.insert(18);
bTree.insert(19);
bTree.insert(90);
bTree.insert(100);
bTree.insert(110);
bTree.insert(85);
bTree.insert(86);
bTree.insert(88);
bTree.insert(87);
bTree.insert(-1);
bTree.insert(-2);
bTree.insert(-3);
bTree.insert(-4);
bTree.insert(-5);
bTree.insert(-6);
bTree.insert(-7);
bTree.insert(-8);
bTree.insert(-9);
bTree.insert(-10);
bTree.insert(-11);
bTree.insert(-12);
bTree.insert(26);
bTree.insert(27);
bTree.insert(28);
bTree.print();