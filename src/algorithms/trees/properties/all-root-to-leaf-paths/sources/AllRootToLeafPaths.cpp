// All Root-to-Leaf Paths — recursive DFS collecting all paths as strings

#include <vector>
#include <string>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

void dfs(TreeNode* node, const std::string& currentPath, std::vector<std::string>& paths) {
    if (node == nullptr) return; // @step:initialize

    std::string pathSoFar = currentPath.empty()
        ? std::to_string(node->value)
        : currentPath + "->" + std::to_string(node->value); // @step:visit

    // Leaf node — record this complete path
    if (node->left == nullptr && node->right == nullptr) {
        // @step:visit
        paths.push_back(pathSoFar); // @step:add-to-result
        return;
    }

    dfs(node->left, pathSoFar, paths);  // @step:traverse-left
    dfs(node->right, pathSoFar, paths); // @step:traverse-right
}

std::vector<std::string> allRootToLeafPaths(TreeNode* root) {
    std::vector<std::string> paths; // @step:initialize
    dfs(root, "", paths); // @step:initialize
    return paths; // @step:complete
}
