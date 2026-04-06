// Sum of Left Leaves — recursive: sum values of all left leaf nodes

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sumOfLeftLeaves(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  function dfs(node: TreeNode | null, isLeft: boolean): number {
    if (node === null) return 0; // @step:initialize

    // Left leaf node contributes its value
    if (node.left === null && node.right === null && isLeft) {
      // @step:visit
      return node.value; // @step:add-to-result
    }

    const leftSum = dfs(node.left, true); // @step:traverse-left
    const rightSum = dfs(node.right, false); // @step:traverse-right
    return leftSum + rightSum; // @step:compute-value
  }

  return dfs(root, false); // @step:complete
}
