// g++ -o flatten_iter_test FlattenToLinkedListIterative_test.cpp && ./flatten_iter_test
#include "sources/FlattenToLinkedListIterative.cpp"
#include <cassert>
#include <iostream>
#include <vector>

BinaryNode* makeFLINode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

std::vector<int> rightChainFLI(BinaryNode* root) {
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
    BinaryNode* single = makeFLINode(1);
    flattenToLinkedListIterative(single);
    assert(single->left == nullptr && single->right == nullptr);

    // test: two-node with left child
    BinaryNode* tree1 = makeFLINode(1, makeFLINode(2), nullptr);
    flattenToLinkedListIterative(tree1);
    assert(rightChainFLI(tree1) == std::vector<int>({1, 2}));

    // test: flattens 7-node BST
    BinaryNode* tree2 = makeFLINode(4,
        makeFLINode(2, makeFLINode(1), makeFLINode(3)),
        makeFLINode(6, makeFLINode(5), makeFLINode(7)));
    flattenToLinkedListIterative(tree2);
    assert(rightChainFLI(tree2) == std::vector<int>({4, 2, 1, 3, 6, 5, 7}));

    // test: all left pointers null
    BinaryNode* node = tree2;
    while (node) {
        assert(node->left == nullptr);
        node = node->right;
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
