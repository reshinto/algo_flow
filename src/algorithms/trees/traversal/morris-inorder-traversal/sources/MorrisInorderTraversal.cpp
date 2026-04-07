// Morris In-Order Traversal — O(1) space in-order traversal using temporary threading

#include <vector>

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class MorrisInorderTraversal {
public:
    std::vector<int> morrisInorderTraversal(BSTNode* root) {
        std::vector<int> result; // @step:initialize
        BSTNode* current = root; // @step:initialize

        while (current != nullptr) {
            // @step:initialize
            if (current->left == nullptr) {
                // @step:visit
                // No left child — visit current and move right
                result.push_back(current->value); // @step:visit
                current = current->right;          // @step:traverse-right
            } else {
                // Find the inorder predecessor (rightmost node in left subtree)
                BSTNode* predecessor = current->left; // @step:thread-node
                while (predecessor->right != nullptr && predecessor->right != current) {
                    // @step:thread-node
                    predecessor = predecessor->right; // @step:thread-node
                }

                if (predecessor->right == nullptr) {
                    // @step:thread-node
                    // Thread: make predecessor point back to current
                    predecessor->right = current; // @step:thread-node
                    current = current->left;       // @step:traverse-left
                } else {
                    // Unthread: restore predecessor's right, visit current, move right
                    predecessor->right = nullptr;             // @step:unthread-node
                    result.push_back(current->value);         // @step:visit
                    current = current->right;                 // @step:traverse-right
                }
            }
        }

        return result; // @step:complete
    }
};
