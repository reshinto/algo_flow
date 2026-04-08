// g++ -o bst_lca_test BSTLowestCommonAncestor_test.cpp && ./bst_lca_test
#include "../sources/BSTLowestCommonAncestor.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeLCANode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeLCANode(4, makeLCANode(2, makeLCANode(1), makeLCANode(3)), makeLCANode(6, makeLCANode(5), makeLCANode(7)));

    assert(bstLowestCommonAncestor(tree, 1, 3)->value == 2);
    assert(bstLowestCommonAncestor(tree, 1, 7)->value == 4);
    assert(bstLowestCommonAncestor(tree, 5, 7)->value == 6);
    assert(bstLowestCommonAncestor(tree, 2, 3)->value == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
