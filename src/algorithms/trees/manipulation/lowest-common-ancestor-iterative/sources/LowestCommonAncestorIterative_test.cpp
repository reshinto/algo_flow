// g++ -o lca_iter_test LowestCommonAncestorIterative_test.cpp && ./lca_iter_test
#include "LowestCommonAncestorIterative.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeLCAINode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

BinaryNode* buildLCAI7NodeTree() {
    return makeLCAINode(4,
        makeLCAINode(2, makeLCAINode(1), makeLCAINode(3)),
        makeLCAINode(6, makeLCAINode(5), makeLCAINode(7)));
}

int main() {
    LowestCommonAncestorIterative algo;

    // test: null root returns null
    assert(algo.lowestCommonAncestorIterative(nullptr, 1, 2) == nullptr);

    // test: LCA(1,3) = 2
    assert(algo.lowestCommonAncestorIterative(buildLCAI7NodeTree(), 1, 3)->value == 2);

    // test: LCA(3,5) = 4 (root)
    assert(algo.lowestCommonAncestorIterative(buildLCAI7NodeTree(), 3, 5)->value == 4);

    // test: ancestor of other
    BinaryNode* tree = makeLCAINode(4, makeLCAINode(2, makeLCAINode(1), nullptr), nullptr);
    assert(algo.lowestCommonAncestorIterative(tree, 2, 1)->value == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
