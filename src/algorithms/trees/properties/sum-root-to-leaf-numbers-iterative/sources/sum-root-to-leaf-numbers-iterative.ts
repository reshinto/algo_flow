// Sum Root to Leaf Numbers (Iterative) — stack-based number formation

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sumRootToLeafNumbersIterative(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  let totalSum = 0; // @step:initialize
  const stack: Array<[TreeNode, number]> = [[root, root.value]]; // @step:initialize

  while (stack.length > 0) {
    // @step:visit
    const entry = stack.pop()!; // @step:visit
    const [current, runningNumber] = entry; // @step:visit

    // Leaf node — add completed number to total
    if (current.left === null && current.right === null) {
      // @step:check-balance
      totalSum += runningNumber; // @step:add-to-result
    }

    if (current.right !== null) {
      // @step:traverse-right
      stack.push([current.right, runningNumber * 10 + current.right.value]); // @step:traverse-right
    }

    if (current.left !== null) {
      // @step:traverse-left
      stack.push([current.left, runningNumber * 10 + current.left.value]); // @step:traverse-left
    }
  }

  return totalSum; // @step:complete
}
