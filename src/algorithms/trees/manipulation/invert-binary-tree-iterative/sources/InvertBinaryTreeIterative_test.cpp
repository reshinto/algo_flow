// g++ -o invert_iter_test InvertBinaryTreeIterative_test.cpp && ./invert_iter_test
#include "InvertBinaryTreeIterative.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <queue>

BinaryNode* makeIBTINode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

std::vector<int> levelOrderIBTI(BinaryNode* root) {
    if (!root) return {};
    std::vector<int> result;
    std::queue<BinaryNode*> q;
    q.push(root);
    while (!q.empty()) {
        BinaryNode* node = q.front(); q.pop();
        result.push_back(node->value);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return result;
}

int main() {
    // test: null returns null
    assert(invertBinaryTreeIterative(nullptr) == nullptr);

    // test: single node
    BinaryNode* single = makeIBTINode(1);
    BinaryNode* result1 = invertBinaryTreeIterative(single);
    assert(result1->value == 1 && result1->left == nullptr && result1->right == nullptr);

    // test: inverts 7-node BST
    BinaryNode* tree = makeIBTINode(4,
        makeIBTINode(2, makeIBTINode(1), makeIBTINode(3)),
        makeIBTINode(6, makeIBTINode(5), makeIBTINode(7)));
    BinaryNode* result2 = invertBinaryTreeIterative(tree);
    assert(levelOrderIBTI(result2) == std::vector<int>({4, 6, 2, 7, 5, 3, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
