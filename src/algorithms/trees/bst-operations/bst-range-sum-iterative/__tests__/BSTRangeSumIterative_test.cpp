// g++ -o bst_rsi_test BSTRangeSumIterative_test.cpp && ./bst_rsi_test
#include "../sources/BSTRangeSumIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeRSIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeRSIterNode(4, makeRSIterNode(2, makeRSIterNode(1), makeRSIterNode(3)), makeRSIterNode(6, makeRSIterNode(5), makeRSIterNode(7)));

    assert(bstRangeSumIterative(tree, 3, 7) == 25);
    assert(bstRangeSumIterative(tree, 1, 7) == 28);
    assert(bstRangeSumIterative(tree, 10, 20) == 0);
    assert(bstRangeSumIterative(nullptr, 1, 7) == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
