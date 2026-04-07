// BST Kth Smallest (Iterative) — stack-based in-order with counter
#include <vector>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

int bstKthSmallestIterative(BSTNode* root, int kthPosition) {
    vector<BSTNode*> stack; // @step:initialize
    int counter = 0;
    BSTNode* current = root;

    while (current != nullptr || !stack.empty()) {
        // Push all left nodes — they have smaller values
        while (current != nullptr) {
            stack.push_back(current); // @step:search-node
            current = current->left;
        }

        // Process next in-order node
        current = stack.back(); stack.pop_back();
        counter++;

        if (counter == kthPosition) {
            return current->value; // @step:found
        }

        // Move to right subtree
        current = current->right; // @step:search-node
    }

    return -1; // @step:complete — k exceeds number of nodes
}
