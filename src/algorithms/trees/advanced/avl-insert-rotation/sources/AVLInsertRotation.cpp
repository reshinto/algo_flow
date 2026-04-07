// AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations
#include <vector>
#include <algorithm>
using namespace std;

struct AVLNode {
    int value, height;
    AVLNode* left;
    AVLNode* right;
    AVLNode(int v) : value(v), height(1), left(nullptr), right(nullptr) {}
};

int nodeHeight(AVLNode* node) {
    return node ? node->height : 0; // @step:check-balance
}

void updateHeight(AVLNode* node) {
    node->height = 1 + max(nodeHeight(node->left), nodeHeight(node->right)); // @step:update-height
}

int balanceFactor(AVLNode* node) {
    return nodeHeight(node->left) - nodeHeight(node->right); // @step:check-balance
}

AVLNode* rotateRight(AVLNode* pivot) {
    AVLNode* leftChild = pivot->left; // @step:rotate-right
    pivot->left = leftChild->right;
    leftChild->right = pivot;
    updateHeight(pivot);
    updateHeight(leftChild);
    return leftChild; // @step:rotate-right
}

AVLNode* rotateLeft(AVLNode* pivot) {
    AVLNode* rightChild = pivot->right; // @step:rotate-left
    pivot->right = rightChild->left;
    rightChild->left = pivot;
    updateHeight(pivot);
    updateHeight(rightChild);
    return rightChild; // @step:rotate-left
}

AVLNode* insert(AVLNode* node, int value) {
    if (!node) return new AVLNode(value); // @step:insert-node

    if (value < node->value) node->left = insert(node->left, value); // @step:traverse-left
    else if (value > node->value) node->right = insert(node->right, value); // @step:traverse-right
    else return node; // @step:visit

    updateHeight(node);
    int balance = balanceFactor(node); // @step:check-balance

    // LL case
    if (balance > 1 && node->left && value < node->left->value)
        return rotateRight(node); // @step:rotate-right
    // RR case
    if (balance < -1 && node->right && value > node->right->value)
        return rotateLeft(node); // @step:rotate-left
    // LR case
    if (balance > 1 && node->left) {
        node->left = rotateLeft(node->left); // @step:rotate-left
        return rotateRight(node); // @step:rotate-right
    }
    // RL case
    if (balance < -1 && node->right) {
        node->right = rotateRight(node->right); // @step:rotate-right
        return rotateLeft(node); // @step:rotate-left
    }

    return node;
}

void inorder(AVLNode* node, vector<int>& result) {
    if (!node) return;
    inorder(node->left, result);
    result.push_back(node->value);
    inorder(node->right, result);
}

vector<int> avlInsertRotation(vector<int> values) {
    AVLNode* root = nullptr; // @step:initialize

    for (int value : values) {
        root = insert(root, value); // @step:insert-node
    }

    vector<int> result;
    inorder(root, result);
    return result; // @step:complete
}
