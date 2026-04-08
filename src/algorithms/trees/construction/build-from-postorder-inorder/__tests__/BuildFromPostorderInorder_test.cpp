// g++ -o build_post_in_test BuildFromPostorderInorder_test.cpp && ./build_post_in_test
#include "../sources/BuildFromPostorderInorder.cpp"
#include <cassert>
#include <iostream>
#include <vector>

std::vector<int> inorderBPI(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderBPI(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderBPI(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

std::vector<int> postorderBPI(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = postorderBPI(root->left);
    std::vector<int> right = postorderBPI(root->right);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.insert(result.end(), right.begin(), right.end());
    result.push_back(root->value);
    return result;
}

int main() {
    // test: builds balanced 7-node BST
    TreeNode* root1 = buildFromPostorderInorder(
        {1, 3, 2, 5, 7, 6, 4}, {1, 2, 3, 4, 5, 6, 7});
    assert(root1->value == 4);
    assert(inorderBPI(root1) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: preserves postorder
    TreeNode* root2 = buildFromPostorderInorder(
        {1, 3, 2, 5, 7, 6, 4}, {1, 2, 3, 4, 5, 6, 7});
    assert(postorderBPI(root2) == std::vector<int>({1, 3, 2, 5, 7, 6, 4}));

    // test: returns null for empty
    assert(buildFromPostorderInorder({}, {}) == nullptr);

    // test: single node
    TreeNode* root3 = buildFromPostorderInorder({42}, {42});
    assert(root3->value == 42);
    assert(root3->left == nullptr && root3->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
