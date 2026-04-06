// BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTRecoverSwapped {
    private BSTNode firstViolation = null; // @step:initialize
    private BSTNode secondViolation = null;
    private BSTNode previousNode = null;

    public void bstRecoverSwapped(BSTNode root) {
        firstViolation = null; // @step:initialize
        secondViolation = null;
        previousNode = null;
        inorder(root);

        // Swap the values of the two misplaced nodes to recover the BST
        if (firstViolation != null && secondViolation != null) {
            int temp = firstViolation.value;
            firstViolation.value = secondViolation.value; // @step:complete
            secondViolation.value = temp;
        }
    }

    private void inorder(BSTNode node) {
        if (node == null) return; // @step:initialize

        inorder(node.left); // @step:search-node

        // Check if BST property is violated at this position
        if (previousNode != null && previousNode.value > node.value) {
            if (firstViolation == null) {
                // First violation: previous is the first swapped node
                firstViolation = previousNode; // @step:found
            }
            // Second violation: current is always updated to the second swapped node
            secondViolation = node; // @step:found
        }

        previousNode = node;
        inorder(node.right); // @step:search-node
    }
}
