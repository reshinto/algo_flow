// g++ -o bst_kth_iter_test BSTKthSmallestIterative_test.cpp && ./bst_kth_iter_test
#include "../sources/BSTKthSmallestIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeKthIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeKthIterNode(4, makeKthIterNode(2, makeKthIterNode(1), makeKthIterNode(3)), makeKthIterNode(6, makeKthIterNode(5), makeKthIterNode(7)));

    assert(bstKthSmallestIterative(tree, 1) == 1);
    assert(bstKthSmallestIterative(tree, 2) == 2);
    assert(bstKthSmallestIterative(tree, 7) == 7);
    assert(bstKthSmallestIterative(tree, 99) == -1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
