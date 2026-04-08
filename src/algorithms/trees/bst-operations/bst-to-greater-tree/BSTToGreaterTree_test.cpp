// g++ -o bst_gt_test BSTToGreaterTree_test.cpp && ./bst_gt_test
#include "sources/BSTToGreaterTree.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeGTNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTToGreaterTree bgt;

    // test: transforms 3-node BST
    BSTNode* tree1 = makeGTNode(2, makeGTNode(1), makeGTNode(3));
    BSTNode* result1 = bgt.bstToGreaterTree(tree1);
    assert(result1->value == 5);
    assert(result1->right->value == 3);
    assert(result1->left->value == 6);

    // test: single node
    BSTNode* result2 = bgt.bstToGreaterTree(makeGTNode(5));
    assert(result2->value == 5);

    // test: null tree
    assert(bgt.bstToGreaterTree(nullptr) == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
