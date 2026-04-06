// BST In-Order Traversal (Iterative) — LNR using an explicit stack

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstInorderIterative(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize
  const stack: BSTNode[] = []; // @step:initialize
  let current: BSTNode | null = root; // @step:initialize

  while (current !== null || stack.length > 0) {
    // @step:initialize
    // Push all left children onto the stack
    while (current !== null) {
      // @step:push-to-stack
      stack.push(current); // @step:push-to-stack
      current = current.left; // @step:traverse-left
    }

    // Pop the top node and visit it
    current = stack.pop()!; // @step:pop-from-stack
    result.push(current.value); // @step:visit

    // Move to right subtree
    current = current.right; // @step:traverse-right
  }

  return result; // @step:complete
}
