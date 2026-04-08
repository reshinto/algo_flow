#include "sources/BSTPostorderIterative.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTPostorderIterative sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert((sol.bstPostorderIterative(root1) == std::vector<int>{1, 3, 2, 5, 7, 6, 4}));

    // null root
    assert(sol.bstPostorderIterative(nullptr).empty());

    // single node
    assert((sol.bstPostorderIterative(makeNode(42)) == std::vector<int>{42}));

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1)))));
    assert((sol.bstPostorderIterative(leftSkewed) == std::vector<int>{1, 2, 3, 4, 5}));

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3, nullptr, makeNode(4, nullptr, makeNode(5)))));
    assert((sol.bstPostorderIterative(rightSkewed) == std::vector<int>{5, 4, 3, 2, 1}));

    // left child only
    assert((sol.bstPostorderIterative(makeNode(5, makeNode(3))) == std::vector<int>{3, 5}));

    // right child only
    assert((sol.bstPostorderIterative(makeNode(5, nullptr, makeNode(8))) == std::vector<int>{8, 5}));

    return 0;
}
