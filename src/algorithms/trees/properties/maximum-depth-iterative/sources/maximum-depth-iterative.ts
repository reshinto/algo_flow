// Maximum Depth of Binary Tree — BFS level counting with a queue

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function maximumDepthIterative(root: TreeNode | null): number {
  if (root === null) return 0; // @step:initialize

  const queue: TreeNode[] = [root]; // @step:initialize
  let depth = 0; // @step:initialize

  while (queue.length > 0) {
    // @step:visit
    const levelSize = queue.length; // @step:visit
    depth += 1; // @step:update-height

    // Process all nodes at the current level
    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      // @step:visit
      const current = queue.shift()!; // @step:visit
      if (current.left !== null) queue.push(current.left); // @step:traverse-left
      if (current.right !== null) queue.push(current.right); // @step:traverse-right
    }
  }

  return depth; // @step:complete
}
