// Minimum Depth of Binary Tree — BFS returns depth at first leaf encountered

#include <queue>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class MinimumDepthIterative {
public:
    int minimumDepthIterative(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        std::queue<TreeNode*> nodeQueue; // @step:initialize
        nodeQueue.push(root); // @step:initialize
        int depth = 0; // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:visit
            int levelSize = nodeQueue.size(); // @step:visit
            depth += 1; // @step:update-height

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
                // @step:visit
                TreeNode* current = nodeQueue.front(); // @step:visit
                nodeQueue.pop();

                // First leaf node encountered is the minimum depth
                if (current->left == nullptr && current->right == nullptr) {
                    // @step:visit
                    return depth; // @step:complete
                }

                if (current->left != nullptr) nodeQueue.push(current->left); // @step:traverse-left
                if (current->right != nullptr) nodeQueue.push(current->right); // @step:traverse-right
            }
        }

        return depth; // @step:complete
    }
};
