// Zigzag Level-Order Traversal — BFS with alternating left-right direction per level

#include <queue>
#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class ZigzagLevelOrder {
public:
    std::vector<std::vector<int>> zigzagLevelOrder(BSTNode* root) {
        std::vector<std::vector<int>> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        std::queue<BSTNode*> nodeQueue; // @step:initialize
        nodeQueue.push(root); // @step:initialize
        bool leftToRight = true; // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:enqueue-node
            int levelSize = nodeQueue.size(); // @step:enqueue-node
            std::vector<int> currentLevel(levelSize); // @step:enqueue-node

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
                // @step:dequeue-node
                BSTNode* node = nodeQueue.front(); // @step:dequeue-node
                nodeQueue.pop();

                // Insert at front or back based on current direction
                int insertIndex = leftToRight ? nodeIndex : levelSize - 1 - nodeIndex; // @step:visit
                currentLevel[insertIndex] = node->value; // @step:visit

                if (node->left != nullptr) {
                    // @step:enqueue-node
                    nodeQueue.push(node->left); // @step:enqueue-node
                }
                if (node->right != nullptr) {
                    // @step:enqueue-node
                    nodeQueue.push(node->right); // @step:enqueue-node
                }
            }

            result.push_back(currentLevel); // @step:visit
            leftToRight = !leftToRight; // @step:visit
        }

        return result; // @step:complete
    }
};
