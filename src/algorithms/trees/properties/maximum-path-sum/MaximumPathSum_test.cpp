#include "sources/MaximumPathSum.cpp"
#include <cassert>
#include <climits>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    MaximumPathSum sol;

    // balanced 7-node BST: best path 3+2+4+6+7=22
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.maximumPathSum(root1) == 22);

    // single node
    assert(sol.maximumPathSum(makeNode(-3)) == -3);

    // all negative values
    TreeNode* allNeg = makeNode(-1, makeNode(-2), makeNode(-3));
    assert(sol.maximumPathSum(allNeg) == -1);

    return 0;
}
