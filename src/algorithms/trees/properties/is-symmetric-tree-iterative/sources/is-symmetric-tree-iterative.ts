// Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSymmetricTreeIterative(root: TreeNode | null): boolean {
  if (root === null) return true; // @step:initialize

  const queue: Array<[TreeNode | null, TreeNode | null]> = []; // @step:initialize
  queue.push([root.left, root.right]); // @step:initialize

  while (queue.length > 0) {
    // @step:visit
    const pair = queue.shift()!; // @step:visit
    const [leftNode, rightNode] = pair; // @step:visit

    if (leftNode === null && rightNode === null) continue; // @step:check-balance
    if (leftNode === null || rightNode === null) return false; // @step:check-balance
    if (leftNode.value !== rightNode.value) return false; // @step:check-balance

    // Enqueue outer pair and inner pair
    queue.push([leftNode.left, rightNode.right]); // @step:traverse-left
    queue.push([leftNode.right, rightNode.left]); // @step:traverse-right
  }

  return true; // @step:complete
}
