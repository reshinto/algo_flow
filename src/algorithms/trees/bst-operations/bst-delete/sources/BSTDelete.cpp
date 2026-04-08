// BST Delete (Recursive) — 3 cases: leaf, one child, two children with inorder successor

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstDelete(BSTNode* root, int deleteValue) {
    if (root == nullptr) return nullptr; // @step:initialize

    if (deleteValue < root->value) {
        // Target is in the left subtree
        root->left = bstDelete(root->left, deleteValue); // @step:search-node
    } else if (deleteValue > root->value) {
        // Target is in the right subtree
        root->right = bstDelete(root->right, deleteValue); // @step:search-node
    } else {
        // Found the node to delete
        if (root->left == nullptr) return root->right; // @step:delete-child
        if (root->right == nullptr) return root->left; // @step:delete-child

        // Two children: find inorder successor (smallest in right subtree)
        BSTNode* successor = root->right;
        while (successor->left != nullptr) {
            successor = successor->left; // @step:search-node
        }
        // Replace value with successor's value, then delete the successor
        root->value = successor->value; // @step:delete-child
        root->right = bstDelete(root->right, successor->value);
    }

    return root; // @step:complete
}
