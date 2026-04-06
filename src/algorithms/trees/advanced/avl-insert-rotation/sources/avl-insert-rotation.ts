// AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations

interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

function avlInsertRotation(values: number[]): number[] {
  let root: AVLNode | null = null; // @step:initialize

  function height(node: AVLNode | null): number {
    return node ? node.height : 0; // @step:check-balance
  }

  function updateHeight(node: AVLNode): void {
    node.height = 1 + Math.max(height(node.left), height(node.right)); // @step:update-height
  }

  function balanceFactor(node: AVLNode): number {
    return height(node.left) - height(node.right); // @step:check-balance
  }

  function rotateRight(pivotNode: AVLNode): AVLNode {
    const leftChild = pivotNode.left!; // @step:rotate-right
    pivotNode.left = leftChild.right;
    leftChild.right = pivotNode;
    updateHeight(pivotNode);
    updateHeight(leftChild);
    return leftChild; // @step:rotate-right
  }

  function rotateLeft(pivotNode: AVLNode): AVLNode {
    const rightChild = pivotNode.right!; // @step:rotate-left
    pivotNode.right = rightChild.left;
    rightChild.left = pivotNode;
    updateHeight(pivotNode);
    updateHeight(rightChild);
    return rightChild; // @step:rotate-left
  }

  function insert(node: AVLNode | null, value: number): AVLNode {
    if (!node) return { value, left: null, right: null, height: 1 }; // @step:insert-node

    if (value < node.value) {
      node.left = insert(node.left, value); // @step:traverse-left
    } else if (value > node.value) {
      node.right = insert(node.right, value); // @step:traverse-right
    } else {
      return node; // @step:visit
    }

    updateHeight(node);
    const balance = balanceFactor(node); // @step:check-balance

    // LL case
    if (balance > 1 && node.left && value < node.left.value) {
      return rotateRight(node); // @step:rotate-right
    }
    // RR case
    if (balance < -1 && node.right && value > node.right.value) {
      return rotateLeft(node); // @step:rotate-left
    }
    // LR case
    if (balance > 1 && node.left) {
      node.left = rotateLeft(node.left); // @step:rotate-left
      return rotateRight(node); // @step:rotate-right
    }
    // RL case
    if (balance < -1 && node.right) {
      node.right = rotateRight(node.right); // @step:rotate-right
      return rotateLeft(node); // @step:rotate-left
    }

    return node;
  }

  for (const value of values) {
    root = insert(root, value); // @step:insert-node
  }

  // Return inorder traversal to verify sorted order
  const result: number[] = [];
  function inorder(node: AVLNode | null): void {
    if (!node) return;
    inorder(node.left);
    result.push(node.value);
    inorder(node.right);
  }
  inorder(root);
  return result; // @step:complete
}
