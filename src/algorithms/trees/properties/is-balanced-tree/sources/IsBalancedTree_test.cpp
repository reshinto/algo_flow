#include "IsBalancedTree.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    IsBalancedTree sol;

    // balanced 7-node BST
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.isBalancedTree(root1) == true);

    // null root
    assert(sol.isBalancedTree(nullptr) == true);

    // single node
    assert(sol.isBalancedTree(makeNode(1)) == true);

    // unbalanced tree
    TreeNode* unbalanced = makeNode(1, makeNode(2, makeNode(3, makeNode(4))));
    assert(sol.isBalancedTree(unbalanced) == false);

    // two-node tree
    assert(sol.isBalancedTree(makeNode(1, makeNode(2))) == true);

    return 0;
}
