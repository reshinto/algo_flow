// Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sumRootToLeafNumbers(root: TreeNode | null): number {
  function dfs(node: TreeNode | null, runningNumber: number): number {
    if (node === null) return 0; // @step:initialize

    const currentNumber = runningNumber * 10 + node.value; // @step:compute-value

    // Leaf node — this path forms a complete number
    if (node.left === null && node.right === null) {
      // @step:visit
      return currentNumber; // @step:add-to-result
    }

    const leftSum = dfs(node.left, currentNumber); // @step:traverse-left
    const rightSum = dfs(node.right, currentNumber); // @step:traverse-right
    return leftSum + rightSum; // @step:compute-value
  }

  return dfs(root, 0); // @step:complete
}
