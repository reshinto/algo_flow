// BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTToGreaterTree {
    private int runningSum = 0; // @step:initialize

    public BSTNode bstToGreaterTree(BSTNode root) {
        runningSum = 0; // @step:initialize
        reverseInorder(root);
        return root; // @step:complete
    }

    private void reverseInorder(BSTNode node) {
        if (node == null) return; // @step:initialize

        // Visit right subtree first (larger values in descending order)
        reverseInorder(node.right); // @step:search-node

        // Add current node's value to running sum, then update node
        runningSum += node.value; // @step:found
        node.value = runningSum;

        // Visit left subtree (smaller values)
        reverseInorder(node.left); // @step:search-node
    }
}
