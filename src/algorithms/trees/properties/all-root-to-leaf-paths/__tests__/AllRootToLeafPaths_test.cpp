// g++ -o artlp_test AllRootToLeafPaths_test.cpp && ./artlp_test
#include "../sources/AllRootToLeafPaths.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>

TreeNode* makeARTLPNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

int main() {
    // test: returns 4 paths for 7-node BST
    TreeNode* tree1 = makeARTLPNode(4,
        makeARTLPNode(2, makeARTLPNode(1), makeARTLPNode(3)),
        makeARTLPNode(6, makeARTLPNode(5), makeARTLPNode(7)));
    std::vector<std::string> paths1 = allRootToLeafPaths(tree1);
    assert(paths1.size() == 4);
    assert(std::find(paths1.begin(), paths1.end(), "4->2->1") != paths1.end());
    assert(std::find(paths1.begin(), paths1.end(), "4->2->3") != paths1.end());

    // test: empty for null root
    assert(allRootToLeafPaths(nullptr).empty());

    // test: single node
    std::vector<std::string> paths2 = allRootToLeafPaths(makeARTLPNode(5));
    assert(paths2 == std::vector<std::string>({"5"}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
