// Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class LowestCommonAncestor {
    public BinaryNode lowestCommonAncestor(BinaryNode root, int nodeValueA, int nodeValueB) {
        if (root == null) return null; // @step:initialize
        if (root.value == nodeValueA || root.value == nodeValueB) return root; // @step:compare

        // Search left and right subtrees
        BinaryNode leftResult = lowestCommonAncestor(root.left, nodeValueA, nodeValueB); // @step:traverse-left
        BinaryNode rightResult = lowestCommonAncestor(root.right, nodeValueA, nodeValueB); // @step:traverse-right

        // If both sides found a target node, current node is the LCA
        if (leftResult != null && rightResult != null) return root; // @step:visit

        // Otherwise return whichever side found a target node
        return leftResult != null ? leftResult : rightResult; // @step:visit
    }
}
