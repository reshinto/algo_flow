// g++ -o bst_del_test BSTDelete_test.cpp && ./bst_del_test
#include "../sources/BSTDelete.cpp"
#include <cassert>
#include <iostream>

BSTNode* makeBSTNode(int value, BSTNode* left = nullptr, BSTNode* right = nullptr) {
    BSTNode* node = new BSTNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: deletes leaf node
    BSTNode* tree1 = makeBSTNode(4, makeBSTNode(2, makeBSTNode(1), makeBSTNode(3)), makeBSTNode(6, makeBSTNode(5), makeBSTNode(7)));
    BSTNode* result1 = bstDelete(tree1, 1);
    assert(result1->left->left == nullptr);

    // test: deletes node with one child
    BSTNode* tree2 = makeBSTNode(4, makeBSTNode(2, makeBSTNode(1), nullptr), makeBSTNode(6));
    BSTNode* result2 = bstDelete(tree2, 2);
    assert(result2->left->value == 1);

    // test: deletes node with two children
    BSTNode* tree3 = makeBSTNode(4, makeBSTNode(2, makeBSTNode(1), makeBSTNode(3)), makeBSTNode(6, makeBSTNode(5), makeBSTNode(7)));
    assert(bstDelete(tree3, 4) != nullptr);

    // test: returns null for single node
    assert(bstDelete(makeBSTNode(5), 5) == nullptr);

    // test: unchanged when not found
    BSTNode* tree4 = makeBSTNode(4, makeBSTNode(2), makeBSTNode(6));
    BSTNode* result4 = bstDelete(tree4, 99);
    assert(result4->value == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
