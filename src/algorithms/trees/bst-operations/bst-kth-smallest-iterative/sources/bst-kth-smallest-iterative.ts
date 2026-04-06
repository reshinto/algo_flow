// BST Kth Smallest (Iterative) — stack-based in-order with counter

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstKthSmallestIterative(root: BSTNode | null, kthPosition: number): number {
  const stack: BSTNode[] = []; // @step:initialize
  let counter = 0;
  let current = root;

  while (current !== null || stack.length > 0) {
    // Push all left nodes — they have smaller values
    while (current !== null) {
      stack.push(current); // @step:search-node
      current = current.left;
    }

    // Process next in-order node
    current = stack.pop()!;
    counter++;

    if (counter === kthPosition) {
      return current.value; // @step:found
    }

    // Move to right subtree
    current = current.right; // @step:search-node
  }

  return -1; // @step:complete — k exceeds number of nodes
}
