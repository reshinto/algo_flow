#include "PathSumIterative.cpp"
#include <cassert>

TreeNode* makeNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    PathSumIterative sol;

    // path sum exists (4+2+1=7)
    TreeNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert(sol.pathSumIterative(root1, 7) == true);

    // path sum does not exist
    assert(sol.pathSumIterative(root1, 100) == false);

    // null root
    assert(sol.pathSumIterative(nullptr, 5) == false);

    // single node matching
    assert(sol.pathSumIterative(makeNode(5), 5) == true);

    return 0;
}
