// Red-Black Tree Insertion — maintains balance via color rebalancing and rotations
#include <vector>
using namespace std;

enum RBColor { RED, BLACK };

struct RBNode {
    int value;
    RBColor color;
    RBNode* left;
    RBNode* right;
    RBNode* parent;
    RBNode(int v) : value(v), color(RED), left(nullptr), right(nullptr), parent(nullptr) {} // @step:insert-node
};

class RedBlackInsert {
    RBNode* root = nullptr; // @step:initialize

    void rotateLeft(RBNode* node) {
        RBNode* rightChild = node->right; // @step:rotate-left
        node->right = rightChild->left;
        if (rightChild->left) rightChild->left->parent = node;
        rightChild->parent = node->parent;
        if (!node->parent) root = rightChild;
        else if (node == node->parent->left) node->parent->left = rightChild;
        else node->parent->right = rightChild;
        rightChild->left = node;
        node->parent = rightChild; // @step:rotate-left
    }

    void rotateRight(RBNode* node) {
        RBNode* leftChild = node->left; // @step:rotate-right
        node->left = leftChild->right;
        if (leftChild->right) leftChild->right->parent = node;
        leftChild->parent = node->parent;
        if (!node->parent) root = leftChild;
        else if (node == node->parent->right) node->parent->right = leftChild;
        else node->parent->left = leftChild;
        leftChild->right = node;
        node->parent = leftChild; // @step:rotate-right
    }

    void fixInsert(RBNode* inserted) {
        RBNode* currentNode = inserted;
        while (currentNode->parent && currentNode->parent->color == RED) { // @step:recolor-node
            RBNode* parentNode = currentNode->parent;
            RBNode* grandparent = parentNode->parent;
            if (parentNode == grandparent->left) {
                RBNode* uncle = grandparent->right;
                if (uncle && uncle->color == RED) {
                    parentNode->color = BLACK; // @step:recolor-node
                    uncle->color = BLACK; // @step:recolor-node
                    grandparent->color = RED; // @step:recolor-node
                    currentNode = grandparent;
                } else {
                    if (currentNode == parentNode->right) {
                        currentNode = parentNode;
                        rotateLeft(currentNode); // @step:rotate-left
                    }
                    currentNode->parent->color = BLACK; // @step:recolor-node
                    grandparent->color = RED; // @step:recolor-node
                    rotateRight(grandparent); // @step:rotate-right
                }
            } else {
                RBNode* uncle = grandparent->left;
                if (uncle && uncle->color == RED) {
                    parentNode->color = BLACK; // @step:recolor-node
                    uncle->color = BLACK; // @step:recolor-node
                    grandparent->color = RED; // @step:recolor-node
                    currentNode = grandparent;
                } else {
                    if (currentNode == parentNode->left) {
                        currentNode = parentNode;
                        rotateRight(currentNode); // @step:rotate-right
                    }
                    currentNode->parent->color = BLACK; // @step:recolor-node
                    grandparent->color = RED; // @step:recolor-node
                    rotateLeft(grandparent); // @step:rotate-left
                }
            }
        }
        root->color = BLACK; // @step:recolor-node
    }

    void inorder(RBNode* node, vector<int>& result) {
        if (!node) return;
        inorder(node->left, result);
        result.push_back(node->value);
        inorder(node->right, result);
    }

public:
    vector<int> redBlackInsert(vector<int> values) {
        for (int value : values) {
            RBNode* newNode = new RBNode(value);
            if (!root) {
                root = newNode;
                root->color = BLACK; // @step:recolor-node
            } else {
                RBNode* currentNode = root;
                while (true) {
                    if (value < currentNode->value) {
                        if (!currentNode->left) {
                            currentNode->left = newNode;
                            newNode->parent = currentNode;
                            break;
                        }
                        currentNode = currentNode->left;
                    } else {
                        if (!currentNode->right) {
                            currentNode->right = newNode;
                            newNode->parent = currentNode;
                            break;
                        }
                        currentNode = currentNode->right;
                    }
                }
                fixInsert(newNode); // @step:recolor-node
            }
        } // @step:insert-node
        vector<int> result;
        inorder(root, result);
        return result; // @step:complete
    }
};
