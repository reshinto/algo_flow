// Binary Tree Pruning — remove all subtrees containing no 1s (post-order)

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function binaryTreePruning(root: BinaryNode | null): BinaryNode | null {
  if (!root) return null; // @step:initialize

  // Post-order: prune children first, then decide current node
  root.left = binaryTreePruning(root.left); // @step:traverse-left
  root.right = binaryTreePruning(root.right); // @step:traverse-right

  // If this leaf has value 0, prune it
  if (root.value === 0 && !root.left && !root.right) {
    return null; // @step:detach-node
  }

  return root; // @step:visit
}
