// g++ -o build_pre_in_test BuildFromPreorderInorder_test.cpp && ./build_pre_in_test
#include "sources/BuildFromPreorderInorder.cpp"
#include <cassert>
#include <iostream>
#include <vector>

std::vector<int> inorderBPrI(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderBPrI(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderBPrI(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

std::vector<int> preorderBPrI(TreeNode* root) {
    if (!root) return {};
    std::vector<int> result = {root->value};
    std::vector<int> left = preorderBPrI(root->left);
    std::vector<int> right = preorderBPrI(root->right);
    result.insert(result.end(), left.begin(), left.end());
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

int main() {
    // test: builds balanced 7-node BST
    TreeNode* root1 = buildFromPreorderInorder(
        {4, 2, 1, 3, 6, 5, 7}, {1, 2, 3, 4, 5, 6, 7});
    assert(root1->value == 4);
    assert(inorderBPrI(root1) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: preserves preorder
    TreeNode* root2 = buildFromPreorderInorder(
        {4, 2, 1, 3, 6, 5, 7}, {1, 2, 3, 4, 5, 6, 7});
    assert(preorderBPrI(root2) == std::vector<int>({4, 2, 1, 3, 6, 5, 7}));

    // test: returns null for empty
    assert(buildFromPreorderInorder({}, {}) == nullptr);

    // test: single node
    TreeNode* root3 = buildFromPreorderInorder({42}, {42});
    assert(root3->value == 42);

    // test: right-skewed tree
    TreeNode* root4 = buildFromPreorderInorder({1, 2, 3}, {1, 2, 3});
    assert(root4->value == 1 && root4->left == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
