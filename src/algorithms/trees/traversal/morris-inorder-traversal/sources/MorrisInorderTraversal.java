// Morris In-Order Traversal — O(1) space in-order traversal using temporary threading
import java.util.ArrayList;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class MorrisInorderTraversal {
    public List<Integer> morrisInorderTraversal(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        BSTNode current = root; // @step:initialize

        while (current != null) { // @step:initialize
            if (current.left == null) { // @step:visit
                // No left child — visit current and move right
                result.add(current.value); // @step:visit
                current = current.right; // @step:traverse-right
            } else {
                // Find the inorder predecessor (rightmost node in left subtree)
                BSTNode predecessor = current.left; // @step:thread-node
                while (predecessor.right != null && predecessor.right != current) { // @step:thread-node
                    predecessor = predecessor.right; // @step:thread-node
                }

                if (predecessor.right == null) { // @step:thread-node
                    // Thread: make predecessor point back to current
                    predecessor.right = current; // @step:thread-node
                    current = current.left; // @step:traverse-left
                } else {
                    // Unthread: restore predecessor's right, visit current, move right
                    predecessor.right = null; // @step:unthread-node
                    result.add(current.value); // @step:visit
                    current = current.right; // @step:traverse-right
                }
            }
        }

        return result; // @step:complete
    }
}
