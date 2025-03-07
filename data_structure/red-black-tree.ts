class RedBlackNode {
    value: number;
    left?: RedBlackNode = undefined;
    right?: RedBlackNode = undefined;
    parent: RedBlackNode | null = null;
    color: 'Red' | 'Black' = 'Red';
    space?: number;

    constructor(private val: number, color: 'Red' | 'Black' = 'Red') {
        this.value = val;
        this.color = color;
    }
}

class RedBlackTree {
    root?: RedBlackNode = undefined;

    delete(key: number) {

    }

    search(key: number){
        if (!this.root) return console.log('Tree is empty');
        let currentNode: RedBlackNode | undefined = this.root;
        while(currentNode && currentNode.value !== key) {
            if (key < currentNode.value){
                currentNode = currentNode.left;
            }else {
                currentNode = currentNode.right;
            }
        }
        return currentNode;
    }

    insert(key: number){
        if (this.root === undefined) {
            this.root = new RedBlackNode(key, 'Black');
            console.log(`Inserted ${key}`);
            return;
        }
        const newNode = new RedBlackNode(key);
        let currentParent = this.root;
        while(true) {
            if (key < currentParent.value) {
                if (!currentParent.left){
                    currentParent.left = newNode;
                    break;
                }else{
                    currentParent = currentParent.left;
                }
            }else if(key > currentParent.value) {
                if (!currentParent.right){
                    currentParent.right = newNode;
                    break;
                }else{
                    currentParent = currentParent.right;
                }
            }else {
                console.log(`${key} already exists`);
                return;
            }
        }
        newNode.parent = currentParent;
        this.balance(newNode);
    }

    getSibling(node: RedBlackNode) {
        const parent = node.parent;
        const isLeft = parent?.left === node;
        const sibling = isLeft ? parent.right : parent?.left;
        return sibling;
    }

    rotate(node: RedBlackNode) {
        console.log('Rotate', node.value);
        const parent = node.parent;
        if (!parent) throw new Error('node is root, cannot be rotated');
        const grandParent = parent.parent;

        const nodePlace = parent.right === node ? 'right' : 'left';
        const nodePlaceOpposite = nodePlace === 'left' ? 'right' : 'left';
        
        if (grandParent) {
            const parentPlace = grandParent.left === parent ? 'left' : 'right';
            grandParent[parentPlace] = node;
        }else {
            this.root = node;
        }
        
        node.parent = grandParent;
        const nodeChild = node[nodePlaceOpposite];
        node[nodePlaceOpposite] = parent;
        parent.parent = node;
        parent[nodePlace] = nodeChild;
        if (nodeChild) nodeChild.parent = parent;
    }

    balance(newNode: RedBlackNode) {
        const stack = [newNode];

        while(stack.length) {
            const node = stack.pop()!;

            if (node.parent === null || node.parent === this.root) {
                continue;
            }
            const parent = node.parent;
            const parentsSibling = this.getSibling(parent);
            const grandParent = parent.parent;

            if (parent.color === 'Red' && parentsSibling?.color === 'Red') {
                parent.color = 'Black';
                parentsSibling.color = 'Black';
                if (grandParent && grandParent !== this.root) {
                    grandParent.color = 'Red';
                    stack.push(grandParent);
                    continue;
                }
            }else if (parent.color === 'Red' && parentsSibling?.color !== 'Red') {
                if (!grandParent) {
                    parent.color = 'Red';
                    node.color = 'Black';
                    this.rotate(parent);
                    console.log('No Grand Parent')
                    return;
                }
                const parentPlace = grandParent.left === parent ? 'left' : 'right';
                const nodePlace = parent.left === node ? 'left' : 'right';

                if (parentPlace !== nodePlace) {
                    this.rotate(node);
                }

                grandParent.color = 'Red';
                const newParent = grandParent[parentPlace]!;
                newParent.color = 'Black';
                this.rotate(newParent);
            }
        }
    }

    print() {
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }
        let offset = 8;
        let step = 8;
        
        let stack: {node: RedBlackNode, leftProcessed: boolean, rightProcessed: boolean}[] = [{ node: this.root, leftProcessed: false, rightProcessed: false}];
        const output: RedBlackNode[] = [];

        while(stack.length) {
            const last = stack[stack.length-1]!;
            if (!last.leftProcessed) {
                last.leftProcessed = true;
                if (last.node.left)
                    stack.push({ node: last.node.left, leftProcessed: false, rightProcessed: false });
                continue;
            }else if(!last.rightProcessed) {
                last.rightProcessed = true;
                if (last.node.right)
                    stack.push({ node: last.node.right, leftProcessed: false, rightProcessed: false });
            }else {
                stack.pop();
                if (last.node.left && last.node.right) {
                    last.node.space = Math.round((last.node.left.space! + last.node.right.space!) / 2);
                }else 
                    last.node.space = offset;
                offset = offset + step;
                output.push(last.node);
            }
        }
        const levels = [[this.root]];
        while(true) {
            const lastLevel = levels[levels.length - 1];
            const nextLevel: typeof lastLevel = [];
            for (let node of lastLevel) {
                if (node.left) nextLevel.push(node.left);
                if (node.right) nextLevel.push(node.right);
            }
            if (nextLevel.length === 0) break;
            levels.push(nextLevel);
        }
        for(let level of levels) {
            let line = '';
            for (let i = 0; i < level.length; i++) {
                const node = level[i];
                let nodePlace = '';
                if (node.parent) {
                    nodePlace = node.parent.left === node ? 'L' : 'R';
                }
                let nodeContent = `${node.value}${node.color}(${node.parent?.value || 'root'}${nodePlace})`;
                let numSpaces = node.space!;
                if (i > 0) {
                    const lastNode = level[i-1];
                    numSpaces = numSpaces - lastNode.space!;
                }
                numSpaces = numSpaces - Math.ceil(nodeContent.length / 2);
                numSpaces = numSpaces < 0 ? 0 : numSpaces;
                let spaces = " ".repeat(numSpaces);
                line += spaces + nodeContent;
            }
            console.log(line)
        }
    } 
}

const redBlackTree = new RedBlackTree();

redBlackTree.insert(5);
redBlackTree.insert(7);
redBlackTree.insert(4);
redBlackTree.insert(2);
redBlackTree.insert(3);
redBlackTree.insert(1);
redBlackTree.insert(-5);
redBlackTree.insert(-3);
redBlackTree.insert(4.5);
redBlackTree.insert(3.5);
redBlackTree.insert(3.2);

redBlackTree.print();

const searchedNode = redBlackTree.search(5);
console.log({ searchedNode });