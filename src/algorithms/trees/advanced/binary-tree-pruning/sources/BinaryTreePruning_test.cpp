// g++ -o pruning_test BinaryTreePruning_test.cpp && ./pruning_test
#include "BinaryTreePruning.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: returns null for all-zero tree
    BinaryNode* allZeros = makeNode(0, makeNode(0), makeNode(0));
    assert(binaryTreePruning(allZeros) == nullptr);

    // test: returns null for single zero
    assert(binaryTreePruning(makeNode(0)) == nullptr);

    // test: keeps single one node
    BinaryNode* oneNode = binaryTreePruning(makeNode(1));
    assert(oneNode != nullptr && oneNode->value == 1);

    // test: prunes zero-only subtrees
    BinaryNode* root = makeNode(
        1,
        makeNode(0, makeNode(0), makeNode(0)),
        makeNode(1, makeNode(0), makeNode(1))
    );
    BinaryNode* pruned = binaryTreePruning(root);
    assert(pruned != nullptr);
    assert(pruned->left == nullptr);
    assert(pruned->right != nullptr);
    assert(pruned->right->right != nullptr && pruned->right->right->value == 1);
    assert(pruned->right->left == nullptr);

    // test: null input
    assert(binaryTreePruning(nullptr) == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
