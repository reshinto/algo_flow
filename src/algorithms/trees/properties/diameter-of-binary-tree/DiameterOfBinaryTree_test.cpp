#include "sources/DiameterOfBinaryTree.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    DiameterOfBinaryTree sol;

    // balanced 7-node BST: diameter is 4
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.diameterOfBinaryTree(root1) == 4);

    // null root
    assert(sol.diameterOfBinaryTree(nullptr) == 0);

    // single node
    assert(sol.diameterOfBinaryTree(makeNode(1)) == 0);

    // two-node tree
    assert(sol.diameterOfBinaryTree(makeNode(1, makeNode(2))) == 1);

    // skewed tree
    TreeNode* skewed = makeNode(1, makeNode(2, makeNode(3, makeNode(4))));
    assert(sol.diameterOfBinaryTree(skewed) == 3);

    return 0;
}
