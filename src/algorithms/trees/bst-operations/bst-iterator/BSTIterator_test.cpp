// g++ -o bst_iter_test BSTIterator_test.cpp && ./bst_iter_test
#include "sources/BSTIterator.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeIterNode(4, makeIterNode(2, makeIterNode(1), makeIterNode(3)), makeIterNode(6, makeIterNode(5), makeIterNode(7)));

    // test: sorted ascending order
    assert(bstIterator(tree) == (std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    // test: null tree returns empty
    assert(bstIterator(nullptr).empty());

    // test: single element
    assert(bstIterator(makeIterNode(42)) == (std::vector<int>{42}));

    // test: right-skewed tree
    BSTNode* skewed = makeIterNode(1, nullptr, makeIterNode(2, nullptr, makeIterNode(3)));
    assert(bstIterator(skewed) == (std::vector<int>{1, 2, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
