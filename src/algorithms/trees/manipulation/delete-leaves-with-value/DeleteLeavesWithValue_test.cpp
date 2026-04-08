// g++ -o delete_leaves_test DeleteLeavesWithValue_test.cpp && ./delete_leaves_test
#include "sources/DeleteLeavesWithValue.cpp"
#include <cassert>
#include <iostream>

BinaryNode* makeDLNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: single target node returns null
    assert(deleteLeavesWithValue(makeDLNode(1), 1) == nullptr);

    // test: no matching leaf unchanged
    BinaryNode* tree1 = makeDLNode(1, makeDLNode(2), makeDLNode(3));
    BinaryNode* result1 = deleteLeavesWithValue(tree1, 9);
    assert(result1->value == 1 && result1->left != nullptr && result1->right != nullptr);

    // test: deletes leaf with target
    BinaryNode* tree2 = makeDLNode(1, makeDLNode(2), makeDLNode(3));
    BinaryNode* result2 = deleteLeavesWithValue(tree2, 2);
    assert(result2->left == nullptr);
    assert(result2->right->value == 3);

    // test: cascades deletion
    BinaryNode* tree3 = makeDLNode(1, makeDLNode(2), nullptr);
    BinaryNode* result3 = deleteLeavesWithValue(tree3, 2);
    assert(result3->value == 1 && result3->left == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
