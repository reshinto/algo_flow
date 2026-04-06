// Merge Binary Trees Iterative — stack-based pair comparison and merge

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function mergeBinaryTreesIterative(
  treeA: BinaryNode | null,
  treeB: BinaryNode | null,
): BinaryNode | null {
  if (treeA === null) return treeB; // @step:initialize

  const stack: [BinaryNode, BinaryNode][] = []; // @step:initialize

  if (treeB !== null) {
    // @step:initialize
    stack.push([treeA, treeB]); // @step:initialize
  }

  while (stack.length > 0) {
    // @step:visit
    const pair = stack.pop()!; // @step:visit
    const nodeA = pair[0];
    const nodeB = pair[1];

    // Merge values
    nodeA.value = nodeA.value + nodeB.value; // @step:merge-node

    // Handle right children
    if (nodeA.right === null) {
      // @step:connect-child
      nodeA.right = nodeB.right; // @step:connect-child
    } else if (nodeB.right !== null) {
      // @step:connect-child
      stack.push([nodeA.right, nodeB.right]); // @step:enqueue
    }

    // Handle left children
    if (nodeA.left === null) {
      // @step:connect-child
      nodeA.left = nodeB.left; // @step:connect-child
    } else if (nodeB.left !== null) {
      // @step:connect-child
      stack.push([nodeA.left, nodeB.left]); // @step:enqueue
    }
  }

  return treeA; // @step:complete
}
