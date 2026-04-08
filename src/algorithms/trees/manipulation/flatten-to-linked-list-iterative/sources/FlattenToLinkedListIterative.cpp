// Flatten Binary Tree to Linked List Iterative — Morris-like: find rightmost of left subtree and rewire

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

void flattenToLinkedListIterative(BinaryNode* root) {
    BinaryNode* current = root; // @step:initialize

    while (current != nullptr) {
        // @step:visit
        if (current->left != nullptr) {
            // @step:visit
            // Find the rightmost node of the left subtree
            BinaryNode* rightmost = current->left; // @step:connect-child
            while (rightmost->right != nullptr) {
                // @step:connect-child
                rightmost = rightmost->right; // @step:connect-child
            }

            // Attach original right subtree at the rightmost node
            rightmost->right = current->right; // @step:connect-child

            // Move left subtree to right, clear left pointer
            current->right = current->left; // @step:connect-child
            current->left = nullptr; // @step:connect-child
        }

        current = current->right; // @step:visit
    }
}
