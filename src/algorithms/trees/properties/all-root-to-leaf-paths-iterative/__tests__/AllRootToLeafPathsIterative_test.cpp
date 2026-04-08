// g++ -o artlp_iter_test AllRootToLeafPathsIterative_test.cpp && ./artlp_iter_test
#include "../sources/AllRootToLeafPathsIterative.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>

TreeNode* makeARTLPINode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: returns 4 paths for 7-node BST
    TreeNode* tree1 = makeARTLPINode(4,
        makeARTLPINode(2, makeARTLPINode(1), makeARTLPINode(3)),
        makeARTLPINode(6, makeARTLPINode(5), makeARTLPINode(7)));
    std::vector<std::string> paths1 = allRootToLeafPathsIterative(tree1);
    assert(paths1.size() == 4);
    assert(std::find(paths1.begin(), paths1.end(), "4->2->1") != paths1.end());

    // test: empty for null root
    assert(allRootToLeafPathsIterative(nullptr).empty());

    // test: single node
    std::vector<std::string> paths2 = allRootToLeafPathsIterative(makeARTLPINode(5));
    assert(paths2 == std::vector<std::string>({"5"}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
