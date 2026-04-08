// g++ -std=c++17 -o bst_fci_test BSTFloorCeilIterative_test.cpp && ./bst_fci_test
#include "../sources/BSTFloorCeilIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeFloorCeilIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeFloorCeilIterNode(4,
        makeFloorCeilIterNode(2, makeFloorCeilIterNode(1), makeFloorCeilIterNode(3)),
        makeFloorCeilIterNode(6, makeFloorCeilIterNode(5), makeFloorCeilIterNode(7))
    );

    // test: exact match
    FloorCeilResult result1 = bstFloorCeilIterative(tree, 3);
    assert(result1.floor.has_value() && result1.floor.value() == 3);
    assert(result1.ceil.has_value() && result1.ceil.value() == 3);

    // test: null floor below all
    FloorCeilResult result2 = bstFloorCeilIterative(tree, 0);
    assert(!result2.floor.has_value());
    assert(result2.ceil.has_value() && result2.ceil.value() == 1);

    // test: null tree
    FloorCeilResult result3 = bstFloorCeilIterative(nullptr, 5);
    assert(!result3.floor.has_value());
    assert(!result3.ceil.has_value());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
