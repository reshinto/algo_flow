// Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

class BalancedTreeNode {
    int value;
    BalancedTreeNode left, right;
    BalancedTreeNode(int value) { this.value = value; }
}

class IsBalancedTree {
    public boolean isBalancedTree(BalancedTreeNode root) {
        return checkHeight(root) != -1; // @step:complete
    }

    // Returns -1 if unbalanced, otherwise returns height of the subtree
    private int checkHeight(BalancedTreeNode node) {
        if (node == null) return 0; // @step:initialize

        int leftHeight = checkHeight(node.left); // @step:traverse-left
        if (leftHeight == -1) return -1; // @step:check-balance

        int rightHeight = checkHeight(node.right); // @step:traverse-right
        if (rightHeight == -1) return -1; // @step:check-balance

        // Unbalanced if height difference exceeds 1
        if (Math.abs(leftHeight - rightHeight) > 1) return -1; // @step:check-balance

        return Math.max(leftHeight, rightHeight) + 1; // @step:update-height
    }
}
