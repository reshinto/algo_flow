// Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition

#include <stack>
#include <utility>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class SumOfLeftLeavesIterative {
public:
    int sumOfLeftLeavesIterative(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        std::stack<std::pair<TreeNode*, bool>> nodeStack; // @step:initialize
        nodeStack.push({root, false}); // @step:initialize
        int totalSum = 0; // @step:initialize

        while (!nodeStack.empty()) {
            // @step:visit
            auto entry = nodeStack.top(); // @step:visit
            nodeStack.pop();
            TreeNode* current = entry.first; // @step:visit
            bool isLeft = entry.second;      // @step:visit

            // Accumulate value when we find a left leaf
            if (current->left == nullptr && current->right == nullptr && isLeft) {
                // @step:check-balance
                totalSum += current->value; // @step:add-to-result
            }

            if (current->right != nullptr) {
                // @step:traverse-right
                nodeStack.push({current->right, false}); // @step:traverse-right
            }

            if (current->left != nullptr) {
                // @step:traverse-left
                nodeStack.push({current->left, true}); // @step:traverse-left
            }
        }

        return totalSum; // @step:complete
    }
};
