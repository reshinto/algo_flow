// g++ -o bst_kth_test BSTKthSmallest_test.cpp && ./bst_kth_test
#include "sources/BSTKthSmallest.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeKthNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTKthSmallest bks;
    BSTNode* tree = makeKthNode(4, makeKthNode(2, makeKthNode(1), makeKthNode(3)), makeKthNode(6, makeKthNode(5), makeKthNode(7)));

    assert(bks.bstKthSmallest(tree, 1) == 1);
    assert(bks.bstKthSmallest(tree, 3) == 3);
    assert(bks.bstKthSmallest(tree, 7) == 7);
    assert(bks.bstKthSmallest(tree, 4) == 4);
    assert(bks.bstKthSmallest(tree, 10) == -1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
