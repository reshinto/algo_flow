// g++ -o cousins_test CousinsInBinaryTree_test.cpp && ./cousins_test
#include "sources/CousinsInBinaryTree.cpp"
#include <cassert>
#include <iostream>

TreeNode* makeCIBTNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

TreeNode* buildCIBT7NodeTree() {
    return makeCIBTNode(4,
        makeCIBTNode(2, makeCIBTNode(1), makeCIBTNode(3)),
        makeCIBTNode(6, makeCIBTNode(5), makeCIBTNode(7)));
}

int main() {
    // test: cousins 1 and 5
    assert(cousinsInBinaryTree(buildCIBT7NodeTree(), 1, 5) == true);

    // test: siblings not cousins
    assert(cousinsInBinaryTree(buildCIBT7NodeTree(), 1, 3) == false);

    // test: different depths not cousins
    assert(cousinsInBinaryTree(buildCIBT7NodeTree(), 2, 1) == false);

    // test: null root returns false
    assert(cousinsInBinaryTree(nullptr, 1, 2) == false);

    // test: cousins 3 and 7
    assert(cousinsInBinaryTree(buildCIBT7NodeTree(), 3, 7) == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
