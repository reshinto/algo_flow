// g++ -o bst_search_iter_test BSTSearchIterative_test.cpp && ./bst_search_iter_test
#include "../sources/BSTSearchIterative.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeSearchIterNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    BSTNode* tree = makeSearchIterNode(4, makeSearchIterNode(2, makeSearchIterNode(1), makeSearchIterNode(3)), makeSearchIterNode(6, makeSearchIterNode(5), makeSearchIterNode(7)));

    assert(bstSearchIterative(tree, 6)->value == 6);
    assert(bstSearchIterative(tree, 10) == nullptr);
    assert(bstSearchIterative(tree, 4)->value == 4);
    assert(bstSearchIterative(nullptr, 5) == nullptr);
    assert(bstSearchIterative(tree, 1)->value == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
