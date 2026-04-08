// g++ -o build_level_test BuildFromLevelOrder_test.cpp && ./build_level_test
#include "../sources/BuildFromLevelOrder.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <queue>

std::vector<int> inorderBFL(TreeNode* root) {
    if (!root) return {};
    std::vector<int> left = inorderBFL(root->left);
    std::vector<int> result;
    result.insert(result.end(), left.begin(), left.end());
    result.push_back(root->value);
    std::vector<int> right = inorderBFL(root->right);
    result.insert(result.end(), right.begin(), right.end());
    return result;
}

std::vector<int> levelOrderBFL(TreeNode* root) {
    if (!root) return {};
    std::vector<int> result;
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        result.push_back(node->value);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return result;
}

int main() {
    // test: builds balanced 7-node BST
    TreeNode* root1 = buildFromLevelOrder({4, 2, 6, 1, 3, 5, 7});
    assert(root1->value == 4);
    assert(inorderBFL(root1) == std::vector<int>({1, 2, 3, 4, 5, 6, 7}));

    // test: restores level-order
    TreeNode* root2 = buildFromLevelOrder({4, 2, 6, 1, 3, 5, 7});
    assert(levelOrderBFL(root2) == std::vector<int>({4, 2, 6, 1, 3, 5, 7}));

    // test: returns null for empty
    assert(buildFromLevelOrder({}) == nullptr);

    // test: single node
    TreeNode* root3 = buildFromLevelOrder({42});
    assert(root3->value == 42);
    assert(root3->left == nullptr);
    assert(root3->right == nullptr);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
