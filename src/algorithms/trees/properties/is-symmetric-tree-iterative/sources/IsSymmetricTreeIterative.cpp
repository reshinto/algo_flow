// Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare

#include <queue>
#include <utility>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class IsSymmetricTreeIterative {
public:
    bool isSymmetricTreeIterative(TreeNode* root) {
        if (root == nullptr) return true; // @step:initialize

        std::queue<std::pair<TreeNode*, TreeNode*>> nodeQueue; // @step:initialize
        nodeQueue.push({root->left, root->right}); // @step:initialize

        while (!nodeQueue.empty()) {
            // @step:visit
            auto pair = nodeQueue.front(); // @step:visit
            nodeQueue.pop(); // @step:visit
            TreeNode* leftNode = pair.first; // @step:visit
            TreeNode* rightNode = pair.second; // @step:visit

            if (leftNode == nullptr && rightNode == nullptr) continue; // @step:check-balance
            if (leftNode == nullptr || rightNode == nullptr) return false; // @step:check-balance
            if (leftNode->value != rightNode->value) return false; // @step:check-balance

            // Enqueue outer pair and inner pair
            nodeQueue.push({leftNode->left, rightNode->right}); // @step:traverse-left
            nodeQueue.push({leftNode->right, rightNode->left}); // @step:traverse-right
        }

        return true; // @step:complete
    }
};
