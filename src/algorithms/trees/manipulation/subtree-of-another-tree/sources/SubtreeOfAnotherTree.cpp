// Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool isSameTree(BinaryNode* treeA, BinaryNode* treeB) {
    if (treeA == nullptr && treeB == nullptr) return true;
    if (treeA == nullptr || treeB == nullptr) return false;
    if (treeA->value != treeB->value) return false;
    return isSameTree(treeA->left, treeB->left) && isSameTree(treeA->right, treeB->right);
}

bool subtreeOfAnotherTree(BinaryNode* mainTree, BinaryNode* subTree) {
    if (subTree == nullptr) return true; // @step:initialize
    if (mainTree == nullptr) return false; // @step:initialize

    // Check if the tree rooted at mainTree matches subTree
    if (isSameTree(mainTree, subTree)) return true; // @step:compare

    // Recursively check left and right subtrees
    return subtreeOfAnotherTree(mainTree->left, subTree) || // @step:traverse-left
           subtreeOfAnotherTree(mainTree->right, subTree);  // @step:traverse-right
}
