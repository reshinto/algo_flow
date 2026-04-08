// Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

#include <cmath>
#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class IsBalancedTree {
public:
    // Returns -1 if unbalanced, otherwise returns height of the subtree
    int checkHeight(TreeNode* node) {
        if (node == nullptr) return 0; // @step:initialize

        int leftHeight = checkHeight(node->left); // @step:traverse-left
        if (leftHeight == -1) return -1; // @step:check-balance

        int rightHeight = checkHeight(node->right); // @step:traverse-right
        if (rightHeight == -1) return -1; // @step:check-balance

        // Unbalanced if height difference exceeds 1
        if (std::abs(leftHeight - rightHeight) > 1) return -1; // @step:check-balance

        return std::max(leftHeight, rightHeight) + 1; // @step:update-height
    }

    bool isBalancedTree(TreeNode* root) {
        return checkHeight(root) != -1; // @step:complete
    }
};
