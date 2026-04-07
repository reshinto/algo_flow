// Invert Binary Tree Iterative — BFS with queue: swap children level by level

#include <queue>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* invertBinaryTreeIterative(BinaryNode* root) {
    if (root == nullptr) return nullptr; // @step:initialize

    std::queue<BinaryNode*> queue; // @step:initialize
    queue.push(root);

    while (!queue.empty()) {
        // @step:initialize
        BinaryNode* current = queue.front(); // @step:dequeue
        queue.pop();

        // Swap left and right children
        BinaryNode* temp = current->left; // @step:swap-children
        current->left = current->right; // @step:swap-children
        current->right = temp; // @step:swap-children

        // Enqueue non-null children for processing
        if (current->left != nullptr) queue.push(current->left); // @step:enqueue
        if (current->right != nullptr) queue.push(current->right); // @step:enqueue
    }

    return root; // @step:complete
}
