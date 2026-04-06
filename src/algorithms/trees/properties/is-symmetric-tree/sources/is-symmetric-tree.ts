// Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSymmetricTree(root: TreeNode | null): boolean {
  if (root === null) return true; // @step:initialize

  function isMirror(leftNode: TreeNode | null, rightNode: TreeNode | null): boolean {
    if (leftNode === null && rightNode === null) return true; // @step:check-balance
    if (leftNode === null || rightNode === null) return false; // @step:check-balance
    if (leftNode.value !== rightNode.value) return false; // @step:check-balance

    // Outer pair and inner pair must both be mirrors
    const outerMatch = isMirror(leftNode.left, rightNode.right); // @step:traverse-left
    const innerMatch = isMirror(leftNode.right, rightNode.left); // @step:traverse-right
    return outerMatch && innerMatch; // @step:check-balance
  }

  return isMirror(root.left, root.right); // @step:complete
}
