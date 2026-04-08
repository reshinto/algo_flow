// Right Side View — BFS: collect the last node of each level

#include <vector>
#include <queue>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

std::vector<int> rightSideView(BinaryNode* root) {
    if (root == nullptr) return {}; // @step:initialize

    std::vector<int> result; // @step:initialize
    std::queue<BinaryNode*> queue; // @step:initialize
    queue.push(root);

    while (!queue.empty()) {
        // @step:visit
        int levelSize = (int)queue.size(); // @step:visit

        for (int position = 0; position < levelSize; position++) {
            // @step:visit
            BinaryNode* node = queue.front(); // @step:dequeue
            queue.pop();

            // The last node of this level is visible from the right side
            if (position == levelSize - 1) {
                // @step:collect-element
                result.push_back(node->value); // @step:collect-element
            }

            if (node->left != nullptr) queue.push(node->left); // @step:enqueue
            if (node->right != nullptr) queue.push(node->right); // @step:enqueue
        }
    }

    return result; // @step:complete
}
