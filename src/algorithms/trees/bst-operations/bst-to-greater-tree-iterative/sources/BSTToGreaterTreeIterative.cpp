// BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation
#include <vector>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

BSTNode* bstToGreaterTreeIterative(BSTNode* root) {
    vector<BSTNode*> stack; // @step:initialize
    int runningSum = 0;
    BSTNode* current = root;

    while (current != nullptr || !stack.empty()) {
        // Push all right nodes first (reverse in-order visits right subtree first)
        while (current != nullptr) {
            stack.push_back(current); // @step:search-node
            current = current->right;
        }

        // Process the top node
        current = stack.back(); stack.pop_back();

        // Accumulate sum and update node value
        runningSum += current->value; // @step:found
        current->value = runningSum;

        // Move to left subtree
        current = current->left; // @step:search-node
    }

    return root; // @step:complete
}
