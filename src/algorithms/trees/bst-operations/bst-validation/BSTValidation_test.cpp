// g++ -o bst_val_test BSTValidation_test.cpp && ./bst_val_test
#include "sources/BSTValidation.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeBSTValNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: validates a correct BST
    BSTNode* tree1 = makeBSTValNode(4,
        makeBSTValNode(2, makeBSTValNode(1), makeBSTValNode(3)),
        makeBSTValNode(6, makeBSTValNode(5), makeBSTValNode(7)));
    assert(bstValidation(tree1) == true);

    // test: rejects an invalid BST
    BSTNode* invalid1 = makeBSTValNode(5, makeBSTValNode(6), makeBSTValNode(7));
    assert(bstValidation(invalid1) == false);

    // test: accepts null
    assert(bstValidation(nullptr) == true);

    // test: accepts single node
    assert(bstValidation(makeBSTValNode(42)) == true);

    // test: rejects non-local violation
    BSTNode* invalid2 = makeBSTValNode(5, nullptr, makeBSTValNode(10, makeBSTValNode(3), nullptr));
    assert(bstValidation(invalid2) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
