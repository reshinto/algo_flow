// g++ -o bst_lca_iter_test BSTLowestCommonAncestorIterative_test.cpp && ./bst_lca_iter_test
#include "BSTLowestCommonAncestorIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeLCAIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeLCAIterNode(4, makeLCAIterNode(2, makeLCAIterNode(1), makeLCAIterNode(3)), makeLCAIterNode(6, makeLCAIterNode(5), makeLCAIterNode(7)));

    assert(bstLowestCommonAncestorIterative(tree, 1, 3)->value == 2);
    assert(bstLowestCommonAncestorIterative(tree, 5, 7)->value == 6);
    assert(bstLowestCommonAncestorIterative(tree, 1, 7)->value == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
