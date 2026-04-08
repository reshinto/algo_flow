// BST Search (Recursive) — compare target, recurse left or right

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstSearch(BSTNode* root, int target) {
    if (root == nullptr) return nullptr; // @step:initialize
    if (root->value == target) return root; // @step:found

    if (target < root->value) {
        // Target is smaller — search the left subtree
        return bstSearch(root->left, target); // @step:search-node
    } else {
        // Target is larger — search the right subtree
        return bstSearch(root->right, target); // @step:search-node
    }
}
