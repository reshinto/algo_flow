// Path Sum (Iterative) — stack-based DFS with running sum tracking

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function pathSumIterative(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) return false; // @step:initialize

  const stack: Array<[TreeNode, number]> = [[root, root.value]]; // @step:initialize

  while (stack.length > 0) {
    // @step:visit
    const entry = stack.pop()!; // @step:visit
    const [current, runningSum] = entry; // @step:visit

    // Leaf node — check if path sum matches target
    if (current.left === null && current.right === null) {
      // @step:check-balance
      if (runningSum === targetSum) return true; // @step:complete
    }

    if (current.right !== null) {
      // @step:traverse-right
      stack.push([current.right, runningSum + current.right.value]); // @step:traverse-right
    }

    if (current.left !== null) {
      // @step:traverse-left
      stack.push([current.left, runningSum + current.left.value]); // @step:traverse-left
    }
  }

  return false; // @step:complete
}
