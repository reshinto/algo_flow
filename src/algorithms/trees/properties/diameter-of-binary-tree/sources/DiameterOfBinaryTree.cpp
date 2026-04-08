// Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class DiameterOfBinaryTree {
public:
    int maxDiameter = 0; // @step:initialize

    int computeHeight(TreeNode* node) {
        if (node == nullptr) return 0; // @step:initialize

        int leftHeight = computeHeight(node->left); // @step:traverse-left
        int rightHeight = computeHeight(node->right); // @step:traverse-right

        // Update global max diameter — path through this node spans leftHeight + rightHeight edges
        maxDiameter = std::max(maxDiameter, leftHeight + rightHeight); // @step:update-height

        return std::max(leftHeight, rightHeight) + 1; // @step:update-height
    }

    int diameterOfBinaryTree(TreeNode* root) {
        maxDiameter = 0; // @step:initialize
        computeHeight(root); // @step:initialize
        return maxDiameter; // @step:complete
    }
};
