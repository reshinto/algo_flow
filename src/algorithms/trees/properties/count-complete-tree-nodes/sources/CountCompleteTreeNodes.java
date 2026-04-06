// Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

class CompleteTreeNode {
    int value;
    CompleteTreeNode left, right;
    CompleteTreeNode(int value) { this.value = value; }
}

class CountCompleteTreeNodes {
    public int countCompleteTreeNodes(CompleteTreeNode root) {
        if (root == null) return 0; // @step:initialize

        // Compute left-most height and right-most height
        int leftHeight = 0; // @step:initialize
        int rightHeight = 0; // @step:initialize

        CompleteTreeNode leftCursor = root; // @step:traverse-left
        while (leftCursor != null) { // @step:traverse-left
            leftHeight++; // @step:update-height
            leftCursor = leftCursor.left; // @step:traverse-left
        }

        CompleteTreeNode rightCursor = root; // @step:traverse-right
        while (rightCursor != null) { // @step:traverse-right
            rightHeight++; // @step:update-height
            rightCursor = rightCursor.right; // @step:traverse-right
        }

        // If heights match, the tree is a perfect binary tree
        if (leftHeight == rightHeight) { // @step:check-balance
            return (int) Math.pow(2, leftHeight) - 1; // @step:add-to-result
        }

        // Otherwise recurse on both subtrees
        int leftCount = countCompleteTreeNodes(root.left); // @step:traverse-left
        int rightCount = countCompleteTreeNodes(root.right); // @step:traverse-right
        return leftCount + rightCount + 1; // @step:add-to-result
    }
}
