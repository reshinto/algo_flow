// Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

#include <cmath>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

int subtreeSum(TreeNode* node, int& totalTilt) {
    if (node == nullptr) return 0; // @step:initialize

    int leftSum = subtreeSum(node->left, totalTilt);   // @step:traverse-left
    int rightSum = subtreeSum(node->right, totalTilt); // @step:traverse-right

    // Tilt at this node is absolute difference of left and right sums
    int nodeTilt = std::abs(leftSum - rightSum); // @step:compute-value
    totalTilt += nodeTilt; // @step:add-to-result

    return leftSum + rightSum + node->value; // @step:update-height
}

int binaryTreeTilt(TreeNode* root) {
    int totalTilt = 0; // @step:initialize
    subtreeSum(root, totalTilt); // @step:initialize
    return totalTilt; // @step:complete
}
