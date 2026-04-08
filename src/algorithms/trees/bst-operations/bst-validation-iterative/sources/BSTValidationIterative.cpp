// BST Validation (Iterative) — stack-based in-order traversal checking ascending order

#include <stack>
#include <climits>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool bstValidationIterative(BSTNode* root) {
    std::stack<BSTNode*> stack; // @step:initialize
    int previousValue = INT_MIN;
    BSTNode* current = root;

    while (current != nullptr || !stack.empty()) {
        // Push all left nodes onto the stack
        while (current != nullptr) {
            stack.push(current); // @step:search-node
            current = current->left;
        }

        // Process the top of the stack
        current = stack.top();
        stack.pop();

        // In-order value must be strictly greater than the previous one
        if (current->value <= previousValue) {
            return false; // @step:found — BST violation detected
        }

        previousValue = current->value; // @step:search-node
        current = current->right;
    }

    return true; // @step:complete — all values in ascending order
}
