// Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0; // @step:initialize

  function computeHeight(node: TreeNode | null): number {
    if (node === null) return 0; // @step:initialize

    const leftHeight = computeHeight(node.left); // @step:traverse-left
    const rightHeight = computeHeight(node.right); // @step:traverse-right

    // Update global max diameter — path through this node spans leftHeight + rightHeight edges
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight); // @step:update-height

    return Math.max(leftHeight, rightHeight) + 1; // @step:update-height
  }

  computeHeight(root); // @step:initialize
  return maxDiameter; // @step:complete
}
