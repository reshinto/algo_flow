// Level-Order Traversal — BFS visiting nodes level by level using a queue

#include <queue>
#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class LevelOrderTraversal {
public:
    std::vector<std::vector<int>> levelOrderTraversal(BSTNode* root) {
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

            result.push_back(currentLevel); // @step:visit
        }

        return result; // @step:complete
    }
};
