// Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)

#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BoundaryTraversal {
public:
    bool isLeaf(BSTNode* node) {
        return node->left == nullptr && node->right == nullptr;
    }

    void addLeftBoundary(BSTNode* node, std::vector<int>& result) {
        // @step:traverse-left
        if (node == nullptr || isLeaf(node)) return; // @step:traverse-left
        result.push_back(node->value);               // @step:traverse-left
        if (node->left != nullptr) {
            // @step:traverse-left
            addLeftBoundary(node->left, result); // @step:traverse-left
        } else {
            // @step:traverse-left
            addLeftBoundary(node->right, result); // @step:traverse-left
        }
    }

    void addLeaves(BSTNode* node, std::vector<int>& result) {
        // @step:visit
        if (node == nullptr) return; // @step:visit
        if (isLeaf(node)) {
            // @step:visit
            result.push_back(node->value); // @step:visit
            return;                        // @step:visit
        }
        addLeaves(node->left, result);  // @step:visit
        addLeaves(node->right, result); // @step:visit
    }

    void addRightBoundary(BSTNode* node, std::vector<int>& result) {
        // @step:traverse-right
        if (node == nullptr || isLeaf(node)) return; // @step:traverse-right
        if (node->right != nullptr) {
            // @step:traverse-right
            addRightBoundary(node->right, result); // @step:traverse-right
        } else {
            // @step:traverse-right
            addRightBoundary(node->left, result); // @step:traverse-right
        }
        result.push_back(node->value); // @step:traverse-right (added after recursion for bottom-up)
    }

    std::vector<int> boundaryTraversal(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        if (!isLeaf(root)) result.push_back(root->value); // @step:initialize

        addLeftBoundary(root->left, result);  // @step:traverse-left
        addLeaves(root, result);               // @step:visit
        addRightBoundary(root->right, result); // @step:traverse-right

        return result; // @step:complete
    }
};
