// BST Insert (Recursive) — find correct leaf position and insert new node

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstInsert(root: BSTNode | null, insertValue: number): BSTNode {
  if (root === null) {
    // Base case: insert new node at this position
    return { value: insertValue, left: null, right: null }; // @step:insert-child
  }

  if (insertValue < root.value) {
    // Insert value is smaller — recurse into left subtree
    root.left = bstInsert(root.left, insertValue); // @step:search-node
  } else if (insertValue > root.value) {
    // Insert value is larger — recurse into right subtree
    root.right = bstInsert(root.right, insertValue); // @step:search-node
  }
  // Duplicate values are ignored

  return root; // @step:complete
}
