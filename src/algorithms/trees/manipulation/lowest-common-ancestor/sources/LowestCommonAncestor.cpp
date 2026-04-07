// Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

struct BinaryNode {
    int value;
    BinaryNode* left;
    BinaryNode* right;
    BinaryNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

BinaryNode* lowestCommonAncestor(BinaryNode* root, int nodeValueA, int nodeValueB) {
    if (root == nullptr) return nullptr; // @step:initialize
    if (root->value == nodeValueA || root->value == nodeValueB) return root; // @step:compare

    // Search left and right subtrees
    BinaryNode* leftResult = lowestCommonAncestor(root->left, nodeValueA, nodeValueB); // @step:traverse-left
    BinaryNode* rightResult = lowestCommonAncestor(root->right, nodeValueA, nodeValueB); // @step:traverse-right

    // If both sides found a target node, current node is the LCA
    if (leftResult != nullptr && rightResult != nullptr) return root; // @step:visit

    // Otherwise return whichever side found a target node
    return leftResult != nullptr ? leftResult : rightResult; // @step:visit
}
