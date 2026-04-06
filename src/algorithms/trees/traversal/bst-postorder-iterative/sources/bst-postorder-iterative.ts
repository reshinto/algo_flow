// BST Post-Order Traversal (Iterative) — LRN using two stacks

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstPostorderIterative(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  const stack1: BSTNode[] = [root]; // @step:initialize
  const stack2: BSTNode[] = []; // @step:initialize

  // Phase 1: push nodes onto stack2 in reverse post-order
  while (stack1.length > 0) {
    // @step:push-to-stack
    const node = stack1.pop()!; // @step:pop-from-stack
    stack2.push(node); // @step:push-to-stack

    if (node.left !== null) {
      // @step:traverse-left
      stack1.push(node.left); // @step:traverse-left
    }
    if (node.right !== null) {
      // @step:traverse-right
      stack1.push(node.right); // @step:traverse-right
    }
  }

  // Phase 2: pop stack2 in post-order and visit each node
  while (stack2.length > 0) {
    // @step:visit
    const node = stack2.pop()!; // @step:pop-from-stack
    result.push(node.value); // @step:visit
  }

  return result; // @step:complete
}
