// Distribute Coins — DFS: each node sends or receives excess coins from children

#include <cmath>

struct BinaryNode {
    int value; // number of coins at this node
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

int dfs(BinaryNode* node, int& totalMoves) {
    if (node == nullptr) return 0; // @step:initialize

    // Get excess from left and right children
    int leftExcess = dfs(node->left, totalMoves);   // @step:traverse-left
    int rightExcess = dfs(node->right, totalMoves); // @step:traverse-right

    // Each move on the edge to a child counts
    totalMoves += std::abs(leftExcess) + std::abs(rightExcess); // @step:accumulate

    // Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
    return node->value + leftExcess + rightExcess - 1; // @step:visit
}

int distributeCoins(BinaryNode* root) {
    int totalMoves = 0; // @step:initialize
    dfs(root, totalMoves); // @step:initialize
    return totalMoves; // @step:complete
}
