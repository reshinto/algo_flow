// g++ -o bst_search_test BSTSearch_test.cpp && ./bst_search_test
#include "../sources/BSTSearch.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeSearchNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeSearchNode(4, makeSearchNode(2, makeSearchNode(1), makeSearchNode(3)), makeSearchNode(6, makeSearchNode(5), makeSearchNode(7)));

    assert(bstSearch(tree, 5)->value == 5);
    assert(bstSearch(tree, 9) == nullptr);
    assert(bstSearch(tree, 4)->value == 4);
    assert(bstSearch(tree, 1)->value == 1);
    assert(bstSearch(nullptr, 5) == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
