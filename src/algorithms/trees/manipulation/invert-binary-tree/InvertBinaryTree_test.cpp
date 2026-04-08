// g++ -o invert_test InvertBinaryTree_test.cpp && ./invert_test
#include "sources/InvertBinaryTree.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <queue>

BinaryNode* makeIBTNode(int value, BinaryNode* left = nullptr, BinaryNode* right = nullptr) {
    BinaryNode* node = new BinaryNode(value);
    node->left = left;
    node->right = right;
    return node;
}

std::vector<int> levelOrderIBT(BinaryNode* root) {
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
    assert(invertBinaryTree(nullptr) == nullptr);

    // test: single node
    BinaryNode* single = makeIBTNode(1);
    BinaryNode* result1 = invertBinaryTree(single);
    assert(result1->value == 1 && result1->left == nullptr && result1->right == nullptr);

    // test: inverts 7-node BST
    BinaryNode* tree = makeIBTNode(4,
        makeIBTNode(2, makeIBTNode(1), makeIBTNode(3)),
        makeIBTNode(6, makeIBTNode(5), makeIBTNode(7)));
    BinaryNode* result2 = invertBinaryTree(tree);
    assert(levelOrderIBT(result2) == std::vector<int>({4, 6, 2, 7, 5, 3, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
