// Same Tree — recursive: check structural equality and value equality

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool sameTree(BinaryNode* treeA, BinaryNode* treeB) {
    if (treeA == nullptr && treeB == nullptr) return true; // @step:initialize
    if (treeA == nullptr || treeB == nullptr) return false; // @step:compare
    if (treeA->value != treeB->value) return false; // @step:compare

    // Recursively check left and right subtrees
    bool leftMatch = sameTree(treeA->left, treeB->left); // @step:traverse-left
    bool rightMatch = sameTree(treeA->right, treeB->right); // @step:traverse-right

    return leftMatch && rightMatch; // @step:visit
}
