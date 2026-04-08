// g++ -o bst_rec_test BSTRecoverSwapped_test.cpp && ./bst_rec_test
#include "sources/BSTRecoverSwapped.cpp"
#include <cassert>
#include <iostream>
#include <vector>

BSTNode* makeRecNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

void collectInorder(BSTNode* root, std::vector<int>& result) {
    if (!root) return;
    collectInorder(root->left, result);
    result.push_back(root->value);
    collectInorder(root->right, result);
}

int main() {
    // test: non-adjacent swapped nodes
    BSTNode* invalid1 = makeRecNode(4, makeRecNode(2, makeRecNode(1), makeRecNode(7)), makeRecNode(6, makeRecNode(5), makeRecNode(3)));
    BSTRecoverSwapped().bstRecoverSwapped(invalid1);
    std::vector<int> result1;
    collectInorder(invalid1, result1);
    assert(result1 == (std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    // test: adjacent swapped nodes
    BSTNode* invalid2 = makeRecNode(4, makeRecNode(3, makeRecNode(1), makeRecNode(2)), makeRecNode(6, makeRecNode(5), makeRecNode(7)));
    BSTRecoverSwapped().bstRecoverSwapped(invalid2);
    std::vector<int> result2;
    collectInorder(invalid2, result2);
    assert(result2 == (std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    // test: valid BST unchanged
    BSTNode* valid = makeRecNode(4, makeRecNode(2, makeRecNode(1), makeRecNode(3)), makeRecNode(6, makeRecNode(5), makeRecNode(7)));
    BSTRecoverSwapped().bstRecoverSwapped(valid);
    std::vector<int> result3;
    collectInorder(valid, result3);
    assert(result3 == (std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
