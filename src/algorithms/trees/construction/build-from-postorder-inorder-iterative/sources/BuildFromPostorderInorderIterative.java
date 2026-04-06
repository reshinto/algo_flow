// Build Binary Tree from Postorder + Inorder (Iterative with Stack)
// Processes postorder right-to-left; uses inorder (right-to-left) to detect
// when to switch from right-child insertion to left-child insertion.
import java.util.Stack;

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class BuildFromPostorderInorderIterative {
    public TreeNode buildFromPostorderInorderIterative(int[] postorder, int[] inorder) {
        if (postorder.length == 0) return null; // @step:initialize

        TreeNode root = new TreeNode(postorder[postorder.length - 1]); // @step:build-node
        Stack<TreeNode> stack = new Stack<>(); // @step:initialize
        stack.push(root); // @step:initialize
        int inorderPointer = inorder.length - 1; // @step:initialize

        for (int postorderPointer = postorder.length - 2; postorderPointer >= 0; postorderPointer--) { // @step:select-element
            int currentValue = postorder[postorderPointer]; // @step:select-element
            TreeNode parentNode = stack.peek(); // @step:search-node
            TreeNode newNode = new TreeNode(currentValue); // @step:build-node

            // If stack top does not match inorder, attach as right child
            if (parentNode.value != inorder[inorderPointer]) {
                parentNode.right = newNode; // @step:connect-child
            } else {
                // Pop matching nodes to find the left-child parent
                while (!stack.isEmpty() && stack.peek().value == inorder[inorderPointer]) { // @step:partition-array
                    parentNode = stack.pop(); // @step:partition-array
                    inorderPointer--; // @step:partition-array
                }
                parentNode.left = newNode; // @step:connect-child
            }

            stack.push(newNode); // @step:visit
        }

        return root; // @step:visit
    }
}
