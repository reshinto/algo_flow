// Merge Binary Trees Iterative — stack-based pair comparison and merge

#include <stack>
#include <utility>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* mergeBinaryTreesIterative(BinaryNode* treeA, BinaryNode* treeB) {
    if (treeA == nullptr) return treeB; // @step:initialize

    std::stack<std::pair<BinaryNode*, BinaryNode*>> stack; // @step:initialize

    if (treeB != nullptr) {
        // @step:initialize
        stack.push({treeA, treeB}); // @step:initialize
    }

    while (!stack.empty()) {
        // @step:visit
        auto pair = stack.top(); // @step:visit
        stack.pop();
        BinaryNode* nodeA = pair.first;
        BinaryNode* nodeB = pair.second;

        // Merge values
        nodeA->value += nodeB->value; // @step:merge-node

        // Handle right children
        if (nodeA->right == nullptr) {
            // @step:connect-child
            nodeA->right = nodeB->right; // @step:connect-child
        } else if (nodeB->right != nullptr) {
            // @step:connect-child
            stack.push({nodeA->right, nodeB->right}); // @step:enqueue
        }

        // Handle left children
        if (nodeA->left == nullptr) {
            // @step:connect-child
            nodeA->left = nodeB->left; // @step:connect-child
        } else if (nodeB->left != nullptr) {
            // @step:connect-child
            stack.push({nodeA->left, nodeB->left}); // @step:enqueue
        }
    }

    return treeA; // @step:complete
}
