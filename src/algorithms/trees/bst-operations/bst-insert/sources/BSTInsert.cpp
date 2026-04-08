// BST Insert (Recursive) — find correct leaf position and insert new node

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstInsert(BSTNode* root, int insertValue) {
    if (root == nullptr) {
        // Base case: insert new node at this position
        return new BSTNode(insertValue); // @step:insert-child
    }

    if (insertValue < root->value) {
        // Insert value is smaller — recurse into left subtree
        root->left = bstInsert(root->left, insertValue); // @step:search-node
    } else if (insertValue > root->value) {
        // Insert value is larger — recurse into right subtree
        root->right = bstInsert(root->right, insertValue); // @step:search-node
    }
    // Duplicate values are ignored

    return root; // @step:complete
}
