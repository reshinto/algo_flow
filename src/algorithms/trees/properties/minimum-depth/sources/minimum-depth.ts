// Minimum Depth of Binary Tree — recursive DFS to nearest leaf

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function minimumDepth(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  // If only right child exists, recurse right
  if (root.left === null && root.right !== null) {
    // @step:visit
    return minimumDepth(root.right) + 1; // @step:traverse-right
  }

  // If only left child exists, recurse left
  if (root.right === null && root.left !== null) {
    // @step:visit
    return minimumDepth(root.left) + 1; // @step:traverse-left
  }

  // If leaf node, depth is 1
  if (root.left === null && root.right === null) {
    // @step:visit
    return 1; // @step:update-height
  }

  // Both children exist — take minimum
  const leftDepth = minimumDepth(root.left); // @step:traverse-left
  const rightDepth = minimumDepth(root.right); // @step:traverse-right
  return Math.min(leftDepth, rightDepth) + 1; // @step:update-height
}
