#include "../sources/SumRootToLeafNumbers.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    SumRootToLeafNumbers sol;

    // 7-node BST: 421+423+465+467=1776
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.sumRootToLeafNumbers(root1) == 1776);

    // null root
    assert(sol.sumRootToLeafNumbers(nullptr) == 0);

    // single node
    assert(sol.sumRootToLeafNumbers(makeNode(5)) == 5);

    // simple 3-node tree: 12+13=25
    assert(sol.sumRootToLeafNumbers(makeNode(1, makeNode(2), makeNode(3))) == 25);

    return 0;
}
