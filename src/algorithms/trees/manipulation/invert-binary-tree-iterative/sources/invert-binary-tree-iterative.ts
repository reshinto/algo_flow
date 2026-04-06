// Invert Binary Tree Iterative — BFS with queue: swap children level by level

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function invertBinaryTreeIterative(root: BinaryNode | null): BinaryNode | null {
  if (root === null) return null; // @step:initialize

  const queue: BinaryNode[] = [root]; // @step:initialize

  while (queue.length > 0) {
    // @step:initialize
    const current = queue.shift()!; // @step:dequeue

    // Swap left and right children
    const temp = current.left; // @step:swap-children
    current.left = current.right; // @step:swap-children
    current.right = temp; // @step:swap-children

    // Enqueue non-null children for processing
    if (current.left !== null) queue.push(current.left); // @step:enqueue
    if (current.right !== null) queue.push(current.right); // @step:enqueue
  }

  return root; // @step:complete
}
