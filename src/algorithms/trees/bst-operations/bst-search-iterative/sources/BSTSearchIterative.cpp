// BST Search (Iterative) — while loop binary search, no recursion

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstSearchIterative(BSTNode* root, int target) {
    BSTNode* current = root; // @step:initialize

    while (current != nullptr) {
        if (current->value == target) return current; // @step:found

        if (target < current->value) {
            // Target is smaller — move left
            current = current->left; // @step:search-node
        } else {
            // Target is larger — move right
            current = current->right; // @step:search-node
        }
    }

    return nullptr; // @step:complete
}
