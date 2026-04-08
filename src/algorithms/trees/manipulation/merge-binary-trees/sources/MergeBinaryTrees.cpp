// Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* mergeBinaryTrees(BinaryNode* treeA, BinaryNode* treeB) {
    if (treeA == nullptr) return treeB; // @step:initialize
    if (treeB == nullptr) return treeA; // @step:initialize

    // Both nodes exist — merge by summing values
    treeA->value += treeB->value; // @step:merge-node

    // Recursively merge left and right subtrees
    treeA->left = mergeBinaryTrees(treeA->left, treeB->left); // @step:traverse-left
    treeA->right = mergeBinaryTrees(treeA->right, treeB->right); // @step:traverse-right

    return treeA; // @step:visit
}
