// BST to Sorted Circular Doubly Linked List — in-place pointer manipulation

struct DLLNode {
    int value;
    DLLNode* left;
    DLLNode* right;
    DLLNode(int v) : value(v), left(nullptr), right(nullptr) {}
};

class TreeToDoublyLinkedList {
    DLLNode* head = nullptr; // @step:initialize
    DLLNode* tail = nullptr; // @step:initialize

    void inorder(DLLNode* node) {
        if (!node) return; // @step:initialize

        inorder(node->left); // @step:traverse-left

        // Visit: connect current node to the doubly linked list
        if (!tail) {
            head = node; // @step:visit
        } else {
            tail->right = node; // @step:visit
            node->left = tail;  // @step:visit
        }
        tail = node; // @step:visit

        inorder(node->right); // @step:traverse-right
    }

public:
    DLLNode* treeToDoublyLinkedList(DLLNode* root) {
        if (!root) return nullptr; // @step:initialize

        head = nullptr;
        tail = nullptr;
        inorder(root);

        // Close the circular link
        if (head && tail) {
            tail->right = head; // @step:visit
            head->left = tail;  // @step:visit
        }

        return head; // @step:complete
    }
};
