// Binary Tree Pruning — remove all subtrees containing no 1s (post-order)

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BinaryNode* binaryTreePruning(BinaryNode* root) {
    if (!root) return nullptr; // @step:initialize

    // Post-order: prune children first, then decide current node
    root->left = binaryTreePruning(root->left); // @step:traverse-left
    root->right = binaryTreePruning(root->right); // @step:traverse-right

    // If this leaf has value 0, prune it
    if (root->value == 0 && !root->left && !root->right) {
        return nullptr; // @step:detach-node
    }

    return root; // @step:visit
}
