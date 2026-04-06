// Zigzag Level-Order Traversal — BFS with alternating left-right direction per level

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function zigzagLevelOrder(root: BSTNode | null): number[][] {
  const result: number[][] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  const queue: BSTNode[] = [root]; // @step:initialize
  let leftToRight = true; // @step:initialize

  while (queue.length > 0) {
    // @step:enqueue-node
    const levelSize = queue.length; // @step:enqueue-node
    const currentLevel: number[] = new Array(levelSize) as number[]; // @step:enqueue-node

    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      // @step:dequeue-node
      const node = queue.shift()!; // @step:dequeue-node

      // Insert at front or back based on current direction
      const insertIndex = leftToRight ? nodeIndex : levelSize - 1 - nodeIndex; // @step:visit
      currentLevel[insertIndex] = node.value; // @step:visit

      if (node.left !== null) {
        // @step:enqueue-node
        queue.push(node.left); // @step:enqueue-node
      }
      if (node.right !== null) {
        // @step:enqueue-node
        queue.push(node.right); // @step:enqueue-node
      }
    }

    result.push(currentLevel); // @step:visit
    leftToRight = !leftToRight; // @step:visit
  }

  return result; // @step:complete
}
