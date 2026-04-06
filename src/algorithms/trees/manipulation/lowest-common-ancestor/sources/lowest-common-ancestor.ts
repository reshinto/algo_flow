// Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function lowestCommonAncestor(
  root: BinaryNode | null,
  nodeValueA: number,
  nodeValueB: number,
): BinaryNode | null {
  if (root === null) return null; // @step:initialize
  if (root.value === nodeValueA || root.value === nodeValueB) return root; // @step:compare

  // Search left and right subtrees
  const leftResult = lowestCommonAncestor(root.left, nodeValueA, nodeValueB); // @step:traverse-left
  const rightResult = lowestCommonAncestor(root.right, nodeValueA, nodeValueB); // @step:traverse-right

  // If both sides found a target node, current node is the LCA
  if (leftResult !== null && rightResult !== null) return root; // @step:visit

  // Otherwise return whichever side found a target node
  return leftResult !== null ? leftResult : rightResult; // @step:visit
}
