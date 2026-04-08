// BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

class BSTRecoverSwapped {
    BSTNode* firstViolation = nullptr; // @step:initialize
    BSTNode* secondViolation = nullptr;
    BSTNode* previousNode = nullptr;

    void inorder(BSTNode* node) {
        if (node == nullptr) return; // @step:initialize

        inorder(node->left); // @step:search-node

        // Check if BST property is violated at this position
        if (previousNode != nullptr && previousNode->value > node->value) {
            if (firstViolation == nullptr) {
                // First violation: previous is the first swapped node
                firstViolation = previousNode; // @step:found
            }
            // Second violation: current is always updated to the second swapped node
            secondViolation = node; // @step:found
        }

        previousNode = node;
        inorder(node->right); // @step:search-node
    }

public:
    void bstRecoverSwapped(BSTNode* root) {
        firstViolation = nullptr;
        secondViolation = nullptr;
        previousNode = nullptr;
        inorder(root);

        // Swap the values of the two misplaced nodes to recover the BST
        if (firstViolation != nullptr && secondViolation != nullptr) {
            int temp = firstViolation->value;
            firstViolation->value = secondViolation->value; // @step:complete
            secondViolation->value = temp;
        }
    }
};
