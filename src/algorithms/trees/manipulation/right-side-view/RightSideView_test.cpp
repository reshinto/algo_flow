// g++ -o rsv_test RightSideView_test.cpp && ./rsv_test
#include "sources/RightSideView.cpp"
#include <cassert>
#include <iostream>
#include <vector>

BinaryNode* makeRSVNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: null returns empty
    assert(rightSideView(nullptr).empty());

    // test: single node
    assert(rightSideView(makeRSVNode(1)) == std::vector<int>({1}));

    // test: 7-node BST
    BinaryNode* tree1 = makeRSVNode(4,
        makeRSVNode(2, makeRSVNode(1), makeRSVNode(3)),
        makeRSVNode(6, makeRSVNode(5), makeRSVNode(7)));
    assert(rightSideView(tree1) == std::vector<int>({4, 6, 7}));

    // test: left-skewed tree
    BinaryNode* tree2 = makeRSVNode(1, makeRSVNode(2, makeRSVNode(3), nullptr), nullptr);
    assert(rightSideView(tree2) == std::vector<int>({1, 2, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
