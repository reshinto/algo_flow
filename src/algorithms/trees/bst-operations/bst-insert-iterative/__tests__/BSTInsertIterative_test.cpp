// g++ -o bst_ins_iter_test BSTInsertIterative_test.cpp && ./bst_ins_iter_test
#include "../sources/BSTInsertIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeInsIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: inserts greater than all
    BSTNode* tree1 = makeInsIterNode(4, makeInsIterNode(2, makeInsIterNode(1), makeInsIterNode(3)), makeInsIterNode(6, makeInsIterNode(5), makeInsIterNode(7)));
    BSTNode* result1 = bstInsertIterative(tree1, 8);
    assert(result1->right->right->right->value == 8);

    // test: creates root from null
    BSTNode* result2 = bstInsertIterative(nullptr, 5);
    assert(result2->value == 5);

    // test: inserts left child
    BSTNode* result3 = bstInsertIterative(makeInsIterNode(10), 5);
    assert(result3->left->value == 5);

    // test: ignores duplicates
    BSTNode* tree2 = makeInsIterNode(4, makeInsIterNode(2), makeInsIterNode(6));
    BSTNode* result4 = bstInsertIterative(tree2, 2);
    assert(result4->left->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
