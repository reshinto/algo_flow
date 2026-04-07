#include "LevelOrderTraversal.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    LevelOrderTraversal sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    std::vector<std::vector<int>> expected1 = {{4}, {2, 6}, {1, 3, 5, 7}};
    assert(sol.levelOrderTraversal(root1) == expected1);

    // null root
    assert(sol.levelOrderTraversal(nullptr).empty());

    // single node
    std::vector<std::vector<int>> expected3 = {{42}};
    assert(sol.levelOrderTraversal(makeNode(42)) == expected3);

    // left-skewed tree
    BSTNode* leftSkewed = makeNode(5, makeNode(4, makeNode(3)));
    std::vector<std::vector<int>> expected4 = {{5}, {4}, {3}};
    assert(sol.levelOrderTraversal(leftSkewed) == expected4);

    // right-skewed tree
    BSTNode* rightSkewed = makeNode(1, nullptr, makeNode(2, nullptr, makeNode(3)));
    std::vector<std::vector<int>> expected5 = {{1}, {2}, {3}};
    assert(sol.levelOrderTraversal(rightSkewed) == expected5);

    return 0;
}
