// All Root-to-Leaf Paths (Iterative) — stack-based with path tracking

#include <vector>
#include <stack>
#include <string>
#include <utility>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

std::vector<std::string> allRootToLeafPathsIterative(TreeNode* root) {
    if (root == nullptr) return {}; // @step:initialize

    std::vector<std::string> paths; // @step:initialize
    std::stack<std::pair<TreeNode*, std::string>> stack; // @step:initialize
    stack.push({root, std::to_string(root->value)});

    while (!stack.empty()) {
        // @step:visit
        auto entry = stack.top(); // @step:visit
        stack.pop();
        TreeNode* current = entry.first;
        std::string pathSoFar = entry.second;

        // Leaf node — record complete path
        if (current->left == nullptr && current->right == nullptr) {
            // @step:check-balance
            paths.push_back(pathSoFar); // @step:add-to-result
        }

        if (current->right != nullptr) {
            // @step:traverse-right
            stack.push({current->right, pathSoFar + "->" + std::to_string(current->right->value)}); // @step:traverse-right
        }

        if (current->left != nullptr) {
            // @step:traverse-left
            stack.push({current->left, pathSoFar + "->" + std::to_string(current->left->value)}); // @step:traverse-left
        }
    }

    return paths; // @step:complete
}
