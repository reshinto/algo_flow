// Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function binaryTreeTilt(root: TreeNode | null): number {
  let totalTilt = 0; // @step:initialize

  function subtreeSum(node: TreeNode | null): number {
    if (node === null) return 0; // @step:initialize

    const leftSum = subtreeSum(node.left); // @step:traverse-left
    const rightSum = subtreeSum(node.right); // @step:traverse-right

    // Tilt at this node is absolute difference of left and right sums
    const nodeTilt = Math.abs(leftSum - rightSum); // @step:compute-value
    totalTilt += nodeTilt; // @step:add-to-result

    return leftSum + rightSum + node.value; // @step:update-height
  }

  subtreeSum(root); // @step:initialize
  return totalTilt; // @step:complete
}
