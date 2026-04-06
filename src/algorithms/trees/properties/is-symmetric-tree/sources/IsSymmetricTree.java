// Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

class SymmetricTreeNode {
    int value;
    SymmetricTreeNode left, right;
    SymmetricTreeNode(int value) { this.value = value; }
}

class IsSymmetricTree {
    public boolean isSymmetricTree(SymmetricTreeNode root) {
        if (root == null) return true; // @step:initialize
        return isMirror(root.left, root.right); // @step:complete
    }

    private boolean isMirror(SymmetricTreeNode leftNode, SymmetricTreeNode rightNode) {
        if (leftNode == null && rightNode == null) return true; // @step:check-balance
        if (leftNode == null || rightNode == null) return false; // @step:check-balance
        if (leftNode.value != rightNode.value) return false; // @step:check-balance

        // Outer pair and inner pair must both be mirrors
        boolean outerMatch = isMirror(leftNode.left, rightNode.right); // @step:traverse-left
        boolean innerMatch = isMirror(leftNode.right, rightNode.left); // @step:traverse-right
        return outerMatch && innerMatch; // @step:check-balance
    }
}
