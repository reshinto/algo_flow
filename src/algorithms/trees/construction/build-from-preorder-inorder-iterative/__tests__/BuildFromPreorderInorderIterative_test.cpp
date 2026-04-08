// g++ -o build_pre_in_iter_test BuildFromPreorderInorderIterative_test.cpp && ./build_pre_in_iter_test
#include "../sources/BuildFromPreorderInorderIterative.cpp"
#include <cassert>
#include <iostream>
#include <vector>

std::vector<int> inorderBPrII(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderBPrII(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderBPrII(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

std::vector<int> preorderBPrII(TreeNode* root) {
    if (!root) return {};
    std::vector<int> result = {root->value};
    std::vector<int> left = preorderBPrII(root->left);
    std::vector<int> right = preorderBPrII(root->right);
    result.insert(result.end(), left.begin(), left.end());
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

int main() {
    // test: builds balanced 7-node BST
    TreeNode* root1 = buildFromPreorderInorderIterative(
        {4, 2, 1, 3, 6, 5, 7}, {1, 2, 3, 4, 5, 6, 7});
    assert(root1->value == 4);
    assert(inorderBPrII(root1) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: preserves preorder
    TreeNode* root2 = buildFromPreorderInorderIterative(
        {4, 2, 1, 3, 6, 5, 7}, {1, 2, 3, 4, 5, 6, 7});
    assert(preorderBPrII(root2) == std::vector<int>({4, 2, 1, 3, 6, 5, 7}));

    // test: returns null for empty
    assert(buildFromPreorderInorderIterative({}, {}) == nullptr);

    // test: single node
    TreeNode* root3 = buildFromPreorderInorderIterative({42}, {42});
    assert(root3->value == 42);
    assert(root3->left == nullptr && root3->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
