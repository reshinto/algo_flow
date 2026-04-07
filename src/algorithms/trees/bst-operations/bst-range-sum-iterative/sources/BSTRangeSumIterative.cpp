// BST Range Sum (Iterative) — stack-based DFS summing nodes in [lowValue, highValue]
#include <vector>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

int bstRangeSumIterative(BSTNode* root, int lowValue, int highValue) {
    if (root == nullptr) return 0; // @step:initialize

    vector<BSTNode*> stack = {root};
    int totalSum = 0;

    while (!stack.empty()) {
        BSTNode* node = stack.back(); stack.pop_back();

        if (node->value >= lowValue && node->value <= highValue) {
            // Node is in range — add to sum
            totalSum += node->value; // @step:found
        }

        if (node->left != nullptr && node->value > lowValue) {
            // Left child exists and may have values in range
            stack.push_back(node->left); // @step:search-node
        }

        if (node->right != nullptr && node->value < highValue) {
            // Right child exists and may have values in range
            stack.push_back(node->right); // @step:search-node
        }
    }

    return totalSum; // @step:complete
}
