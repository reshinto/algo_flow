// g++ -o bst_ins_test BSTInsert_test.cpp && ./bst_ins_test
#include "sources/BSTInsert.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeInsNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: inserts greater than all
    BSTNode* tree1 = makeInsNode(4, makeInsNode(2, makeInsNode(1), makeInsNode(3)), makeInsNode(6, makeInsNode(5), makeInsNode(7)));
    BSTNode* result1 = bstInsert(tree1, 8);
    assert(result1->right->right->right->value == 8);

    // test: inserts into left subtree
    BSTNode* tree2 = makeInsNode(4, makeInsNode(2, makeInsNode(1), makeInsNode(3)), makeInsNode(6, makeInsNode(5), makeInsNode(7)));
    BSTNode* result2 = bstInsert(tree2, 0);
    assert(result2->left->left->left->value == 0);

    // test: creates root from null
    BSTNode* result3 = bstInsert(nullptr, 10);
    assert(result3->value == 10);

    // test: ignores duplicates
    BSTNode* tree3 = makeInsNode(4, makeInsNode(2), makeInsNode(6));
    BSTNode* result4 = bstInsert(tree3, 4);
    assert(result4->value == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
