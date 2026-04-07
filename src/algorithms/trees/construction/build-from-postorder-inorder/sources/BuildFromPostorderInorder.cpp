// Build Binary Tree from Postorder + Inorder Traversal (Recursive)
// Last element of postorder is root; find root in inorder to split left/right subtrees

#include <vector>
#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

TreeNode* buildFromPostorderInorder(std::vector<int> postorder, std::vector<int> inorder) {
    if (postorder.empty() || inorder.empty()) return nullptr; // @step:initialize

    int rootValue = postorder.back(); // @step:select-element
    TreeNode* root = new TreeNode(rootValue); // @step:build-node

    auto it = std::find(inorder.begin(), inorder.end(), rootValue);
    int inorderRootIndex = (int)(it - inorder.begin()); // @step:partition-array

    // Split inorder and postorder into left/right subtrees
    std::vector<int> leftInorder(inorder.begin(), inorder.begin() + inorderRootIndex); // @step:partition-array
    std::vector<int> rightInorder(inorder.begin() + inorderRootIndex + 1, inorder.end()); // @step:partition-array

    std::vector<int> leftPostorder(postorder.begin(), postorder.begin() + leftInorder.size()); // @step:partition-array
    std::vector<int> rightPostorder(postorder.begin() + leftInorder.size(), postorder.end() - 1); // @step:partition-array

    root->left = buildFromPostorderInorder(leftPostorder, leftInorder); // @step:connect-child
    root->right = buildFromPostorderInorder(rightPostorder, rightInorder); // @step:connect-child

    return root; // @step:visit
}
