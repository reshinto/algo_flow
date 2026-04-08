// g++ -std=c++17 -o bst_fc_test BSTFloorCeil_test.cpp && ./bst_fc_test
#include "sources/BSTFloorCeil.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeFloorCeilNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeFloorCeilNode(4,
        makeFloorCeilNode(2, makeFloorCeilNode(1), makeFloorCeilNode(3)),
        makeFloorCeilNode(6, makeFloorCeilNode(5), makeFloorCeilNode(7))
    );

    // test: exact match for existing value
    FloorCeilResult result1 = bstFloorCeil(tree, 5);
    assert(result1.floor.has_value() && result1.floor.value() == 5);
    assert(result1.ceil.has_value() && result1.ceil.value() == 5);

    // test: null floor for value below all
    FloorCeilResult result2 = bstFloorCeil(tree, 0);
    assert(!result2.floor.has_value());
    assert(result2.ceil.has_value() && result2.ceil.value() == 1);

    // test: null ceil for value above all
    FloorCeilResult result3 = bstFloorCeil(tree, 8);
    assert(result3.floor.has_value() && result3.floor.value() == 7);
    assert(!result3.ceil.has_value());

    // test: null tree
    FloorCeilResult result4 = bstFloorCeil(nullptr, 5);
    assert(!result4.floor.has_value());
    assert(!result4.ceil.has_value());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
