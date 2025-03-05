
class AVLNode {
    value: number;
    left?: AVLNode = undefined;
    right?: AVLNode = undefined;
    height: number = 1;

    constructor(private val: number) {
        this.value = val;
    }
}

class AVLTree {
    root?: AVLNode = undefined;

    constructor() {
        this.leftRotate = this.leftRotate.bind(this);
        this.rightRotate = this.rightRotate.bind(this);
        this.replaceRoot = this.replaceRoot.bind(this);
        this.calculateHeight = this.calculateHeight.bind(this);
        this.search = this.search.bind(this);
        this.balance = this.balance.bind(this);
        this.delete = this.delete.bind(this);
    }

    toArray() {
        const arr: number[] = [];
        if (!this.root) return [];
        const stack: [AVLNode, boolean][] = [[this.root, false]];
        while (stack.length > 0) {
            const [curr, leftVisited] = stack.pop()!;
            if (!leftVisited) {
                stack.push([curr, true]);
                curr.left && stack.push([curr.left, false]);
            } else {
                arr.push(curr.value);
                curr.right && stack.push([curr.right, false])
            }
        }
        return arr;
    }

    search(key: number, showLog: boolean = true): { path: AVLNode[], node: AVLNode | undefined } {
        let node: AVLNode | undefined = undefined;

        if (this.root === undefined) {
            return { path: [], node };
        }

        let current = this.root;
        let path: AVLNode[] = [];
        while (true) {
            if (key < current.value) {
                if (!current.left) break;
                path.push(current);
                current = current.left;
            } else if (key > current.value) {
                if (!current.right) break;
                path.push(current);
                current = current.right;
            } else {
                node = current;
                break;
            }
        }
        if (!node && showLog) console.log('Cound not find', key);
        return { node, path };
    }

    insert(key: number) {
        if (this.root === undefined) {
            this.root = new AVLNode(key);
            return;
        }
        let current = this.root;
        let path: AVLNode[] = [current];
        let newNode: AVLNode | undefined = undefined;
        while (true) {
            if (key < current.value) {
                if (current.left) {
                    current = current.left;
                    path.push(current);
                }
                else {
                    newNode = new AVLNode(key);
                    current.left = newNode;
                    break;
                }
            } else if (key > current.value) {
                if (current.right) {
                    current = current.right;
                    path.push(current);
                }
                else {
                    newNode = new AVLNode(key);
                    current.right = newNode;
                    break;
                }
            } else {
                console.log('key', key, 'already exists');
                break;
            }
        }
        // console.log(path.map(p => p.value).join(' -> '));
        if (!newNode) return;
        this.balance(path);
    }

    balance(path: AVLNode[]) {
        while (path.length) {
            const node = path.pop()!;
            this.calculateHeight(node);
            const { bf, imbalanced, leftHeavy } = AVLTree.getBalance(node);
            if (imbalanced) {
                // console.log(node.value, 'is imbalanced', bf);
                const rotate = leftHeavy ? this.rightRotate : this.leftRotate;
                const parent = path.length > 0 ? path[path.length - 1] : null;
                rotate(node, parent);
            }
        }
    }

    calculateHeight(...nodes: (AVLNode | undefined | null)[]) {
        nodes.forEach(node => {
            if (node) {
                node.height = 1 + Math.max(node.left?.height || 0, node.right?.height || 0);
            }
        });
    }

    static getBalance(node: AVLNode) {
        const bf = (node.left?.height || 0) - (node.right?.height || 0);
        const rightHeavy = bf < 0;
        const leftHeavy = bf > 0;
        const imbalanced = bf < -1 || bf > 1 ? true : false;
        return { bf, leftHeavy, rightHeavy, imbalanced }
    }

    replaceRoot(oldRoot: AVLNode, newRoot: AVLNode, parent: AVLNode | null) {
        if (parent === null) {
            this.root = newRoot;
        } else if (parent.left === oldRoot)
            parent.left = newRoot;
        else if (parent.right === oldRoot)
            parent.right = newRoot;
    }

    rightRotate(root: AVLNode, parent: AVLNode | null) {
        // console.log('Right Rotate', root.value)
        if (!root.left) {
            console.log('Not Left');
            return
        };
        if (root.left.height > 1) {
            const leftBF = AVLTree.getBalance(root.left);
            if (leftBF.rightHeavy)
                this.leftRotate(root.left, root);
        }
        const newRoot = root.left;
        root.left = root.left.right;
        newRoot.right = root;
        this.replaceRoot(root, newRoot, parent);
        // console.log('New Root', newRoot?.value);
        this.calculateHeight(root.left, newRoot.right, newRoot);
        return newRoot;
    }

    leftRotate(root: AVLNode, parent: AVLNode | null) {
        // console.log('Left Rotate', root.value)
        if (!root.right) {
            console.log('Not Right');
            return
        };
        if (root.right.height > 1) {
            const rightBF = AVLTree.getBalance(root.right);
            if (rightBF.leftHeavy)
                this.rightRotate(root.right, root);
        }
        const newRoot = root.right;
        root.right = root.right.left;
        newRoot.left = root;
        this.replaceRoot(root, newRoot, parent);
        // console.log('New Root', newRoot?.value);
        this.calculateHeight(root.right, newRoot.left, newRoot);
        return newRoot;
    }

    delete(key: number) {
        const { node, ...rest } = this.search(key);
        let path = rest.path;
        const parent = path.length > 0 ? path[path.length - 1] : null;
        if (node?.value !== key) {
            console.log('Could not delete: Key not found', key);
            return false;
        }
        const isLeaf = !node.left && !node.right && node.height === 1;
        const hasOneChild = (!!node.left && !node.right) || (!!node.right && !node.left);
        const hasTwoChildren = !!node.left && !!node.right;

        const getSuccessor = (node: AVLNode) => {
            let successor = node.left!;
            let successorParent = node;
            while(successor?.right) {
                successorParent = successor;
                successor = successor.right;
            }
            const successorLeft = successor.left;
            return { successor, successorParent, successorLeft };
        }
        if (isLeaf) {
            if (node === this.root)
                this.root = undefined;
            else if (parent?.left === node) parent.left = undefined;
            else if (parent?.right === node) parent.right = undefined;
        } else if (hasOneChild) {
            if (node === this.root) {
                this.root = node.left ?? node.right;
                this.root && path.push(this.root);
            } else if (parent?.left === node) {
                parent.left = node.left ?? node.right;
            } else if (parent?.right === node) {
                parent.right = node.left ?? node.right;
            }
        } else if (hasTwoChildren) {
            const { successor, successorParent, successorLeft } = getSuccessor(node);

            if (node === this.root) this.root = successor;
            else if (parent?.left === node) parent.left = successor;
            else if (parent?.right === node) parent.right = successor;

            successor.right = node.right;

            if (successorParent !== node) {
                successor.left = node.left;
                successorParent.right = successorLeft;;
            }
            const { path: pathToSuccessorParent } = this.search(successorParent.value, false);
            path = pathToSuccessorParent;
            path.push(successorParent);
        }
        console.log('Deleted', key);
        // balance
        this.balance(path);
        return true;
    }

    printTree() {
        if (!this.root) {
            console.log("Tree is empty");
            return;
        }
    
        const getHeight = (node: AVLNode | undefined): number => node?.height ?? 0;
    
        const getLevels = (node: AVLNode | undefined, level: number, levels: (string | number)[][], pos: number[]) => {
            if (!node) return;
            if (!levels[level]) levels[level] = [];
    
            levels[level][pos[0]] = node.value;
            const leftPos = [pos[0] - Math.pow(2, getHeight(this.root) - level - 2)];
            const rightPos = [pos[0] + Math.pow(2, getHeight(this.root) - level - 2)];
    
            getLevels(node.left, level + 1, levels, leftPos);
            getLevels(node.right, level + 1, levels, rightPos);
        };
    
        const levels: (string | number)[][] = [];
        const rootPos = [Math.pow(2, getHeight(this.root))];
    
        getLevels(this.root, 0, levels, rootPos);
    
        levels.forEach((level) => {
            console.log(level.map(val => (val === undefined ? "  " : val)).join(" "));
        });
    }
}

const tree = new AVLTree();
[5, 7, 6, 23, 9, 50, 100, 29, 3839, 8729, 29, 48, 6875, 37, 399, 577, 276, 942, 57, 26, 79, 35, 89, 356].forEach(n => {
    tree.insert(n);
    tree.printTree();
    console.log('----------------------                 ----------------------')
});
tree.printTree();
console.log('To Array', tree.toArray());

const arr = tree.toArray();
const arrCopy = [...arr];

const testDelete = (key: number) => {
    const elementsBefore = tree.toArray();
    if (!tree.delete(key))
        throw new Error(`Could not delete ${key}`);
    const elementsAfter = tree.toArray();
    if (elementsBefore.length !== elementsAfter.length + 1) 
        throw new Error(`Delete Error: Key: ${key}, expected nodes ${elementsBefore.length - 1} but got ${elementsAfter.length}`);
    if (elementsAfter.includes(key)){
        tree.printTree();
        throw new Error(`Delete Error, ${key} is still present in the tree`);
    } 
    for (let e of elementsAfter) {
        if (!elementsBefore.includes(e)) 
            throw new Error(`Delete Error, ${e} is missing after deleting ${key}`);
    }
    const isBalanced = tree.toArray().every(val => {
        const { node } = tree.search(val);
        if (!node) return false;
        const { imbalanced } = AVLTree.getBalance(node);
        return !imbalanced;
    });
    if (!isBalanced) throw new Error(`Tree not balanced after deleting ${key}, Input: ${arrCopy}`);
    return true;
}
// const deleteInput = [50, 89, 23, 26];
while (arr.length > 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomKey = arr[randomIndex];
    // const randomKey = deleteInput.pop()!;
    arr.splice(randomIndex, 1);
    if (!testDelete(randomKey)) {
        throw new Error(`Delete Error: key ${randomKey}, Input: ${arrCopy}`);
    }
}

tree.printTree();
