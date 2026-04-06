// Maximum Path Sum — recursive: at each node compute max path through it, track global max

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function maximumPathSum(root: TreeNode | null): number {
  let globalMax = root !== null ? root.value : -Infinity; // @step:initialize

  function maxGain(node: TreeNode | null): number {
    if (node === null) return 0; // @step:initialize

    // Only include subtree if it contributes positively
    const leftGain = Math.max(maxGain(node.left), 0); // @step:traverse-left
    const rightGain = Math.max(maxGain(node.right), 0); // @step:traverse-right

    // Path through this node: left branch + node value + right branch
    const pathThroughNode = node.value + leftGain + rightGain; // @step:compute-value
    globalMax = Math.max(globalMax, pathThroughNode); // @step:update-height

    // Return max gain if we continue from this node to parent
    return node.value + Math.max(leftGain, rightGain); // @step:add-to-result
  }

  maxGain(root); // @step:initialize
  return globalMax; // @step:complete
}
