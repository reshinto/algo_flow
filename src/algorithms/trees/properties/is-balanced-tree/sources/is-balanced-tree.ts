// Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isBalancedTree(root: TreeNode | null): boolean {
  // Returns -1 if unbalanced, otherwise returns height of the subtree
  function checkHeight(node: TreeNode | null): number {
    if (node === null) return 0; // @step:initialize

    const leftHeight = checkHeight(node.left); // @step:traverse-left
    if (leftHeight === -1) return -1; // @step:check-balance

    const rightHeight = checkHeight(node.right); // @step:traverse-right
    if (rightHeight === -1) return -1; // @step:check-balance

    // Unbalanced if height difference exceeds 1
    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // @step:check-balance

    return Math.max(leftHeight, rightHeight) + 1; // @step:update-height
  }

  return checkHeight(root) !== -1; // @step:complete
}
