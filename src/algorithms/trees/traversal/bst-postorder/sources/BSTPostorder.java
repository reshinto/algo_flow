// BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)
import java.util.ArrayList;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTPostorder {
    public List<Integer> bstPostorder(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        traverse(root, result); // @step:initialize
        return result; // @step:complete
    }

    private void traverse(BSTNode node, List<Integer> result) {
        if (node == null) return; // @step:initialize

        // Recurse into the left subtree first
        traverse(node.left, result); // @step:traverse-left
        // Recurse into the right subtree
        traverse(node.right, result); // @step:traverse-right
        // Visit the root last — after both children have been processed
        result.add(node.value); // @step:visit
    }
}
