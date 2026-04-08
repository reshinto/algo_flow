// g++ -o subtree_test SubtreeOfAnotherTree_test.cpp && ./subtree_test
#include "sources/SubtreeOfAnotherTree.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeSOATNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: null subtree returns true
    assert(subtreeOfAnotherTree(makeSOATNode(1), nullptr) == true);

    // test: null main tree returns false
    assert(subtreeOfAnotherTree(nullptr, makeSOATNode(1)) == false);

    // test: subtree is left subtree
    BinaryNode* main2 = makeSOATNode(4,
        makeSOATNode(2, makeSOATNode(1), makeSOATNode(3)),
        makeSOATNode(6, makeSOATNode(5), makeSOATNode(7)));
    BinaryNode* sub2 = makeSOATNode(2, makeSOATNode(1), makeSOATNode(3));
    assert(subtreeOfAnotherTree(main2, sub2) == true);

    // test: subtree not in main tree
    assert(subtreeOfAnotherTree(
        makeSOATNode(4, makeSOATNode(2), makeSOATNode(6)),
        makeSOATNode(9)) == false);

    // test: value matches but structure differs
    assert(subtreeOfAnotherTree(
        makeSOATNode(4, makeSOATNode(2, makeSOATNode(1), nullptr), nullptr),
        makeSOATNode(2, nullptr, makeSOATNode(1))) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
