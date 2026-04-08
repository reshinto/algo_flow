#include "../sources/BoundaryTraversal.cpp"
#include <cassert>
#include <vector>

BSTNode* makeNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BoundaryTraversal sol;

    // balanced 7-node BST
    BSTNode* root1 = makeNode(4,
        makeNode(2, makeNode(1), makeNode(3)),
        makeNode(6, makeNode(5), makeNode(7)));
    assert((sol.boundaryTraversal(root1) == std::vector<int>{4, 2, 1, 3, 5, 7, 6}));

    // null root
    assert(sol.boundaryTraversal(nullptr).empty());

    // single node
    assert((sol.boundaryTraversal(makeNode(42)) == std::vector<int>{42}));

    // only right child
    assert((sol.boundaryTraversal(makeNode(5, nullptr, makeNode(8))) == std::vector<int>{5, 8}));

    // only left child
    assert((sol.boundaryTraversal(makeNode(5, makeNode(3))) == std::vector<int>{5, 3}));

    return 0;
}
