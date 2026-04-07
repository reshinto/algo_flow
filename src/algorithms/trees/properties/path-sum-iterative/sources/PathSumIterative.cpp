// Path Sum (Iterative) — stack-based DFS with running sum tracking

#include <stack>
#include <utility>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class PathSumIterative {
public:
    bool pathSumIterative(TreeNode* root, int targetSum) {
        if (root == nullptr) return false; // @step:initialize

        std::stack<std::pair<TreeNode*, int>> nodeStack; // @step:initialize
        nodeStack.push({root, root->value}); // @step:initialize

        while (!nodeStack.empty()) {
            // @step:visit
            auto entry = nodeStack.top(); // @step:visit
            nodeStack.pop();
            TreeNode* current = entry.first; // @step:visit
            int runningSum = entry.second;   // @step:visit

            // Leaf node — check if path sum matches target
            if (current->left == nullptr && current->right == nullptr) {
                // @step:check-balance
                if (runningSum == targetSum) return true; // @step:complete
            }

            if (current->right != nullptr) {
                // @step:traverse-right
                nodeStack.push({current->right, runningSum + current->right->value}); // @step:traverse-right
            }

            if (current->left != nullptr) {
                // @step:traverse-left
                nodeStack.push({current->left, runningSum + current->left->value}); // @step:traverse-left
            }
        }

        return false; // @step:complete
    }
};
