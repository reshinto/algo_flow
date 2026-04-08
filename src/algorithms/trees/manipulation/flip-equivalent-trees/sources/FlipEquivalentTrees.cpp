// Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool flipEquivalentTrees(BinaryNode* treeA, BinaryNode* treeB) {
    if (treeA == nullptr && treeB == nullptr) return true; // @step:initialize
    if (treeA == nullptr || treeB == nullptr) return false; // @step:compare
    if (treeA->value != treeB->value) return false; // @step:compare

    // Check if children match without flipping
    bool noFlip = // @step:traverse-left
        flipEquivalentTrees(treeA->left, treeB->left) && // @step:traverse-left
        flipEquivalentTrees(treeA->right, treeB->right); // @step:traverse-right

    // Check if children match with flipping
    bool withFlip = // @step:traverse-left
        flipEquivalentTrees(treeA->left, treeB->right) && // @step:traverse-left
        flipEquivalentTrees(treeA->right, treeB->left); // @step:traverse-right

    return noFlip || withFlip; // @step:visit
}
