#include "sources/IsSymmetricTree.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    IsSymmetricTree sol;

    // non-symmetric BST
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.isSymmetricTree(root1) == false);

    // symmetric tree
    TreeNode* root2 = makeNode(1,
        makeNode(2, makeNode(3), makeNode(4)),
        makeNode(2, makeNode(4), makeNode(3)));
    assert(sol.isSymmetricTree(root2) == true);

    // null root
    assert(sol.isSymmetricTree(nullptr) == true);

    // single node
    assert(sol.isSymmetricTree(makeNode(1)) == true);

    // asymmetric tree
    TreeNode* root3 = makeNode(1,
        makeNode(2, nullptr, makeNode(3)),
        makeNode(2, nullptr, makeNode(3)));
    assert(sol.isSymmetricTree(root3) == false);

    return 0;
}
