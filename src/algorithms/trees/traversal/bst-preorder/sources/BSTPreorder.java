// BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)
import java.util.ArrayList;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTPreorder {
    public List<Integer> bstPreorder(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        traverse(root, result); // @step:initialize
        return result; // @step:complete
    }

    private void traverse(BSTNode node, List<Integer> result) {
        if (node == null) return; // @step:initialize

        // Visit the current node first — root before any subtrees
        result.add(node.value); // @step:visit
        // Recurse into the left subtree
        traverse(node.left, result); // @step:traverse-left
        // Recurse into the right subtree
        traverse(node.right, result); // @step:traverse-right
    }
}
