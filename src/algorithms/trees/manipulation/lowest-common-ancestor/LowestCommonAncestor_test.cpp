// g++ -o lca_test LowestCommonAncestor_test.cpp && ./lca_test
#include "sources/LowestCommonAncestor.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeLCANode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

BinaryNode* buildLCA7NodeTree() {
    return makeLCANode(4,
        makeLCANode(2, makeLCANode(1), makeLCANode(3)),
        makeLCANode(6, makeLCANode(5), makeLCANode(7)));
}

int main() {
    // test: null root returns null
    assert(lowestCommonAncestor(nullptr, 1, 2) == nullptr);

    // test: LCA(1,3) = 2
    assert(lowestCommonAncestor(buildLCA7NodeTree(), 1, 3)->value == 2);

    // test: LCA(3,5) = 4 (root)
    assert(lowestCommonAncestor(buildLCA7NodeTree(), 3, 5)->value == 4);

    // test: ancestor of other
    BinaryNode* tree = makeLCANode(4, makeLCANode(2, makeLCANode(1), nullptr), nullptr);
    assert(lowestCommonAncestor(tree, 2, 1)->value == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
