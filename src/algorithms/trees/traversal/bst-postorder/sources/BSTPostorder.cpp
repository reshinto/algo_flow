// BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)

#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTPostorder {
public:
    void traverse(BSTNode* node, std::vector<int>& result) {
        if (node == nullptr) return; // @step:initialize

        // Recurse into the left subtree first
        traverse(node->left, result); // @step:traverse-left
        // Recurse into the right subtree
        traverse(node->right, result); // @step:traverse-right
        // Visit the root last — after both children have been processed
        result.push_back(node->value); // @step:visit
    }

    std::vector<int> bstPostorder(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        traverse(root, result);   // @step:initialize
        return result;             // @step:complete
    }
};
