// Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function maximumDepth(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  // Recursively compute depth of left and right subtrees
  const leftDepth = maximumDepth(root.left); // @step:traverse-left
  const rightDepth = maximumDepth(root.right); // @step:traverse-right

  // Return the larger subtree depth plus 1 for the current node
  return Math.max(leftDepth, rightDepth) + 1; // @step:update-height
}
