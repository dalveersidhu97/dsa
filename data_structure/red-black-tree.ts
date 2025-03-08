class RedBlackNode {
    value: number;
    left?: RedBlackNode = undefined;
    right?: RedBlackNode = undefined;
    parent: RedBlackNode | null = null;
    color: 'Red' | 'Black' = 'Red';
    space?: number;

    constructor(val: number, color: 'Red' | 'Black' = 'Red') {
        this.value = val;
        this.color = color;
    }
}

class RedBlackTree {
    root?: RedBlackNode = undefined;

    delete(key: number) {
        console.log('Delete', key);
        let nodeToDelete = this.search(key);
        if (!nodeToDelete) return console.log(`${key} not found!`);
        const inOrderSuccessor = this.getInOrderSuccessor(nodeToDelete);

        if (inOrderSuccessor === this.root) {
            const leftOrRight = inOrderSuccessor.left || inOrderSuccessor.right;
            this.root = leftOrRight; // or undefined
            return this.print();
        }
        
        if (nodeToDelete !== inOrderSuccessor) {
            nodeToDelete.value = inOrderSuccessor.value
            nodeToDelete = inOrderSuccessor;
        }

        if (nodeToDelete.left || nodeToDelete.right) {
            const leftOrRight = nodeToDelete.left! || nodeToDelete.right!;
            nodeToDelete.value = leftOrRight.value;
            nodeToDelete = leftOrRight;
        }

        const deleteNode = (nodeToDelete: RedBlackNode) => {
            const nodeToDeleteSide = nodeToDelete.parent!.left === nodeToDelete ? 'left' : 'right';
            nodeToDelete.parent![nodeToDeleteSide] = undefined;
        }

        // Case 1: if node is red -> Just delete it and exit
        if (nodeToDelete.color ==='Red') {
            console.log(`Case 1: node to delete is ${nodeToDelete.value}`)
            deleteNode(nodeToDelete);
            this.print();
            return;
        }

        // Node is Double Black
        let DB: RedBlackNode | undefined = nodeToDelete;

        while(DB) {
            const sibling = this.getSibling(DB);
            const isSiblingBlack = !sibling || sibling.color === 'Black';
            const siblingChildColor: { left: 'Red' | 'Black', right: 'Red' | 'Black' } = { 
                left: (!sibling?.left || sibling.left.color === 'Black') ? 'Black' : 'Red',
                right: (!sibling?.right || sibling.right.color === 'Black') ? 'Black' : 'Red'
            }

            // Case 2: if DB is root -> just remove DB and exit
            if ( this.root === DB) {
                console.log(`Case 2: DB is ${DB.value}`)
                DB = undefined;
                break;
            }
            if (!sibling) {
                throw new Error(`${DB.value} is black but has no sibling`);
            }
            // Case 3: if node is black, sibling is black and sibling's both children are black
            if (isSiblingBlack && siblingChildColor.left === 'Black' && siblingChildColor.right === 'Black') {
                console.log(`Case 3: DB is ${DB.value}`)
                sibling.color = 'Red';
                if (DB.parent!.color === 'Black') {
                    DB = DB.parent!;
                }else {
                    DB.parent!.color = 'Black';
                    DB = undefined;
                }
            }
            // Case 4: if node is black, sibling is red
            else if(sibling.color === 'Red') {
                console.log(`Case 4: DB is ${DB.value}`)
                sibling.color = sibling.parent!.color;
                sibling.parent!.color = 'Red';
                this.rotate(sibling);
            }else if(sibling && sibling.color === 'Black') {
                const DBSide = DB.parent?.left === DB ? 'left' : 'right';
                const DBFarSide = DB.parent?.left === DB ? 'right' : 'left';
                // Case 5: if node is black, sibling is black, sibling's near nephew is red and far nephew is black
                if(sibling[DBSide] && siblingChildColor[DBSide] === 'Red' && siblingChildColor[DBFarSide] === 'Black') {
                    console.log(`Case 5: DB is ${DB.value}`)
                    sibling.color = 'Red';
                    sibling[DBSide].color = 'Black';
                    this.rotate(sibling[DBSide]);
                }
                // Case 6: if node is black, sibling is black, sibling's near nephey is black and far nephew is red
                else if(sibling[DBFarSide] && siblingChildColor[DBFarSide] === 'Red') {
                    console.log(`Case 6: DB is ${DB.value}`)
                    if (sibling.parent && sibling.parent?.color !== 'Black') {
                        sibling.parent.color = 'Black';
                        sibling.color = 'Red';
                    }
                    this.rotate(sibling);
                    sibling[DBFarSide].color = 'Black';
                    DB = undefined;
                }
            }
        }
        
        deleteNode(nodeToDelete);
        this.print();

    }

    isTreeBalanced() {
        if (!this.root) return { isBalanced: true, numBlack: 0 };

        let requiredNumBlacks = 0;
        let curr: RedBlackNode | undefined = this.root;
        while(curr) {
            if (curr.color === 'Black') requiredNumBlacks++;
            curr = curr.left;
        }

        let numberOfBlacks: number = 1;
        const stack = [{ node: this.root, leftProcessed: false, rightProcessed: false }];
    
        while(stack.length) {
            const last = stack[stack.length - 1];
            if (!last.node?.left && !last.node?.right) {
                if (numberOfBlacks !== requiredNumBlacks) return { isBalanced: false, numBlack: numberOfBlacks, requiredNumBlacks, path: stack.map(node => node.node.value).join(' -> ') };
            }
            if (!last.leftProcessed) {
                if (last.node?.left?.color === 'Black')
                    numberOfBlacks++;
                last.leftProcessed = true;
                last.node?.left && stack.push({ node: last.node.left, leftProcessed: false, rightProcessed: false });
            }else if(!last.rightProcessed) {
                if (last.node?.right?.color === 'Black'){
                    numberOfBlacks++;
                }
                last.rightProcessed = true;
                last.node?.right && stack.push({ node: last.node.right, leftProcessed: false, rightProcessed: false });
            }else {
                const popped = stack.pop();
                if (popped?.node?.color === 'Black') {
                    numberOfBlacks --;
                }
            }
        }
        return { isBalanced: true, numBlack: requiredNumBlacks };
    }

    getInOrderSuccessor(node: RedBlackNode) {
        let inOrderSuccessor = node;
        let currentNode = inOrderSuccessor.left;
        while(currentNode){
            inOrderSuccessor = currentNode;
            currentNode = currentNode.right;
        }
        return inOrderSuccessor;
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
        console.log('');
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }
        console.log(' - - - - - - - - - - - - - - - - - - - - - - PRINT - - - - - - - - - - - - - - - - - - - ');
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
        console.log('');
        console.log(' - - - - - - - - - - - - - - - - - - - - - - PRINT END - - - - - - - - - - - - - - - - - ');
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
redBlackTree.insert(1.2);
redBlackTree.insert(20);

redBlackTree.print();

const balanced = redBlackTree.isTreeBalanced();
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(3);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(4.5);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(4);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(7);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(1.2);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(2);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(1);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(-3);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(3.5);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(3.2);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(5);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(-5);
console.log(redBlackTree.isTreeBalanced());
redBlackTree.delete(20);
console.log(redBlackTree.isTreeBalanced());