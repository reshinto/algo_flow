// BST Lowest Common Ancestor (Recursive) — use BST property to find split point

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTLowestCommonAncestor {
    public BSTNode bstLowestCommonAncestor(BSTNode root, int nodeValueA, int nodeValueB) {
        if (root == null) return null; // @step:initialize

        if (nodeValueA < root.value && nodeValueB < root.value) {
            // Both values are smaller — LCA must be in the left subtree
            return bstLowestCommonAncestor(root.left, nodeValueA, nodeValueB); // @step:search-node
        }

        if (nodeValueA > root.value && nodeValueB > root.value) {
            // Both values are larger — LCA must be in the right subtree
            return bstLowestCommonAncestor(root.right, nodeValueA, nodeValueB); // @step:search-node
        }

        // Values split across root (or one equals root) — current node is the LCA
        return root; // @step:found
    }
}
