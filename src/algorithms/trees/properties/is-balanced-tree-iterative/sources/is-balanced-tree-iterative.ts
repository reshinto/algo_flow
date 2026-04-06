// Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isBalancedTreeIterative(root: TreeNode | null): boolean {
  if (root === null) return true; // @step:initialize

  const stack: Array<{ node: TreeNode; phase: number }> = []; // @step:initialize
  const heights = new Map<TreeNode, number>(); // @step:initialize

  stack.push({ node: root, phase: 0 }); // @step:initialize

  while (stack.length > 0) {
    // @step:visit
    const entry = stack[stack.length - 1]!; // @step:visit
    const { node } = entry; // @step:visit

    if (entry.phase === 0) {
      entry.phase = 1; // @step:visit
      if (node.left !== null) stack.push({ node: node.left, phase: 0 }); // @step:traverse-left
    } else if (entry.phase === 1) {
      entry.phase = 2; // @step:visit
      if (node.right !== null) stack.push({ node: node.right, phase: 0 }); // @step:traverse-right
    } else {
      stack.pop(); // @step:visit
      const leftHeight = node.left !== null ? (heights.get(node.left) ?? 0) : 0; // @step:check-balance
      const rightHeight = node.right !== null ? (heights.get(node.right) ?? 0) : 0; // @step:check-balance

      if (Math.abs(leftHeight - rightHeight) > 1) return false; // @step:check-balance

      heights.set(node, Math.max(leftHeight, rightHeight) + 1); // @step:update-height
    }
  }

  return true; // @step:complete
}
