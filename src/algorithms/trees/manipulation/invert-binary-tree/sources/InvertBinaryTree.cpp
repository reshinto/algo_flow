// Invert Binary Tree — recursive: swap left and right children at every node

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* invertBinaryTree(BinaryNode* root) {
    if (root == nullptr) return nullptr; // @step:initialize

    // Recursively invert the left subtree
    BinaryNode* invertedLeft = invertBinaryTree(root->left); // @step:traverse-left
    // Recursively invert the right subtree
    BinaryNode* invertedRight = invertBinaryTree(root->right); // @step:traverse-right

    // Swap left and right children
    root->left = invertedRight; // @step:swap-children
    root->right = invertedLeft; // @step:swap-children

    return root; // @step:visit
}
