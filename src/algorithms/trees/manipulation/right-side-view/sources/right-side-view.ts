// Right Side View — BFS: collect the last node of each level

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function rightSideView(root: BinaryNode | null): number[] {
  if (root === null) return []; // @step:initialize

  const result: number[] = []; // @step:initialize
  const queue: BinaryNode[] = [root]; // @step:initialize

  while (queue.length > 0) {
    // @step:visit
    const levelSize = queue.length; // @step:visit

    for (let position = 0; position < levelSize; position++) {
      // @step:visit
      const node = queue.shift()!; // @step:dequeue

      // The last node of this level is visible from the right side
      if (position === levelSize - 1) {
        // @step:collect-element
        result.push(node.value); // @step:collect-element
      }

      if (node.left !== null) queue.push(node.left); // @step:enqueue
      if (node.right !== null) queue.push(node.right); // @step:enqueue
    }
  }

  return result; // @step:complete
}
