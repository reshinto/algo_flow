// g++ -o bst_del_iter_test BSTDeleteIterative_test.cpp && ./bst_del_iter_test
#include "sources/BSTDeleteIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeDelIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: deletes leaf
    BSTNode* tree1 = makeDelIterNode(4, makeDelIterNode(2, makeDelIterNode(1), makeDelIterNode(3)), makeDelIterNode(6, makeDelIterNode(5), makeDelIterNode(7)));
    BSTNode* result1 = bstDeleteIterative(tree1, 7);
    assert(result1->right->right == nullptr);

    // test: deletes node with two children
    BSTNode* tree2 = makeDelIterNode(4, makeDelIterNode(2, makeDelIterNode(1), makeDelIterNode(3)), makeDelIterNode(6, makeDelIterNode(5), makeDelIterNode(7)));
    BSTNode* result2 = bstDeleteIterative(tree2, 6);
    assert(result2->right->value == 7);

    // test: returns null for only node
    assert(bstDeleteIterative(makeDelIterNode(5), 5) == nullptr);

    // test: unchanged when absent
    BSTNode* tree3 = makeDelIterNode(4, makeDelIterNode(2), makeDelIterNode(6));
    BSTNode* result3 = bstDeleteIterative(tree3, 99);
    assert(result3->value == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
