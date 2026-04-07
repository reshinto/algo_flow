// Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

#include <vector>

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

void dfs(BinaryNode* node, int depth, std::vector<int>& result) {
    if (node == nullptr) return; // @step:initialize

    // First node encountered at this depth is visible from the right
    if (depth == (int)result.size()) {
        // @step:visit
        result.push_back(node->value); // @step:collect-element
    }

    // Visit right child first to ensure rightmost value is recorded first
    dfs(node->right, depth + 1, result); // @step:traverse-right
    dfs(node->left, depth + 1, result);  // @step:traverse-left
}

std::vector<int> rightSideViewRecursive(BinaryNode* root) {
    std::vector<int> result; // @step:initialize
    dfs(root, 0, result); // @step:initialize
    return result; // @step:complete
}
