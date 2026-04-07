#include "ReverseLevelOrder.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    ReverseLevelOrder sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    std::vector<std::vector<int>> expected1 = {{1, 3, 5, 7}, {2, 6}, {4}};
    assert(sol.reverseLevelOrder(root1) == expected1);

    // null root
    assert(sol.reverseLevelOrder(nullptr).empty());

    // single node
    std::vector<std::vector<int>> expected3 = {{42}};
    assert(sol.reverseLevelOrder(makeNode(42)) == expected3);

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(5, makeNode(4, makeNode(3)));
    std::vector<std::vector<int>> expected4 = {{3}, {4}, {5}};
    assert(sol.reverseLevelOrder(leftSkewed) == expected4);

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3)));
    std::vector<std::vector<int>> expected5 = {{3}, {2}, {1}};
    assert(sol.reverseLevelOrder(rightSkewed) == expected5);

    return 0;
}
