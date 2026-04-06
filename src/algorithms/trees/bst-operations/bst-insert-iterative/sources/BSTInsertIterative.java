// BST Insert (Iterative) — track parent, insert at correct leaf position

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTInsertIterative {
    public BSTNode bstInsertIterative(BSTNode root, int insertValue) {
        BSTNode newNode = new BSTNode(insertValue); // @step:initialize

        if (root == null) return newNode; // @step:insert-child

        BSTNode current = root;

        while (true) {
            if (insertValue < current.value) {
                // Go left — if no left child, insert here
                if (current.left == null) {
                    current.left = newNode; // @step:insert-child
                    break;
                }
                current = current.left; // @step:search-node
            } else if (insertValue > current.value) {
                // Go right — if no right child, insert here
                if (current.right == null) {
                    current.right = newNode; // @step:insert-child
                    break;
                }
                current = current.right; // @step:search-node
            } else {
                // Duplicate value — do nothing
                break;
            }
        }

        return root; // @step:complete
    }
}
