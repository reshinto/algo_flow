#include "SumOfLeftLeaves.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    SumOfLeftLeaves sol;

    // 7-node BST: left leaves 1 and 5, sum = 6
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.sumOfLeftLeaves(root1) == 6);

    // null root
    assert(sol.sumOfLeftLeaves(nullptr) == 0);

    // single node
    assert(sol.sumOfLeftLeaves(makeNode(1)) == 0);

    // single left leaf
    assert(sol.sumOfLeftLeaves(makeNode(1, makeNode(5))) == 5);

    // no left leaves
    assert(sol.sumOfLeftLeaves(makeNode(1, nullptr, makeNode(2))) == 0);

    return 0;
}
