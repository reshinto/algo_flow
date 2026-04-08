// g++ -o bst_gti_test BSTToGreaterTreeIterative_test.cpp && ./bst_gti_test
#include "sources/BSTToGreaterTreeIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeGTIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: transforms 3-node BST
    BSTNode* tree1 = makeGTIterNode(2, makeGTIterNode(1), makeGTIterNode(3));
    BSTNode* result1 = bstToGreaterTreeIterative(tree1);
    assert(result1->value == 5);
    assert(result1->right->value == 3);
    assert(result1->left->value == 6);

    // test: single node
    BSTNode* result2 = bstToGreaterTreeIterative(makeGTIterNode(7));
    assert(result2->value == 7);

    // test: null tree
    assert(bstToGreaterTreeIterative(nullptr) == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
