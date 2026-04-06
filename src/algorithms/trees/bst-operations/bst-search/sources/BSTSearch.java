// BST Search (Recursive) — compare target, recurse left or right

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTSearch {
    public BSTNode bstSearch(BSTNode root, int target) {
        if (root == null) return null; // @step:initialize
        if (root.value == target) return root; // @step:found

        if (target < root.value) {
            // Target is smaller — search the left subtree
            return bstSearch(root.left, target); // @step:search-node
        } else {
            // Target is larger — search the right subtree
            return bstSearch(root.right, target); // @step:search-node
        }
    }
}
