// BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstToGreaterTreeIterative(root: BSTNode | null): BSTNode | null {
  const stack: BSTNode[] = []; // @step:initialize
  let runningSum = 0;
  let current = root;

  while (current !== null || stack.length > 0) {
    // Push all right nodes first (reverse in-order visits right subtree first)
    while (current !== null) {
      stack.push(current); // @step:search-node
      current = current.right;
    }

    // Process the top node
    current = stack.pop()!;

    // Accumulate sum and update node value
    runningSum += current.value; // @step:found
    current.value = runningSum;

    // Move to left subtree
    current = current.left; // @step:search-node
  }

  return root; // @step:complete
}
