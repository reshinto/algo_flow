// Reverse Level-Order Traversal — BFS bottom-up: deepest level first

#include <queue>
#include <vector>
#include <algorithm>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class ReverseLevelOrder {
public:
    std::vector<std::vector<int>> reverseLevelOrder(BSTNode* root) {
        std::vector<std::vector<int>> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        std::queue<BSTNode*> nodeQueue; // @step:initialize
        nodeQueue.push(root); // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:enqueue-node
            int levelSize = nodeQueue.size(); // @step:enqueue-node
            std::vector<int> currentLevel; // @step:enqueue-node

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
                // @step:dequeue-node
                BSTNode* node = nodeQueue.front(); // @step:dequeue-node
                nodeQueue.pop();
                currentLevel.push_back(node->value); // @step:visit

                if (node->left != nullptr) {
                    // @step:enqueue-node
                    nodeQueue.push(node->left); // @step:enqueue-node
                }
                if (node->right != nullptr) {
                    // @step:enqueue-node
                    nodeQueue.push(node->right); // @step:enqueue-node
                }
            }

            // Prepend level to get bottom-up order
            result.insert(result.begin(), currentLevel); // @step:visit
        }

        return result; // @step:complete
    }
};
