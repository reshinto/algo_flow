// Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sumOfLeftLeavesIterative(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  const stack: Array<[TreeNode, boolean]> = [[root, false]]; // @step:initialize
  let totalSum = 0; // @step:initialize

  while (stack.length > 0) {
    // @step:visit
    const entry = stack.pop()!; // @step:visit
    const [current, isLeft] = entry; // @step:visit

    // Accumulate value when we find a left leaf
    if (current.left === null && current.right === null && isLeft) {
      // @step:check-balance
      totalSum += current.value; // @step:add-to-result
    }

    if (current.right !== null) {
      // @step:traverse-right
      stack.push([current.right, false]); // @step:traverse-right
    }

    if (current.left !== null) {
      // @step:traverse-left
      stack.push([current.left, true]); // @step:traverse-left
    }
  }

  return totalSum; // @step:complete
}
