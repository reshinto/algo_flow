// BST Lowest Common Ancestor (Iterative) — while loop split point search

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTLowestCommonAncestorIterative {
    public BSTNode bstLowestCommonAncestorIterative(BSTNode root, int nodeValueA, int nodeValueB) {
        BSTNode current = root; // @step:initialize

        while (current != null) {
            if (nodeValueA < current.value && nodeValueB < current.value) {
                // Both values are smaller — move to left subtree
                current = current.left; // @step:search-node
            } else if (nodeValueA > current.value && nodeValueB > current.value) {
                // Both values are larger — move to right subtree
                current = current.right; // @step:search-node
            } else {
                // Values split across current (or one equals current) — found LCA
                return current; // @step:found
            }
        }

        return null; // @step:complete
    }
}
