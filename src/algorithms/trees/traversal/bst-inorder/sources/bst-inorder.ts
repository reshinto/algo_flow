// BST In-Order Traversal — left subtree, visit root, then right subtree

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstInorder(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize

  function traverse(node: BSTNode | null): void {
    if (node === null) return; // @step:initialize

    // Recurse into the left subtree first — smaller values come before root
    traverse(node.left); // @step:traverse-left
    // Record the root value — in-order guarantees sorted output for a valid BST
    result.push(node.value); // @step:visit
    // Recurse into the right subtree — larger values come after root
    traverse(node.right); // @step:traverse-right
  }

  traverse(root); // @step:initialize
  return result; // @step:complete
}
