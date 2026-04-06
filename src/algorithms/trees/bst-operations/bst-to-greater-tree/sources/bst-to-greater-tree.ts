// BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstToGreaterTree(root: BSTNode | null): BSTNode | null {
  let runningSum = 0; // @step:initialize

  function reverseInorder(node: BSTNode | null): void {
    if (node === null) return; // @step:initialize

    // Visit right subtree first (larger values in descending order)
    reverseInorder(node.right); // @step:search-node

    // Add current node's value to running sum, then update node
    runningSum += node.value; // @step:found
    node.value = runningSum;

    // Visit left subtree (smaller values)
    reverseInorder(node.left); // @step:search-node
  }

  reverseInorder(root);
  return root; // @step:complete
}
