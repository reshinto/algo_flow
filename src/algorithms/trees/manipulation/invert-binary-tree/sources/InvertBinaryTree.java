// Invert Binary Tree — recursive: swap left and right children at every node

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class InvertBinaryTree {
    public BinaryNode invertBinaryTree(BinaryNode root) {
        if (root == null) return null; // @step:initialize

        // Recursively invert the left subtree
        BinaryNode invertedLeft = invertBinaryTree(root.left); // @step:traverse-left
        // Recursively invert the right subtree
        BinaryNode invertedRight = invertBinaryTree(root.right); // @step:traverse-right

        // Swap left and right children
        root.left = invertedRight; // @step:swap-children
        root.right = invertedLeft; // @step:swap-children

        return root; // @step:visit
    }
}
