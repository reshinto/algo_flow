#include "../sources/SumOfLeftLeavesIterative.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    SumOfLeftLeavesIterative sol;

    // 7-node BST: left leaves 1 and 5, sum = 6
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.sumOfLeftLeavesIterative(root1) == 6);

    // null root
    assert(sol.sumOfLeftLeavesIterative(nullptr) == 0);

    // single node
    assert(sol.sumOfLeftLeavesIterative(makeNode(1)) == 0);

    // single left leaf
    assert(sol.sumOfLeftLeavesIterative(makeNode(1, makeNode(5))) == 5);

    return 0;
}
