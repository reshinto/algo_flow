// Minimum Depth of Binary Tree — recursive DFS to nearest leaf

#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class MinimumDepth {
public:
    int minimumDepth(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        // If only right child exists, recurse right
        if (root->left == nullptr && root->right != nullptr) {
            // @step:visit
            return minimumDepth(root->right) + 1; // @step:traverse-right
        }

        // If only left child exists, recurse left
        if (root->right == nullptr && root->left != nullptr) {
            // @step:visit
            return minimumDepth(root->left) + 1; // @step:traverse-left
        }

        // If leaf node, depth is 1
        if (root->left == nullptr && root->right == nullptr) {
            // @step:visit
            return 1; // @step:update-height
        }

        // Both children exist — take minimum
        int leftDepth = minimumDepth(root->left);   // @step:traverse-left
        int rightDepth = minimumDepth(root->right); // @step:traverse-right
        return std::min(leftDepth, rightDepth) + 1; // @step:update-height
    }
};
