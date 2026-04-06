// BST Search (Iterative) — while loop binary search, no recursion

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTSearchIterative {
    public BSTNode bstSearchIterative(BSTNode root, int target) {
        BSTNode current = root; // @step:initialize

        while (current != null) {
            if (current.value == target) return current; // @step:found

            if (target < current.value) {
                // Target is smaller — move left
                current = current.left; // @step:search-node
            } else {
                // Target is larger — move right
                current = current.right; // @step:search-node
            }
        }

        return null; // @step:complete
    }
}
