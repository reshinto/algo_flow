#include "MinimumDepthIterative.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    MinimumDepthIterative sol;

    // balanced 7-node BST
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.minimumDepthIterative(root1) == 3);

    // null root
    assert(sol.minimumDepthIterative(nullptr) == 0);

    // single node
    assert(sol.minimumDepthIterative(makeNode(42)) == 1);

    // two-level tree
    assert(sol.minimumDepthIterative(makeNode(1, makeNode(2))) == 2);

    return 0;
}
