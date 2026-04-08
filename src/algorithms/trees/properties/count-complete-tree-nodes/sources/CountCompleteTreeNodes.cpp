// Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

#include <cmath>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

int countCompleteTreeNodes(TreeNode* root) {
    if (root == nullptr) return 0; // @step:initialize

    // Compute left-most height and right-most height
    int leftHeight = 0; // @step:initialize
    int rightHeight = 0; // @step:initialize

    TreeNode* leftCursor = root; // @step:traverse-left
    while (leftCursor != nullptr) {
        // @step:traverse-left
        leftHeight += 1; // @step:update-height
        leftCursor = leftCursor->left; // @step:traverse-left
    }

    TreeNode* rightCursor = root; // @step:traverse-right
    while (rightCursor != nullptr) {
        // @step:traverse-right
        rightHeight += 1; // @step:update-height
        rightCursor = rightCursor->right; // @step:traverse-right
    }

    // If heights match, the tree is a perfect binary tree
    if (leftHeight == rightHeight) {
        // @step:check-balance
        return (int)std::pow(2, leftHeight) - 1; // @step:add-to-result
    }

    // Otherwise recurse on both subtrees
    int leftCount = countCompleteTreeNodes(root->left);   // @step:traverse-left
    int rightCount = countCompleteTreeNodes(root->right); // @step:traverse-right
    return leftCount + rightCount + 1; // @step:add-to-result
}
