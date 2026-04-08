// BST In-Order Traversal — left subtree, visit root, then right subtree

#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTInorder {
public:
    void traverse(BSTNode* node, std::vector<int>& result) {
        if (node == nullptr) return; // @step:initialize

        // Recurse into the left subtree first — smaller values come before root
        traverse(node->left, result); // @step:traverse-left
        // Record the root value — in-order guarantees sorted output for a valid BST
        result.push_back(node->value); // @step:visit
        // Recurse into the right subtree — larger values come after root
        traverse(node->right, result); // @step:traverse-right
    }

    std::vector<int> bstInorder(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        traverse(root, result);   // @step:initialize
        return result;             // @step:complete
    }
};
