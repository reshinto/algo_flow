// Build Binary Tree from Preorder + Inorder (Iterative with Stack)
// Uses a stack to simulate recursion — push nodes as we consume preorder values,
// pop when we detect a boundary via the inorder pointer.
import java.util.Stack;

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class BuildFromPreorderInorderIterative {
    public TreeNode buildFromPreorderInorderIterative(int[] preorder, int[] inorder) {
        if (preorder.length == 0) return null; // @step:initialize

        TreeNode root = new TreeNode(preorder[0]); // @step:build-node
        Stack<TreeNode> stack = new Stack<>(); // @step:initialize
        stack.push(root); // @step:initialize
        int inorderPointer = 0; // @step:initialize

        for (int preorderPointer = 1; preorderPointer < preorder.length; preorderPointer++) { // @step:select-element
            int currentValue = preorder[preorderPointer]; // @step:select-element
            TreeNode parentNode = stack.peek(); // @step:search-node
            TreeNode newNode = new TreeNode(currentValue); // @step:build-node

            // If top of stack does not match inorder, attach as left child
            if (parentNode.value != inorder[inorderPointer]) {
                parentNode.left = newNode; // @step:connect-child
            } else {
                // Pop matching nodes to find the parent for right child
                while (!stack.isEmpty() && stack.peek().value == inorder[inorderPointer]) { // @step:partition-array
                    parentNode = stack.pop(); // @step:partition-array
                    inorderPointer++; // @step:partition-array
                }
                parentNode.right = newNode; // @step:connect-child
            }

            stack.push(newNode); // @step:visit
        }

        return root; // @step:visit
    }
}
