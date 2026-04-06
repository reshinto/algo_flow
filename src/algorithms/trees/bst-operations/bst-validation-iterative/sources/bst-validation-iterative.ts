// BST Validation (Iterative) — stack-based in-order traversal checking ascending order

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstValidationIterative(root: BSTNode | null): boolean {
  const stack: BSTNode[] = []; // @step:initialize
  let previousValue = -Infinity;
  let current = root;

  while (current !== null || stack.length > 0) {
    // Push all left nodes onto the stack
    while (current !== null) {
      stack.push(current); // @step:search-node
      current = current.left;
    }

    // Process the top of the stack
    current = stack.pop()!;

    // In-order value must be strictly greater than the previous one
    if (current.value <= previousValue) {
      return false; // @step:found — BST violation detected
    }

    previousValue = current.value; // @step:search-node
    current = current.right;
  }

  return true; // @step:complete — all values in ascending order
}
