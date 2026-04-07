// Vertical-Order Traversal — BFS grouping nodes by vertical column index

#include <queue>
#include <map>
#include <vector>
#include <utility>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class VerticalOrderTraversal {
public:
    std::vector<std::vector<int>> verticalOrderTraversal(BSTNode* root) {
        std::vector<std::vector<int>> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        // Queue stores [node, column] pairs
        std::queue<std::pair<BSTNode*, int>> nodeQueue; // @step:initialize
        nodeQueue.push({root, 0}); // @step:initialize
        std::map<int, std::vector<int>> columnMap; // @step:initialize
        int minColumn = 0; // @step:initialize
        int maxColumn = 0; // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:enqueue-node
            auto entry = nodeQueue.front(); // @step:dequeue-node
            nodeQueue.pop();
            BSTNode* node = entry.first; // @step:dequeue-node
            int column = entry.second;   // @step:dequeue-node

            // Record this node's value in its column
            columnMap[column].push_back(node->value); // @step:visit

            if (column < minColumn) minColumn = column; // @step:visit
            if (column > maxColumn) maxColumn = column; // @step:visit

            if (node->left != nullptr) {
                // @step:enqueue-node
                nodeQueue.push({node->left, column - 1}); // @step:enqueue-node
            }
            if (node->right != nullptr) {
                // @step:enqueue-node
                nodeQueue.push({node->right, column + 1}); // @step:enqueue-node
            }
        }

        // Collect columns in order from leftmost to rightmost
        for (int col = minColumn; col <= maxColumn; col++) {
            // @step:visit
            if (columnMap.count(col)) result.push_back(columnMap[col]); // @step:visit
        }

        return result; // @step:complete
    }
};
