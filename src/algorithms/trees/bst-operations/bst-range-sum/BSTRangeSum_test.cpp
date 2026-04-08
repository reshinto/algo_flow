// g++ -o bst_rs_test BSTRangeSum_test.cpp && ./bst_rs_test
#include "sources/BSTRangeSum.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeRSNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeRSNode(4, makeRSNode(2, makeRSNode(1), makeRSNode(3)), makeRSNode(6, makeRSNode(5), makeRSNode(7)));

    assert(bstRangeSum(tree, 2, 6) == 20);
    assert(bstRangeSum(tree, 1, 7) == 28);
    assert(bstRangeSum(tree, 10, 20) == 0);
    assert(bstRangeSum(tree, 4, 4) == 4);
    assert(bstRangeSum(nullptr, 1, 7) == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
