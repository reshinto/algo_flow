// Build BST from Level-Order Sequence
// Insert each value from the level-order array into a BST using standard BST insertion.
// The resulting tree's level-order traversal will match the input array.

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildFromLevelOrder(levelOrder: number[]): TreeNode | null {
  if (levelOrder.length === 0) return null; // @step:initialize

  let root: TreeNode | null = null; // @step:initialize

  function bstInsert(current: TreeNode | null, value: number): TreeNode {
    // @step:initialize
    if (current === null) {
      return { value, left: null, right: null }; // @step:build-node
    }

    if (value < current.value) {
      current.left = bstInsert(current.left, value); // @step:connect-child
    } else if (value > current.value) {
      current.right = bstInsert(current.right, value); // @step:connect-child
    }

    return current; // @step:visit
  }

  for (const value of levelOrder) {
    // @step:select-element
    root = bstInsert(root, value); // @step:build-node
  }

  return root; // @step:complete
}
