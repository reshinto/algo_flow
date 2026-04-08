// BST Validation (Recursive) — validate BST property using min/max bounds

#include <climits>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool validate(BSTNode* node, long long minVal, long long maxVal) {
    if (node == nullptr) return true; // @step:initialize

    if (node->value <= minVal || node->value >= maxVal) {
        // Node value violates BST bounds
        return false; // @step:found
    }

    // Recurse: left subtree values must be less than current node
    // Right subtree values must be greater than current node
    return validate(node->left, minVal, node->value) && // @step:search-node
           validate(node->right, node->value, maxVal); // @step:search-node
}

bool bstValidation(BSTNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX); // @step:complete
}
