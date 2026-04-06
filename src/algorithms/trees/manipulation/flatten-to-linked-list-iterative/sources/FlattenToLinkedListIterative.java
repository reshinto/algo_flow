// Flatten Binary Tree to Linked List Iterative — Morris-like: find rightmost of left subtree and rewire

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class FlattenToLinkedListIterative {
    public void flattenToLinkedListIterative(BinaryNode root) {
        BinaryNode current = root; // @step:initialize

        while (current != null) { // @step:visit
            if (current.left != null) { // @step:visit
                // Find the rightmost node of the left subtree
                BinaryNode rightmost = current.left; // @step:connect-child
                while (rightmost.right != null) { // @step:connect-child
                    rightmost = rightmost.right; // @step:connect-child
                }

                // Attach original right subtree at the rightmost node
                rightmost.right = current.right; // @step:connect-child

                // Move left subtree to right, clear left pointer
                current.right = current.left; // @step:connect-child
                current.left = null; // @step:connect-child
            }

            current = current.right; // @step:visit
        }
    }
}
