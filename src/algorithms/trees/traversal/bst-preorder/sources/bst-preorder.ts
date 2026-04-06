// BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstPreorder(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize

  function traverse(node: BSTNode | null): void {
    if (node === null) return; // @step:initialize

    // Visit the current node first — root before any subtrees
    result.push(node.value); // @step:visit
    // Recurse into the left subtree
    traverse(node.left); // @step:traverse-left
    // Recurse into the right subtree
    traverse(node.right); // @step:traverse-right
  }

  traverse(root); // @step:initialize
  return result; // @step:complete
}
