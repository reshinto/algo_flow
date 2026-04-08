#include "sources/MorrisInorderTraversal.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    MorrisInorderTraversal sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert((sol.morrisInorderTraversal(root1) == std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    // null root
    assert(sol.morrisInorderTraversal(nullptr).empty());

    // single node
    assert((sol.morrisInorderTraversal(makeNode(42)) == std::vector<int>{42}));

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1)))));
    assert((sol.morrisInorderTraversal(leftSkewed) == std::vector<int>{1, 2, 3, 4, 5}));

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3, nullptr, makeNode(4, nullptr, makeNode(5)))));
    assert((sol.morrisInorderTraversal(rightSkewed) == std::vector<int>{1, 2, 3, 4, 5}));

    return 0;
}
