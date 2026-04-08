// BST In-Order Traversal (Iterative) — LNR using an explicit stack

#include <stack>
#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTInorderIterative {
public:
    std::vector<int> bstInorderIterative(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        std::stack<BSTNode*> nodeStack; // @step:initialize
        BSTNode* current = root; // @step:initialize

        while (current != nullptr || !nodeStack.empty()) {
            // @step:initialize
            // Push all left children onto the stack
            while (current != nullptr) {
                // @step:push-to-stack
                nodeStack.push(current); // @step:push-to-stack
                current = current->left; // @step:traverse-left
            }

            // Pop the top node and visit it
            current = nodeStack.top(); // @step:pop-from-stack
            nodeStack.pop();
            result.push_back(current->value); // @step:visit

            // Move to right subtree
            current = current->right; // @step:traverse-right
        }

        return result; // @step:complete
    }
};
