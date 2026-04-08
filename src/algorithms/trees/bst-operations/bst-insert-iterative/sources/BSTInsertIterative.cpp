// BST Insert (Iterative) — track parent, insert at correct leaf position

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstInsertIterative(BSTNode* root, int insertValue) {
    BSTNode* newNode = new BSTNode(insertValue); // @step:initialize

    if (root == nullptr) return newNode; // @step:insert-child

    BSTNode* current = root;

    while (true) {
        if (insertValue < current->value) {
            // Go left — if no left child, insert here
            if (current->left == nullptr) {
                current->left = newNode; // @step:insert-child
                break;
            }
            current = current->left; // @step:search-node
        } else if (insertValue > current->value) {
            // Go right — if no right child, insert here
            if (current->right == nullptr) {
                current->right = newNode; // @step:insert-child
                break;
            }
            current = current->right; // @step:search-node
        } else {
            // Duplicate value — do nothing
            break;
        }
    }

    return root; // @step:complete
}
