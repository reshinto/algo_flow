// BST Lowest Common Ancestor (Iterative) — while loop split point search

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstLowestCommonAncestorIterative(BSTNode* root, int nodeValueA, int nodeValueB) {
    BSTNode* current = root; // @step:initialize

    while (current != nullptr) {
        if (nodeValueA < current->value && nodeValueB < current->value) {
            // Both values are smaller — move to left subtree
            current = current->left; // @step:search-node
        } else if (nodeValueA > current->value && nodeValueB > current->value) {
            // Both values are larger — move to right subtree
            current = current->right; // @step:search-node
        } else {
            // Values split across current (or one equals current) — found LCA
            return current; // @step:found
        }
    }

    return nullptr; // @step:complete
}
