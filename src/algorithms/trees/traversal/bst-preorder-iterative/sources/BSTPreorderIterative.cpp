// BST Pre-Order Traversal (Iterative) — NLR using an explicit stack

#include <stack>
#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTPreorderIterative {
public:
    std::vector<int> bstPreorderIterative(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        std::stack<BSTNode*> nodeStack; // @step:initialize
        nodeStack.push(root); // @step:initialize

        while (!nodeStack.empty()) {
            // @step:initialize
            BSTNode* node = nodeStack.top(); // @step:pop-from-stack
            nodeStack.pop();
            result.push_back(node->value); // @step:visit

            // Push right first so left is processed first (LIFO)
            if (node->right != nullptr) {
                // @step:push-to-stack
                nodeStack.push(node->right); // @step:push-to-stack
            }
            if (node->left != nullptr) {
                // @step:traverse-left
                nodeStack.push(node->left); // @step:traverse-left
            }
        }

        return result; // @step:complete
    }
};
