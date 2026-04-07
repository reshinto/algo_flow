// BST Range Sum (Recursive) — sum all nodes with values in [lowValue, highValue]

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

int bstRangeSum(BSTNode* root, int lowValue, int highValue) {
    if (root == nullptr) return 0; // @step:initialize

    int sum = 0;

    if (root->value >= lowValue && root->value <= highValue) {
        // Current node is in range — add its value
        sum += root->value; // @step:found
    }

    if (root->value > lowValue) {
        // Left subtree may contain values in range
        sum += bstRangeSum(root->left, lowValue, highValue); // @step:search-node
    }

    if (root->value < highValue) {
        // Right subtree may contain values in range
        sum += bstRangeSum(root->right, lowValue, highValue); // @step:search-node
    }

    return sum; // @step:complete
}
