// Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

#include <queue>
#include <utility>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool sameTreeIterative(BinaryNode* treeA, BinaryNode* treeB) {
    std::queue<std::pair<BinaryNode*, BinaryNode*>> queue; // @step:initialize
    queue.push({treeA, treeB});

    while (!queue.empty()) {
        // @step:visit
        auto pair = queue.front(); // @step:dequeue
        queue.pop();
        BinaryNode* nodeA = pair.first;
        BinaryNode* nodeB = pair.second;

        if (nodeA == nullptr && nodeB == nullptr) continue; // @step:compare
        if (nodeA == nullptr || nodeB == nullptr) return false; // @step:compare
        if (nodeA->value != nodeB->value) return false; // @step:compare

        queue.push({nodeA->left, nodeB->left}); // @step:enqueue
        queue.push({nodeA->right, nodeB->right}); // @step:enqueue
    }

    return true; // @step:complete
}
