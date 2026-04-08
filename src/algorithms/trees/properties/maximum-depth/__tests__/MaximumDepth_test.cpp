#include "../sources/MaximumDepth.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    MaximumDepth sol;

    // balanced 7-node BST
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.maximumDepth(root1) == 3);

    // null root
    assert(sol.maximumDepth(nullptr) == 0);

    // single node
    assert(sol.maximumDepth(makeNode(42)) == 1);

    // left-skewed tree
    TreeNode* skewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1)))));
    assert(sol.maximumDepth(skewed) == 5);

    // two-level tree
    assert(sol.maximumDepth(makeNode(1, makeNode(2))) == 2);

    return 0;
}
