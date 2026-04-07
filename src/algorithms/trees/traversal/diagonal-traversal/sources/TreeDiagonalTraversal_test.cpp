#include "TreeDiagonalTraversal.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    TreeDiagonalTraversal sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    std::vector<std::vector<int>> expected1 = {{4, 6, 7}, {2, 5, 3}, {1}};
    assert(sol.treeDiagonalTraversal(root1) == expected1);

    // null root
    assert(sol.treeDiagonalTraversal(nullptr).empty());

    // single node
    std::vector<std::vector<int>> expected3 = {{42}};
    assert(sol.treeDiagonalTraversal(makeNode(42)) == expected3);

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3)));
    std::vector<std::vector<int>> expected4 = {{1, 2, 3}};
    assert(sol.treeDiagonalTraversal(rightSkewed) == expected4);

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(3, makeNode(2, makeNode(1)));
    std::vector<std::vector<int>> expected5 = {{3}, {2}, {1}};
    assert(sol.treeDiagonalTraversal(leftSkewed) == expected5);

    return 0;
}
