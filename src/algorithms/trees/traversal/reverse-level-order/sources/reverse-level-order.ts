// Reverse Level-Order Traversal — BFS bottom-up: deepest level first

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function reverseLevelOrder(root: BSTNode | null): number[][] {
  const result: number[][] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  const queue: BSTNode[] = [root]; // @step:initialize

  while (queue.length > 0) {
    // @step:enqueue-node
    const levelSize = queue.length; // @step:enqueue-node
    const currentLevel: number[] = []; // @step:enqueue-node

    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      // @step:dequeue-node
      const node = queue.shift()!; // @step:dequeue-node
      currentLevel.push(node.value); // @step:visit

      if (node.left !== null) {
        // @step:enqueue-node
        queue.push(node.left); // @step:enqueue-node
      }
      if (node.right !== null) {
        // @step:enqueue-node
        queue.push(node.right); // @step:enqueue-node
      }
    }

    // Prepend level to get bottom-up order
    result.unshift(currentLevel); // @step:visit
  }

  return result; // @step:complete
}
