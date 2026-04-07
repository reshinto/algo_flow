// Delete Leaves With Value — post-order recursive: remove leaf if value matches target

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* deleteLeavesWithValue(BinaryNode* root, int targetValue) {
    if (root == nullptr) return nullptr; // @step:initialize

    // Recursively process children first (post-order)
    root->left = deleteLeavesWithValue(root->left, targetValue); // @step:traverse-left
    root->right = deleteLeavesWithValue(root->right, targetValue); // @step:traverse-right

    // Check if the current node is now a leaf with the target value
    if (root->left == nullptr && root->right == nullptr && root->value == targetValue) {
        // @step:compare
        delete root;
        return nullptr; // @step:delete-node
    }

    return root; // @step:visit
}
