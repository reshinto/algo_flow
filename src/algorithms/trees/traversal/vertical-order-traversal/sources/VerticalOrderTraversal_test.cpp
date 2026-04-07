#include "VerticalOrderTraversal.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    VerticalOrderTraversal sol;

    // balanced 7-node BST: col -2:[1], col -1:[2], col 0:[4,3,5], col 1:[6], col 2:[7]
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    std::vector<std::vector<int>> expected1 = {{1}, {2}, {4, 3, 5}, {6}, {7}};
    assert(sol.verticalOrderTraversal(root1) == expected1);

    // null root
    assert(sol.verticalOrderTraversal(nullptr).empty());

    // single node
    std::vector<std::vector<int>> expected3 = {{42}};
    assert(sol.verticalOrderTraversal(makeNode(42)) == expected3);

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3)));
    std::vector<std::vector<int>> expected4 = {{1}, {2}, {3}};
    assert(sol.verticalOrderTraversal(rightSkewed) == expected4);

    // left child
    std::vector<std::vector<int>> expected5 = {{3}, {5}};
    assert(sol.verticalOrderTraversal(makeNode(5, makeNode(3))) == expected5);

    return 0;
}
