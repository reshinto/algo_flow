// g++ -o flip_equiv_test FlipEquivalentTrees_test.cpp && ./flip_equiv_test
#include "sources/FlipEquivalentTrees.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeFETNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: two null trees
    assert(flipEquivalentTrees(nullptr, nullptr) == true);

    // test: one null tree
    assert(flipEquivalentTrees(makeFETNode(1), nullptr) == false);
    assert(flipEquivalentTrees(nullptr, makeFETNode(1)) == false);

    // test: identical trees
    assert(flipEquivalentTrees(
        makeFETNode(1, makeFETNode(2), makeFETNode(3)),
        makeFETNode(1, makeFETNode(2), makeFETNode(3))) == true);

    // test: flipped at root
    assert(flipEquivalentTrees(
        makeFETNode(1, makeFETNode(2), makeFETNode(3)),
        makeFETNode(1, makeFETNode(3), makeFETNode(2))) == true);

    // test: different root values
    assert(flipEquivalentTrees(makeFETNode(1), makeFETNode(2)) == false);

    // test: different leaf values
    assert(flipEquivalentTrees(
        makeFETNode(1, makeFETNode(2), makeFETNode(3)),
        makeFETNode(1, makeFETNode(9), makeFETNode(3))) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
