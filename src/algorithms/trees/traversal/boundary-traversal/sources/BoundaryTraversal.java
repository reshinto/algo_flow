// Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)
import java.util.ArrayList;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BoundaryTraversal {
    private boolean isLeaf(BSTNode node) {
        return node.left == null && node.right == null;
    }

    private void addLeftBoundary(BSTNode node, List<Integer> result) { // @step:traverse-left
        if (node == null || isLeaf(node)) return; // @step:traverse-left
        result.add(node.value); // @step:traverse-left
        if (node.left != null) { // @step:traverse-left
            addLeftBoundary(node.left, result); // @step:traverse-left
        } else { // @step:traverse-left
            addLeftBoundary(node.right, result); // @step:traverse-left
        }
    }

    private void addLeaves(BSTNode node, List<Integer> result) { // @step:visit
        if (node == null) return; // @step:visit
        if (isLeaf(node)) { // @step:visit
            result.add(node.value); // @step:visit
            return; // @step:visit
        }
        addLeaves(node.left, result); // @step:visit
        addLeaves(node.right, result); // @step:visit
    }

    private void addRightBoundary(BSTNode node, List<Integer> result) { // @step:traverse-right
        if (node == null || isLeaf(node)) return; // @step:traverse-right
        if (node.right != null) { // @step:traverse-right
            addRightBoundary(node.right, result); // @step:traverse-right
        } else { // @step:traverse-right
            addRightBoundary(node.left, result); // @step:traverse-right
        }
        result.add(node.value); // @step:traverse-right
    }

    public List<Integer> boundaryTraversal(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        if (!isLeaf(root)) result.add(root.value); // @step:initialize

        addLeftBoundary(root.left, result); // @step:traverse-left
        addLeaves(root, result); // @step:visit
        addRightBoundary(root.right, result); // @step:traverse-right

        return result; // @step:complete
    }
}
