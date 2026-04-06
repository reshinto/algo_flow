// BST Insert (Recursive) — find correct leaf position and insert new node

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTInsert {
    public BSTNode bstInsert(BSTNode root, int insertValue) {
        if (root == null) {
            // Base case: insert new node at this position
            return new BSTNode(insertValue); // @step:insert-child
        }

        if (insertValue < root.value) {
            // Insert value is smaller — recurse into left subtree
            root.left = bstInsert(root.left, insertValue); // @step:search-node
        } else if (insertValue > root.value) {
            // Insert value is larger — recurse into right subtree
            root.right = bstInsert(root.right, insertValue); // @step:search-node
        }
        // Duplicate values are ignored

        return root; // @step:complete
    }
}
