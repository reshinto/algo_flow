// Sum Root to Leaf Numbers (Iterative) — stack-based number formation

#include <stack>
#include <utility>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class SumRootToLeafNumbersIterative {
public:
    int sumRootToLeafNumbersIterative(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        int totalSum = 0; // @step:initialize
        std::stack<std::pair<TreeNode*, int>> nodeStack; // @step:initialize
        nodeStack.push({root, root->value}); // @step:initialize

        while (!nodeStack.empty()) {
            // @step:visit
            auto entry = nodeStack.top(); // @step:visit
            nodeStack.pop();
            TreeNode* current = entry.first;   // @step:visit
            int runningNumber = entry.second;   // @step:visit

            // Leaf node — add completed number to total
            if (current->left == nullptr && current->right == nullptr) {
                // @step:check-balance
                totalSum += runningNumber; // @step:add-to-result
            }

            if (current->right != nullptr) {
                // @step:traverse-right
                nodeStack.push({current->right, runningNumber * 10 + current->right->value}); // @step:traverse-right
            }

            if (current->left != nullptr) {
                // @step:traverse-left
                nodeStack.push({current->left, runningNumber * 10 + current->left->value}); // @step:traverse-left
            }
        }

        return totalSum; // @step:complete
    }
};
