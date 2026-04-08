#include "sources/BSTPreorderIterative.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTPreorderIterative sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert((sol.bstPreorderIterative(root1) == std::vector<int>{4, 2, 1, 3, 6, 5, 7}));

    // null root
    assert(sol.bstPreorderIterative(nullptr).empty());

    // single node
    assert((sol.bstPreorderIterative(makeNode(42)) == std::vector<int>{42}));

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1)))));
    assert((sol.bstPreorderIterative(leftSkewed) == std::vector<int>{5, 4, 3, 2, 1}));

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3, nullptr, makeNode(4, nullptr, makeNode(5)))));
    assert((sol.bstPreorderIterative(rightSkewed) == std::vector<int>{1, 2, 3, 4, 5}));

    // left child only
    assert((sol.bstPreorderIterative(makeNode(5, makeNode(3))) == std::vector<int>{5, 3}));

    // right child only
    assert((sol.bstPreorderIterative(makeNode(5, nullptr, makeNode(8))) == std::vector<int>{5, 8}));

    return 0;
}
