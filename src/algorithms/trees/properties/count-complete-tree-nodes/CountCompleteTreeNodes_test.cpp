// g++ -o cctn_test CountCompleteTreeNodes_test.cpp && ./cctn_test
#include "sources/CountCompleteTreeNodes.cpp"
#include <cassert>
#include <iostream>

TreeNode* makeCCTNNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: 7-node perfect tree
    TreeNode* tree1 = makeCCTNNode(4,
        makeCCTNNode(2, makeCCTNNode(1), makeCCTNNode(3)),
        makeCCTNNode(6, makeCCTNNode(5), makeCCTNNode(7)));
    assert(countCompleteTreeNodes(tree1) == 7);

    // test: null root returns 0
    assert(countCompleteTreeNodes(nullptr) == 0);

    // test: single node
    assert(countCompleteTreeNodes(makeCCTNNode(1)) == 1);

    // test: 3-node perfect tree
    assert(countCompleteTreeNodes(makeCCTNNode(1, makeCCTNNode(2), makeCCTNNode(3))) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
