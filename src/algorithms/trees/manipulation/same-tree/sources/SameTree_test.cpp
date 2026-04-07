// g++ -o same_tree_test SameTree_test.cpp && ./same_tree_test
#include "SameTree.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeSTNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: two null trees
    assert(sameTree(nullptr, nullptr) == true);

    // test: one null tree
    assert(sameTree(makeSTNode(1), nullptr) == false);

    // test: identical single nodes
    assert(sameTree(makeSTNode(1), makeSTNode(1)) == true);

    // test: different single nodes
    assert(sameTree(makeSTNode(1), makeSTNode(2)) == false);

    // test: identical 7-node BSTs
    BinaryNode* treeA = makeSTNode(4,
        makeSTNode(2, makeSTNode(1), makeSTNode(3)),
        makeSTNode(6, makeSTNode(5), makeSTNode(7)));
    BinaryNode* treeB = makeSTNode(4,
        makeSTNode(2, makeSTNode(1), makeSTNode(3)),
        makeSTNode(6, makeSTNode(5), makeSTNode(7)));
    assert(sameTree(treeA, treeB) == true);

    // test: different structures
    assert(sameTree(
        makeSTNode(1, makeSTNode(2), nullptr),
        makeSTNode(1, nullptr, makeSTNode(2))) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
