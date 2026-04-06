// BST Pre-Order Traversal (Iterative) — NLR using an explicit stack

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstPreorderIterative(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  const stack: BSTNode[] = [root]; // @step:initialize

  while (stack.length > 0) {
    // @step:initialize
    const node = stack.pop()!; // @step:pop-from-stack
    result.push(node.value); // @step:visit

    // Push right first so left is processed first (LIFO)
    if (node.right !== null) {
      // @step:push-to-stack
      stack.push(node.right); // @step:push-to-stack
    }
    if (node.left !== null) {
      // @step:traverse-left
      stack.push(node.left); // @step:traverse-left
    }
  }

  return result; // @step:complete
}
