// Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking

#include <stack>
#include <unordered_map>
#include <cmath>
#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class IsBalancedTreeIterative {
public:
    bool isBalancedTreeIterative(TreeNode* root) {
        if (root == nullptr) return true; // @step:initialize

        struct StackEntry {
            TreeNode* node;
            int phase;
        };

        std::stack<StackEntry> nodeStack; // @step:initialize
        std::unordered_map<TreeNode*, int> heights; // @step:initialize

        nodeStack.push({root, 0}); // @step:initialize

        while (!nodeStack.empty()) {
            // @step:visit
            StackEntry& entry = nodeStack.top(); // @step:visit
            TreeNode* node = entry.node; // @step:visit

            if (entry.phase == 0) {
                entry.phase = 1; // @step:visit
                if (node->left != nullptr) nodeStack.push({node->left, 0}); // @step:traverse-left
            } else if (entry.phase == 1) {
                entry.phase = 2; // @step:visit
                if (node->right != nullptr) nodeStack.push({node->right, 0}); // @step:traverse-right
            } else {
                nodeStack.pop(); // @step:visit
                int leftHeight = (node->left != nullptr) ? heights[node->left] : 0; // @step:check-balance
                int rightHeight = (node->right != nullptr) ? heights[node->right] : 0; // @step:check-balance

                if (std::abs(leftHeight - rightHeight) > 1) return false; // @step:check-balance

                heights[node] = std::max(leftHeight, rightHeight) + 1; // @step:update-height
            }
        }

        return true; // @step:complete
    }
};
