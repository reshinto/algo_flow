// Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function cousinsInBinaryTree(
  root: TreeNode | null,
  nodeValueA: number,
  nodeValueB: number,
): boolean {
  if (root === null) return false; // @step:initialize

  const queue: Array<[TreeNode, TreeNode | null, number]> = [[root, null, 0]]; // @step:initialize

  let parentA: TreeNode | null = null; // @step:initialize
  let parentB: TreeNode | null = null; // @step:initialize
  let depthA = -1; // @step:initialize
  let depthB = -1; // @step:initialize

  while (queue.length > 0) {
    // @step:visit
    const entry = queue.shift()!; // @step:visit
    const [current, parent, currentDepth] = entry; // @step:visit

    if (current.value === nodeValueA) {
      // @step:check-balance
      parentA = parent; // @step:check-balance
      depthA = currentDepth; // @step:update-height
    }

    if (current.value === nodeValueB) {
      // @step:check-balance
      parentB = parent; // @step:check-balance
      depthB = currentDepth; // @step:update-height
    }

    if (current.left !== null) queue.push([current.left, current, currentDepth + 1]); // @step:traverse-left
    if (current.right !== null) queue.push([current.right, current, currentDepth + 1]); // @step:traverse-right
  }

  // Cousins: same depth, different parents
  return depthA === depthB && parentA !== parentB; // @step:complete
}
