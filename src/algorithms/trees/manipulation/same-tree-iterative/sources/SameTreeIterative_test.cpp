// g++ -o same_iter_test SameTreeIterative_test.cpp && ./same_iter_test
#include "SameTreeIterative.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeSTINode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: two null trees
    assert(sameTreeIterative(nullptr, nullptr) == true);

    // test: one null tree
    assert(sameTreeIterative(makeSTINode(1), nullptr) == false);

    // test: identical single nodes
    assert(sameTreeIterative(makeSTINode(1), makeSTINode(1)) == true);

    // test: different single nodes
    assert(sameTreeIterative(makeSTINode(1), makeSTINode(2)) == false);

    // test: identical 7-node BSTs
    BinaryNode* treeA = makeSTINode(4,
        makeSTINode(2, makeSTINode(1), makeSTINode(3)),
        makeSTINode(6, makeSTINode(5), makeSTINode(7)));
    BinaryNode* treeB = makeSTINode(4,
        makeSTINode(2, makeSTINode(1), makeSTINode(3)),
        makeSTINode(6, makeSTINode(5), makeSTINode(7)));
    assert(sameTreeIterative(treeA, treeB) == true);

    // test: different structures
    assert(sameTreeIterative(
        makeSTINode(1, makeSTINode(2), nullptr),
        makeSTINode(1, nullptr, makeSTINode(2))) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
