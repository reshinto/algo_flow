// g++ -o dll_test TreeToDoublyLinkedList_test.cpp && ./dll_test
#include "TreeToDoublyLinkedList.cpp"
#include <cassert>
#include <iostream>
#include <vector>

DLLNode* makeDLLNode(int value, DLLNode* left = nullptr, DLLNode* right = nullptr) {
    DLLNode* node = new DLLNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    TreeToDoublyLinkedList converter;

    // test: null input
    assert(converter.treeToDoublyLinkedList(nullptr) == nullptr);

    // test: single node (circular)
    DLLNode* single = makeDLLNode(5);
    DLLNode* head1 = converter.treeToDoublyLinkedList(single);
    assert(head1->value == 5);
    assert(head1->right == head1);
    assert(head1->left == head1);

    // test: 3-node BST
    DLLNode* root2 = makeDLLNode(2, makeDLLNode(1), makeDLLNode(3));
    DLLNode* head2 = converter.treeToDoublyLinkedList(root2);
    assert(head2->value == 1);
    assert(head2->right->value == 2);
    assert(head2->right->right->value == 3);
    assert(head2->right->right->right == head2);

    // test: 7-node BST
    DLLNode* root3 = makeDLLNode(4,
        makeDLLNode(2, makeDLLNode(1), makeDLLNode(3)),
        makeDLLNode(6, makeDLLNode(5), makeDLLNode(7))
    );
    DLLNode* head3 = converter.treeToDoublyLinkedList(root3);
    std::vector<int> expectedValues = {1, 2, 3, 4, 5, 6, 7};
    DLLNode* current = head3;
    for (int val : expectedValues) {
        assert(current->value == val);
        current = current->right;
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
