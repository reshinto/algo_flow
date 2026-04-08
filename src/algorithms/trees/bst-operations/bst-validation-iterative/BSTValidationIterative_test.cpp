// g++ -o bst_val_iter_test BSTValidationIterative_test.cpp && ./bst_val_iter_test
#include "sources/BSTValidationIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeBSTValIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: validates a correct BST
    BSTNode* tree1 = makeBSTValIterNode(4,
        makeBSTValIterNode(2, makeBSTValIterNode(1), makeBSTValIterNode(3)),
        makeBSTValIterNode(6, makeBSTValIterNode(5), makeBSTValIterNode(7)));
    assert(bstValidationIterative(tree1) == true);

    // test: rejects an invalid BST
    BSTNode* invalid1 = makeBSTValIterNode(5, makeBSTValIterNode(6), makeBSTValIterNode(7));
    assert(bstValidationIterative(invalid1) == false);

    // test: accepts null
    assert(bstValidationIterative(nullptr) == true);

    // test: accepts single node
    assert(bstValidationIterative(makeBSTValIterNode(10)) == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
