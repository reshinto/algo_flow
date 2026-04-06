// Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function mergeBinaryTrees(treeA: BinaryNode | null, treeB: BinaryNode | null): BinaryNode | null {
  if (treeA === null) return treeB; // @step:initialize
  if (treeB === null) return treeA; // @step:initialize

  // Both nodes exist — merge by summing values
  treeA.value = treeA.value + treeB.value; // @step:merge-node

  // Recursively merge left and right subtrees
  treeA.left = mergeBinaryTrees(treeA.left, treeB.left); // @step:traverse-left
  treeA.right = mergeBinaryTrees(treeA.right, treeB.right); // @step:traverse-right

  return treeA; // @step:visit
}
