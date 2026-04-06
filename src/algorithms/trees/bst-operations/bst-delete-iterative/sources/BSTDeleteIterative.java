// BST Delete (Iterative) — 3 cases using while loop with parent tracking

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTDeleteIterative {
    public BSTNode bstDeleteIterative(BSTNode root, int deleteValue) {
        BSTNode parent = null; // @step:initialize
        BSTNode current = root;

        // Find the node to delete and its parent
        while (current != null && current.value != deleteValue) {
            parent = current;
            if (deleteValue < current.value) {
                current = current.left; // @step:search-node
            } else {
                current = current.right; // @step:search-node
            }
        }

        if (current == null) return root; // @step:complete — value not found

        // Case: node has two children — replace with inorder successor
        if (current.left != null && current.right != null) {
            BSTNode successorParent = current;
            BSTNode successor = current.right;
            while (successor.left != null) {
                successorParent = successor;
                successor = successor.left; // @step:search-node
            }
            current.value = successor.value; // @step:delete-child
            current = successor;
            parent = successorParent;
        }

        // Case: node has 0 or 1 child
        BSTNode child = current.left != null ? current.left : current.right;

        if (parent == null) return child; // @step:delete-child — deleting root

        if (parent.left == current) {
            parent.left = child; // @step:delete-child
        } else {
            parent.right = child; // @step:delete-child
        }

        return root; // @step:complete
    }
}
