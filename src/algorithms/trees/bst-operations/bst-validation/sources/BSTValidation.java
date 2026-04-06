// BST Validation (Recursive) — validate BST property using min/max bounds

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTValidation {
    public boolean bstValidation(BSTNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE); // @step:complete
    }

    private boolean validate(BSTNode node, long minVal, long maxVal) {
        if (node == null) return true; // @step:initialize

        if (node.value <= minVal || node.value >= maxVal) {
            // Node value violates BST bounds
            return false; // @step:found
        }

        // Recurse: left subtree values must be less than current node
        // Right subtree values must be greater than current node
        return validate(node.left, minVal, node.value) && // @step:search-node
               validate(node.right, node.value, maxVal); // @step:search-node
    }
}
