// BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstRecoverSwapped(root: BSTNode | null): void {
  let firstViolation: BSTNode | null = null; // @step:initialize
  let secondViolation: BSTNode | null = null;
  let previousNode: BSTNode | null = null;

  function inorder(node: BSTNode | null): void {
    if (node === null) return; // @step:initialize

    inorder(node.left); // @step:search-node

    // Check if BST property is violated at this position
    if (previousNode !== null && previousNode.value > node.value) {
      if (firstViolation === null) {
        // First violation: previous is the first swapped node
        firstViolation = previousNode; // @step:found
      }
      // Second violation: current is always updated to the second swapped node
      secondViolation = node; // @step:found
    }

    previousNode = node;
    inorder(node.right); // @step:search-node
  }

  inorder(root);

  // Swap the values of the two misplaced nodes to recover the BST
  if (firstViolation !== null && secondViolation !== null) {
    const temp = firstViolation.value;
    firstViolation.value = secondViolation.value; // @step:complete
    secondViolation.value = temp;
  }
}
