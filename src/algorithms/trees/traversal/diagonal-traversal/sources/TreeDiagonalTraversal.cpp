// Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)

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

class TreeDiagonalTraversal {
public:
    std::vector<std::vector<int>> treeDiagonalTraversal(BSTNode* root) {
        std::vector<std::vector<int>> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        // Queue of [node, diagonal] pairs
        std::queue<std::pair<BSTNode*, int>> nodeQueue; // @step:initialize
        nodeQueue.push({root, 0}); // @step:initialize
        std::map<int, std::vector<int>> diagonalMap; // @step:initialize
        int maxDiagonal = 0; // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:enqueue-node
            auto entry = nodeQueue.front(); // @step:dequeue-node
            nodeQueue.pop();
            BSTNode* node = entry.first; // @step:dequeue-node
            int diagonal = entry.second; // @step:dequeue-node

            diagonalMap[diagonal].push_back(node->value); // @step:visit

            if (diagonal > maxDiagonal) maxDiagonal = diagonal; // @step:visit

            // Right child stays on same diagonal
            if (node->right != nullptr) {
                // @step:traverse-right
                nodeQueue.push({node->right, diagonal}); // @step:traverse-right
            }
            // Left child moves to next diagonal
            if (node->left != nullptr) {
                // @step:traverse-left
                nodeQueue.push({node->left, diagonal + 1}); // @step:traverse-left
            }
        }

        // Collect diagonals in order
        for (int diag = 0; diag <= maxDiagonal; diag++) {
            // @step:visit
            if (diagonalMap.count(diag)) result.push_back(diagonalMap[diag]); // @step:visit
        }

        return result; // @step:complete
    }
};
