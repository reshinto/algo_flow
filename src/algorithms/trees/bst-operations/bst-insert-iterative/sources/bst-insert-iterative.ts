// BST Insert (Iterative) — track parent, insert at correct leaf position

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstInsertIterative(root: BSTNode | null, insertValue: number): BSTNode {
  const newNode: BSTNode = { value: insertValue, left: null, right: null }; // @step:initialize

  if (root === null) return newNode; // @step:insert-child

  let current: BSTNode = root;

  while (true) {
    if (insertValue < current.value) {
      // Go left — if no left child, insert here
      if (current.left === null) {
        current.left = newNode; // @step:insert-child
        break;
      }
      current = current.left; // @step:search-node
    } else if (insertValue > current.value) {
      // Go right — if no right child, insert here
      if (current.right === null) {
        current.right = newNode; // @step:insert-child
        break;
      }
      current = current.right; // @step:search-node
    } else {
      // Duplicate value — do nothing
      break;
    }
  }

  return root; // @step:complete
}
