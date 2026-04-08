#include "sources/MinimumDepth.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    MinimumDepth sol;

    // balanced 7-node BST
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.minimumDepth(root1) == 3);

    // null root
    assert(sol.minimumDepth(nullptr) == 0);

    // single node
    assert(sol.minimumDepth(makeNode(42)) == 1);

    // single-child not a leaf
    TreeNode* singleChild = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3)));
    assert(sol.minimumDepth(singleChild) == 3);

    // two-level tree
    assert(sol.minimumDepth(makeNode(1, makeNode(2))) == 2);

    return 0;
}
