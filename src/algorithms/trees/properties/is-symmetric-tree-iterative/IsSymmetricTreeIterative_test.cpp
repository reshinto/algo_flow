#include "sources/IsSymmetricTreeIterative.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    IsSymmetricTreeIterative sol;

    // symmetric tree
    TreeNode* root1 = makeNode(1,
        makeNode(2, makeNode(3), makeNode(4)),
        makeNode(2, makeNode(4), makeNode(3)));
    assert(sol.isSymmetricTreeIterative(root1) == true);

    // null root
    assert(sol.isSymmetricTreeIterative(nullptr) == true);

    // single node
    assert(sol.isSymmetricTreeIterative(makeNode(1)) == true);

    // asymmetric tree
    TreeNode* root2 = makeNode(1,
        makeNode(2, nullptr, makeNode(3)),
        makeNode(2, nullptr, makeNode(3)));
    assert(sol.isSymmetricTreeIterative(root2) == false);

    return 0;
}
