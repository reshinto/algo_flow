// Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class MaximumDepth {
public:
    int maximumDepth(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        // Recursively compute depth of left and right subtrees
        int leftDepth = maximumDepth(root->left);   // @step:traverse-left
        int rightDepth = maximumDepth(root->right); // @step:traverse-right

        // Return the larger subtree depth plus 1 for the current node
        return std::max(leftDepth, rightDepth) + 1; // @step:update-height
    }
};
