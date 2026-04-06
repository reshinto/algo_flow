// Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function sameTreeIterative(treeA: BinaryNode | null, treeB: BinaryNode | null): boolean {
  const queue: [BinaryNode | null, BinaryNode | null][] = [[treeA, treeB]]; // @step:initialize

  while (queue.length > 0) {
    // @step:visit
    const pair = queue.shift()!; // @step:dequeue
    const nodeA = pair[0];
    const nodeB = pair[1];

    if (nodeA === null && nodeB === null) continue; // @step:compare
    if (nodeA === null || nodeB === null) return false; // @step:compare
    if (nodeA.value !== nodeB.value) return false; // @step:compare

    queue.push([nodeA.left, nodeB.left]); // @step:enqueue
    queue.push([nodeA.right, nodeB.right]); // @step:enqueue
  }

  return true; // @step:complete
}
