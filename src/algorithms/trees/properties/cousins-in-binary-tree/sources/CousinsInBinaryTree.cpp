// Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents

#include <queue>
#include <tuple>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool cousinsInBinaryTree(TreeNode* root, int nodeValueA, int nodeValueB) {
    if (root == nullptr) return false; // @step:initialize

    // queue entries: (node, parent, depth)
    std::queue<std::tuple<TreeNode*, TreeNode*, int>> queue; // @step:initialize
    queue.push({root, nullptr, 0});

    TreeNode* parentA = nullptr; // @step:initialize
    TreeNode* parentB = nullptr; // @step:initialize
    int depthA = -1; // @step:initialize
    int depthB = -1; // @step:initialize

    while (!queue.empty()) {
        // @step:visit
        auto entry = queue.front(); // @step:visit
        queue.pop();
        TreeNode* current = std::get<0>(entry);
        TreeNode* parent = std::get<1>(entry);
        int currentDepth = std::get<2>(entry);

        if (current->value == nodeValueA) {
            // @step:check-balance
            parentA = parent; // @step:check-balance
            depthA = currentDepth; // @step:update-height
        }

        if (current->value == nodeValueB) {
            // @step:check-balance
            parentB = parent; // @step:check-balance
            depthB = currentDepth; // @step:update-height
        }

        if (current->left != nullptr) queue.push({current->left, current, currentDepth + 1}); // @step:traverse-left
        if (current->right != nullptr) queue.push({current->right, current, currentDepth + 1}); // @step:traverse-right
    }

    // Cousins: same depth, different parents
    return depthA == depthB && parentA != parentB; // @step:complete
}
