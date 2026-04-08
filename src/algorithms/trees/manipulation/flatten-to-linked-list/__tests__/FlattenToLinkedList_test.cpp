// g++ -o flatten_test FlattenToLinkedList_test.cpp && ./flatten_test
#include "../sources/FlattenToLinkedList.cpp"
#include <cassert>
#include <iostream>
#include <vector>

BinaryNode* makeFLNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

std::vector<int> rightChainFL(BinaryNode* root) {
    std::vector<int> result;
    BinaryNode* current = root;
    while (current) {
        result.push_back(current->value);
        current = current->right;
    }
    return result;
}

int main() {
    // test: single node unchanged
    BinaryNode* single = makeFLNode(1);
    flattenToLinkedList(single);
    assert(single->left == nullptr && single->right == nullptr);

    // test: two-node with left child
    BinaryNode* tree1 = makeFLNode(1, makeFLNode(2), nullptr);
    flattenToLinkedList(tree1);
    assert(rightChainFL(tree1) == std::vector<int>({1, 2}));

    // test: flattens 7-node BST
    BinaryNode* tree2 = makeFLNode(4,
        makeFLNode(2, makeFLNode(1), makeFLNode(3)),
        makeFLNode(6, makeFLNode(5), makeFLNode(7)));
    flattenToLinkedList(tree2);
    assert(rightChainFL(tree2) == std::vector<int>({4, 2, 1, 3, 6, 5, 7}));

    // test: all left pointers null
    BinaryNode* node = tree2;
    while (node) {
        assert(node->left == nullptr);
        node = node->right;
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
