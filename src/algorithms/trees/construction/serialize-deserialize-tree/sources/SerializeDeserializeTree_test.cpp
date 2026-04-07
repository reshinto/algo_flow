// g++ -o serialize_tree_test SerializeDeserializeTree_test.cpp && ./serialize_tree_test
#include "SerializeDeserializeTree.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

TreeNode* makeSDTNode(int value, TreeNode* left = nullptr, TreeNode* right = nullptr) {
    TreeNode* node = new TreeNode(value);
    node->left = left;
    node->right = right;
    return node;
}

std::vector<int> inorderSDT(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderSDT(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderSDT(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

int main() {
    // test: serializes null as "null"
    assert(serializeTree(nullptr) == "null");

    // test: deserializes null string
    assert(deserializeTree("null") == nullptr);

    // test: round-trips a balanced 7-node BST
    TreeNode* original = makeSDTNode(4,
        makeSDTNode(2, makeSDTNode(1), makeSDTNode(3)),
        makeSDTNode(6, makeSDTNode(5), makeSDTNode(7)));
    std::string serialized = serializeTree(original);
    TreeNode* reconstructed = deserializeTree(serialized);
    assert(reconstructed->value == 4);
    assert(inorderSDT(reconstructed) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: round-trips a single node
    TreeNode* single = makeSDTNode(99);
    std::string singleStr = serializeTree(single);
    TreeNode* singleBack = deserializeTree(singleStr);
    assert(singleBack->value == 99);
    assert(singleBack->left == nullptr && singleBack->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
