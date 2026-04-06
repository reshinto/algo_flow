// Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function countCompleteTreeNodes(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  // Compute left-most height and right-most height
  let leftHeight = 0; // @step:initialize
  let rightHeight = 0; // @step:initialize

  let leftCursor: TreeNode | null = root; // @step:traverse-left
  while (leftCursor !== null) {
    // @step:traverse-left
    leftHeight += 1; // @step:update-height
    leftCursor = leftCursor.left; // @step:traverse-left
  }

  let rightCursor: TreeNode | null = root; // @step:traverse-right
  while (rightCursor !== null) {
    // @step:traverse-right
    rightHeight += 1; // @step:update-height
    rightCursor = rightCursor.right; // @step:traverse-right
  }

  // If heights match, the tree is a perfect binary tree
  if (leftHeight === rightHeight) {
    // @step:check-balance
    return Math.pow(2, leftHeight) - 1; // @step:add-to-result
  }

  // Otherwise recurse on both subtrees
  const leftCount = countCompleteTreeNodes(root.left); // @step:traverse-left
  const rightCount = countCompleteTreeNodes(root.right); // @step:traverse-right
  return leftCount + rightCount + 1; // @step:add-to-result
}
