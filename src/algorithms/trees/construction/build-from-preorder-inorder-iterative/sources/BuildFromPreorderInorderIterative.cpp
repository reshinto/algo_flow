// Build Binary Tree from Preorder + Inorder (Iterative with Stack)
// Uses a stack to simulate recursion — push nodes as we consume preorder values,
// pop when we detect a boundary via the inorder pointer.

#include <vector>
#include <stack>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

TreeNode* buildFromPreorderInorderIterative(const std::vector<int>& preorder, const std::vector<int>& inorder) {
    if (preorder.empty()) return nullptr; // @step:initialize

    int firstValue = preorder[0]; // @step:initialize
    TreeNode* root = new TreeNode(firstValue); // @step:build-node
    std::stack<TreeNode*> stack; // @step:initialize
    stack.push(root);
    int inorderPointer = 0; // @step:initialize

    for (int preorderPointer = 1; preorderPointer < (int)preorder.size(); preorderPointer++) {
        // @step:select-element
        int currentValue = preorder[preorderPointer]; // @step:select-element

        TreeNode* parentNode = stack.top(); // @step:search-node
        TreeNode* newNode = new TreeNode(currentValue); // @step:build-node

        // If stack top differs from current inorder value, go left
        if (parentNode->value != inorder[inorderPointer]) {
            parentNode->left = newNode; // @step:connect-child
        } else {
            // Pop nodes that match inorder to find the parent for right insertion
            while (!stack.empty() && stack.top()->value == inorder[inorderPointer]) {
                // @step:partition-array
                parentNode = stack.top(); // @step:partition-array
                stack.pop();
                inorderPointer++; // @step:partition-array
            }
            parentNode->right = newNode; // @step:connect-child
        }

        stack.push(newNode); // @step:visit
    }

    return root; // @step:visit
}
