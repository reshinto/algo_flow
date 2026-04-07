// g++ -o rsv_rec_test RightSideViewRecursive_test.cpp && ./rsv_rec_test
#include "RightSideViewRecursive.cpp"
#include <cassert>
#include <iostream>
#include <vector>

BinaryNode* makeRSVRNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: null returns empty
    assert(rightSideViewRecursive(nullptr).empty());

    // test: single node
    assert(rightSideViewRecursive(makeRSVRNode(1)) == std::vector<int>({1}));

    // test: 7-node BST
    BinaryNode* tree1 = makeRSVRNode(4,
        makeRSVRNode(2, makeRSVRNode(1), makeRSVRNode(3)),
        makeRSVRNode(6, makeRSVRNode(5), makeRSVRNode(7)));
    assert(rightSideViewRecursive(tree1) == std::vector<int>({4, 6, 7}));

    // test: left-skewed tree
    BinaryNode* tree2 = makeRSVRNode(1, makeRSVRNode(2, makeRSVRNode(3), nullptr), nullptr);
    assert(rightSideViewRecursive(tree2) == std::vector<int>({1, 2, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
