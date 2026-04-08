// g++ -o distribute_coins_test DistributeCoins_test.cpp && ./distribute_coins_test
#include "sources/DistributeCoins.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeDCNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: null root returns 0
    assert(distributeCoins(nullptr) == 0);

    // test: single node with 1 coin
    assert(distributeCoins(makeDCNode(1)) == 0);

    // test: root with 2 coins and child with 0
    assert(distributeCoins(makeDCNode(2, makeDCNode(0))) == 1);

    // test: root with 3 coins and two zero children
    assert(distributeCoins(makeDCNode(3, makeDCNode(0), makeDCNode(0))) == 2);

    // test: all coins at deep leaf
    assert(distributeCoins(makeDCNode(0, makeDCNode(0, makeDCNode(3), nullptr), makeDCNode(0))) == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
