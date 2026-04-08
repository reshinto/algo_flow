// BST Post-Order Traversal (Iterative) — LRN using two stacks

#include <stack>
#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BSTPostorderIterative {
public:
    std::vector<int> bstPostorderIterative(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        if (root == nullptr) return result; // @step:initialize

        std::stack<BSTNode*> stack1; // @step:initialize
        std::stack<BSTNode*> stack2; // @step:initialize
        stack1.push(root); // @step:initialize

        // Phase 1: push nodes onto stack2 in reverse post-order
        while (!stack1.empty()) {
            // @step:push-to-stack
            BSTNode* node = stack1.top(); // @step:pop-from-stack
            stack1.pop();
            stack2.push(node); // @step:push-to-stack

            if (node->left != nullptr) {
                // @step:traverse-left
                stack1.push(node->left); // @step:traverse-left
            }
            if (node->right != nullptr) {
                // @step:traverse-right
                stack1.push(node->right); // @step:traverse-right
            }
        }

        // Phase 2: pop stack2 in post-order and visit each node
        while (!stack2.empty()) {
            // @step:visit
            BSTNode* node = stack2.top(); // @step:pop-from-stack
            stack2.pop();
            result.push_back(node->value); // @step:visit
        }

        return result; // @step:complete
    }
};
