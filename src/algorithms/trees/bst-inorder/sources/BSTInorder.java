// BST In-Order Traversal — left subtree, visit root, then right subtree
import java.util.ArrayList;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTInorder {
    public List<Integer> bstInorder(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        traverse(root, result); // @step:initialize
        return result; // @step:complete
    }

    private void traverse(BSTNode node, List<Integer> result) {
        if (node == null) return; // @step:initialize

        // Recurse into the left subtree first — smaller values come before root
        traverse(node.left, result); // @step:traverse-left
        // Record the root value — in-order guarantees sorted output for a valid BST
        result.add(node.value); // @step:visit
        // Recurse into the right subtree — larger values come after root
        traverse(node.right, result); // @step:traverse-right
    }
}
