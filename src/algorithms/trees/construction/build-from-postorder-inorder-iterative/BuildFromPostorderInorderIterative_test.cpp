// g++ -o build_post_in_iter_test BuildFromPostorderInorderIterative_test.cpp && ./build_post_in_iter_test
#include "sources/BuildFromPostorderInorderIterative.cpp"
#include <cassert>
#include <iostream>
#include <vector>

std::vector<int> inorderBPII(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderBPII(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderBPII(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

std::vector<int> postorderBPII(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = postorderBPII(root->left);
    std::vector<int> right = postorderBPII(root->right);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.insert(result.end(), right.begin(), right.end());
    result.push_back(root->value);
    return result;
}

int main() {
    // test: builds balanced 7-node BST
    TreeNode* root1 = buildFromPostorderInorderIterative(
        {1, 3, 2, 5, 7, 6, 4}, {1, 2, 3, 4, 5, 6, 7});
    assert(root1->value == 4);
    assert(inorderBPII(root1) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: preserves postorder
    TreeNode* root2 = buildFromPostorderInorderIterative(
        {1, 3, 2, 5, 7, 6, 4}, {1, 2, 3, 4, 5, 6, 7});
    assert(postorderBPII(root2) == std::vector<int>({1, 3, 2, 5, 7, 6, 4}));

    // test: returns null for empty
    assert(buildFromPostorderInorderIterative({}, {}) == nullptr);

    // test: single node
    TreeNode* root3 = buildFromPostorderInorderIterative({7}, {7});
    assert(root3->value == 7);
    assert(root3->left == nullptr && root3->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
