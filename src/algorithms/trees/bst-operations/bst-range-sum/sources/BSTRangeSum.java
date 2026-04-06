// BST Range Sum (Recursive) — sum all nodes with values in [lowValue, highValue]

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTRangeSum {
    public int bstRangeSum(BSTNode root, int lowValue, int highValue) {
        if (root == null) return 0; // @step:initialize

        int sum = 0;

        if (root.value >= lowValue && root.value <= highValue) {
            // Current node is in range — add its value
            sum += root.value; // @step:found
        }

        if (root.value > lowValue) {
            // Left subtree may contain values in range
            sum += bstRangeSum(root.left, lowValue, highValue); // @step:search-node
        }

        if (root.value < highValue) {
            // Right subtree may contain values in range
            sum += bstRangeSum(root.right, lowValue, highValue); // @step:search-node
        }

        return sum; // @step:complete
    }
}
