// BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstKthSmallest(root: BSTNode | null, kthPosition: number): number {
  let counter = 0; // @step:initialize
  let result = -1;

  function inorder(node: BSTNode | null): void {
    if (node === null || counter >= kthPosition) return; // @step:initialize

    // Visit left subtree first (smaller values)
    inorder(node.left); // @step:search-node

    // Visit current node — increment counter
    counter++;
    if (counter === kthPosition) {
      result = node.value; // @step:found
      return;
    }

    // Visit right subtree (larger values)
    inorder(node.right); // @step:search-node
  }

  inorder(root);
  return result; // @step:complete
}
