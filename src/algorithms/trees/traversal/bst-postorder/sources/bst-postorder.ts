// BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstPostorder(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize

  function traverse(node: BSTNode | null): void {
    if (node === null) return; // @step:initialize

    // Recurse into the left subtree first
    traverse(node.left); // @step:traverse-left
    // Recurse into the right subtree
    traverse(node.right); // @step:traverse-right
    // Visit the root last — after both children have been processed
    result.push(node.value); // @step:visit
  }

  traverse(root); // @step:initialize
  return result; // @step:complete
}
