// g++ -o btt_test BinaryTreeTilt_test.cpp && ./btt_test
#include "sources/BinaryTreeTilt.cpp"
#include <cassert>
#include <iostream>

TreeNode* makeBTTNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: null root returns 0
    assert(binaryTreeTilt(nullptr) == 0);

    // test: single node returns 0
    assert(binaryTreeTilt(makeBTTNode(1)) == 0);

    // test: simple 3-node tree
    assert(binaryTreeTilt(makeBTTNode(1, makeBTTNode(2), makeBTTNode(3))) == 1);

    // test: non-negative for 7-node tree
    TreeNode* tree = makeBTTNode(4,
        makeBTTNode(2, makeBTTNode(1), makeBTTNode(3)),
        makeBTTNode(6, makeBTTNode(5), makeBTTNode(7)));
    assert(binaryTreeTilt(tree) >= 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
