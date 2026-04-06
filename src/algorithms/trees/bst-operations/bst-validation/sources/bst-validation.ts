// BST Validation (Recursive) — validate BST property using min/max bounds

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstValidation(root: BSTNode | null): boolean {
  function validate(node: BSTNode | null, minVal: number, maxVal: number): boolean {
    if (node === null) return true; // @step:initialize

    if (node.value <= minVal || node.value >= maxVal) {
      // Node value violates BST bounds
      return false; // @step:found
    }

    // Recurse: left subtree values must be less than current node
    // Right subtree values must be greater than current node
    return (
      validate(node.left, minVal, node.value) && // @step:search-node
      validate(node.right, node.value, maxVal) // @step:search-node
    );
  }

  return validate(root, -Infinity, Infinity); // @step:complete
}
