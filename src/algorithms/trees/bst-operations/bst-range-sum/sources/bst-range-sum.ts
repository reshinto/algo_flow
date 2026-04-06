// BST Range Sum (Recursive) — sum all nodes with values in [lowValue, highValue]

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstRangeSum(root: BSTNode | null, lowValue: number, highValue: number): number {
  if (root === null) return 0; // @step:initialize

  let sum = 0;

  if (root.value >= lowValue && root.value <= highValue) {
    // Current node is in range — add its value
    sum += root.value; // @step:found
  }

  if (root.value > lowValue) {
    // Left subtree may contain values in range
    sum += bstRangeSum(root.left, lowValue, highValue); // @step:search-node
  }

  if (root.value < highValue) {
    // Right subtree may contain values in range
    sum += bstRangeSum(root.right, lowValue, highValue); // @step:search-node
  }

  return sum; // @step:complete
}
