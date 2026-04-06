// BST Search (Recursive) — compare target, recurse left or right

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstSearch(root: BSTNode | null, target: number): BSTNode | null {
  if (root === null) return null; // @step:initialize
  if (root.value === target) return root; // @step:found

  if (target < root.value) {
    // Target is smaller — search the left subtree
    return bstSearch(root.left, target); // @step:search-node
  } else {
    // Target is larger — search the right subtree
    return bstSearch(root.right, target); // @step:search-node
  }
}
