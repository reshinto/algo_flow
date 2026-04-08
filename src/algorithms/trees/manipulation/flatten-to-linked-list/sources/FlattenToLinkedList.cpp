// Flatten Binary Tree to Linked List — recursive preorder: rewire nodes in-place

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

void flattenToLinkedList(BinaryNode* root) {
    if (root == nullptr) return; // @step:initialize

    // Recursively flatten the left and right subtrees
    flattenToLinkedList(root->left);   // @step:traverse-left
    flattenToLinkedList(root->right);  // @step:traverse-right

    // Save the original right subtree
    BinaryNode* rightSubtree = root->right; // @step:connect-child

    // Move the left subtree to the right
    root->right = root->left; // @step:connect-child
    root->left = nullptr; // @step:connect-child

    // Find the rightmost node of the newly-placed subtree
    BinaryNode* current = root;
    while (current->right != nullptr) {
        // @step:visit
        current = current->right; // @step:visit
    }

    // Attach the original right subtree at the tail
    current->right = rightSubtree; // @step:connect-child
}
