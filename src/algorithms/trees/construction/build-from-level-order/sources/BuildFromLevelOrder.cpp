// Build BST from Level-Order Sequence
// Insert each value from the level-order array into a BST using standard BST insertion.
// The resulting tree's level-order traversal will match the input array.

#include <vector>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

TreeNode* bstInsert(TreeNode* current, int value) {
    // @step:initialize
    if (current == nullptr) {
        return new TreeNode(value); // @step:build-node
    }

    if (value < current->value) {
        current->left = bstInsert(current->left, value); // @step:connect-child
    } else if (value > current->value) {
        current->right = bstInsert(current->right, value); // @step:connect-child
    }

    return current; // @step:visit
}

TreeNode* buildFromLevelOrder(const std::vector<int>& levelOrder) {
    if (levelOrder.empty()) return nullptr; // @step:initialize

    TreeNode* root = nullptr; // @step:initialize

    for (int value : levelOrder) {
        // @step:select-element
        root = bstInsert(root, value); // @step:build-node
    }

    return root; // @step:complete
}
