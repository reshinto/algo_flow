// BST Range Sum (Iterative) — stack-based DFS summing nodes in [lowValue, highValue]

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstRangeSumIterative(root: BSTNode | null, lowValue: number, highValue: number): number {
  if (root === null) return 0; // @step:initialize

  const stack: BSTNode[] = [root];
  let totalSum = 0;

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (node.value >= lowValue && node.value <= highValue) {
      // Node is in range — add to sum
      totalSum += node.value; // @step:found
    }

    if (node.left !== null && node.value > lowValue) {
      // Left child exists and may have values in range
      stack.push(node.left); // @step:search-node
    }

    if (node.right !== null && node.value < highValue) {
      // Right child exists and may have values in range
      stack.push(node.right); // @step:search-node
    }
  }

  return totalSum; // @step:complete
}
