// BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

class BSTKthSmallest {
    int counter = 0; // @step:initialize
    int result = -1;

    void inorder(BSTNode* node, int kthPosition) {
        if (node == nullptr || counter >= kthPosition) return; // @step:initialize

        // Visit left subtree first (smaller values)
        inorder(node->left, kthPosition); // @step:search-node

        // Visit current node — increment counter
        counter++;
        if (counter == kthPosition) {
            result = node->value; // @step:found
            return;
        }

        // Visit right subtree (larger values)
        inorder(node->right, kthPosition); // @step:search-node
    }

public:
    int bstKthSmallest(BSTNode* root, int kthPosition) {
        counter = 0;
        result = -1;
        inorder(root, kthPosition);
        return result; // @step:complete
    }
};
