// BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

class BSTToGreaterTree {
    int runningSum = 0; // @step:initialize

    void reverseInorder(BSTNode* node) {
        if (node == nullptr) return; // @step:initialize

        // Visit right subtree first (larger values in descending order)
        reverseInorder(node->right); // @step:search-node

        // Add current node's value to running sum, then update node
        runningSum += node->value; // @step:found
        node->value = runningSum;

        // Visit left subtree (smaller values)
        reverseInorder(node->left); // @step:search-node
    }

public:
    BSTNode* bstToGreaterTree(BSTNode* root) {
        runningSum = 0;
        reverseInorder(root);
        return root; // @step:complete
    }
};
