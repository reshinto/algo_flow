// BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)

#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTPreorder {
public:
    void traverse(BSTNode* node, std::vector<int>& result) {
        if (node == nullptr) return; // @step:initialize

        // Visit the current node first — root before any subtrees
        result.push_back(node->value); // @step:visit
        // Recurse into the left subtree
        traverse(node->left, result); // @step:traverse-left
        // Recurse into the right subtree
        traverse(node->right, result); // @step:traverse-right
    }

    std::vector<int> bstPreorder(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        traverse(root, result);   // @step:initialize
        return result;             // @step:complete
    }
};
