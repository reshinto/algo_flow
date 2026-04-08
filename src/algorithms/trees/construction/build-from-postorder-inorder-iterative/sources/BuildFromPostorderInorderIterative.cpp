// Build Binary Tree from Postorder + Inorder (Iterative with Stack)
// Processes postorder right-to-left; uses inorder (processed right-to-left too)
// to determine when to switch from right-child insertion to left-child insertion.

#include <vector>
#include <stack>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

TreeNode* buildFromPostorderInorderIterative(const std::vector<int>& postorder, const std::vector<int>& inorder) {
    if (postorder.empty()) return nullptr; // @step:initialize

    int lastValue = postorder.back(); // @step:initialize
    TreeNode* root = new TreeNode(lastValue); // @step:build-node
    std::stack<TreeNode*> stack; // @step:initialize
    stack.push(root);
    int inorderPointer = (int)inorder.size() - 1; // @step:initialize

    for (int postorderPointer = (int)postorder.size() - 2; postorderPointer >= 0; postorderPointer--) {
        // @step:select-element
        int currentValue = postorder[postorderPointer]; // @step:select-element

        TreeNode* parentNode = stack.top(); // @step:search-node
        TreeNode* newNode = new TreeNode(currentValue); // @step:build-node

        // If stack top differs from current inorder pointer, insert as right child
        if (parentNode->value != inorder[inorderPointer]) {
            parentNode->right = newNode; // @step:connect-child
        } else {
            // Pop nodes matching inorder (right-to-left) to find left-child parent
            while (!stack.empty() && stack.top()->value == inorder[inorderPointer]) {
                // @step:partition-array
                parentNode = stack.top(); // @step:partition-array
                stack.pop();
                inorderPointer--; // @step:partition-array
            }
            parentNode->left = newNode; // @step:connect-child
        }

        stack.push(newNode); // @step:visit
    }

    return root; // @step:visit
}
