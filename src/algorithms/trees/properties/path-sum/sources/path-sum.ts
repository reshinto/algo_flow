// Path Sum — recursive DFS: check if any root-to-leaf path sums to target

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function pathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) return false; // @step:initialize

  // Leaf node — check if remaining sum equals node value
  if (root.left === null && root.right === null) {
    // @step:visit
    return root.value === targetSum; // @step:check-balance
  }

  const remaining = targetSum - root.value; // @step:compute-value

  // Recurse on left and right subtrees
  const foundLeft = pathSum(root.left, remaining); // @step:traverse-left
  if (foundLeft) return true; // @step:check-balance

  const foundRight = pathSum(root.right, remaining); // @step:traverse-right
  return foundRight; // @step:complete
}
