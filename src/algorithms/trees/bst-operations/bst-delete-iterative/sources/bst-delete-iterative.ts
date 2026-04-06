// BST Delete (Iterative) — 3 cases using while loop with parent tracking

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstDeleteIterative(root: BSTNode | null, deleteValue: number): BSTNode | null {
  let parent: BSTNode | null = null; // @step:initialize
  let current = root;

  // Find the node to delete and its parent
  while (current !== null && current.value !== deleteValue) {
    parent = current;
    if (deleteValue < current.value) {
      current = current.left; // @step:search-node
    } else {
      current = current.right; // @step:search-node
    }
  }

  if (current === null) return root; // @step:complete — value not found

  // Case: node has two children — replace with inorder successor
  if (current.left !== null && current.right !== null) {
    let successorParent: BSTNode = current;
    let successor: BSTNode = current.right;
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left; // @step:search-node
    }
    current.value = successor.value; // @step:delete-child
    // Now delete the successor
    current = successor;
    parent = successorParent;
  }

  // Case: node has 0 or 1 child
  const child = current.left !== null ? current.left : current.right;

  if (parent === null) return child; // @step:delete-child — deleting root

  if (parent.left === current) {
    parent.left = child; // @step:delete-child
  } else {
    parent.right = child; // @step:delete-child
  }

  return root; // @step:complete
}
