#include "ZigzagLevelOrder.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    ZigzagLevelOrder sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    std::vector<std::vector<int>> expected1 = {{4}, {6, 2}, {1, 3, 5, 7}};
    assert(sol.zigzagLevelOrder(root1) == expected1);

    // null root
    assert(sol.zigzagLevelOrder(nullptr).empty());

    // single node
    std::vector<std::vector<int>> expected3 = {{42}};
    assert(sol.zigzagLevelOrder(makeNode(42)) == expected3);

    // two-level with both children
    BSTNode* twoLevel = makeNode(1, makeNode(2), makeNode(3));
    std::vector<std::vector<int>> expected4 = {{1}, {3, 2}};
    assert(sol.zigzagLevelOrder(twoLevel) == expected4);

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(3, makeNode(2, makeNode(1)));
    std::vector<std::vector<int>> expected5 = {{3}, {2}, {1}};
    assert(sol.zigzagLevelOrder(leftSkewed) == expected5);

    return 0;
}
