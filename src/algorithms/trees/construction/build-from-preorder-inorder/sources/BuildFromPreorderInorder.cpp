// Build Binary Tree from Preorder + Inorder Traversal (Recursive)
// First element of preorder is root; find root in inorder to split left/right subtrees

#include <vector>
#include <algorithm>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

TreeNode* buildFromPreorderInorder(std::vector<int> preorder, std::vector<int> inorder) {
    if (preorder.empty() || inorder.empty()) return nullptr; // @step:initialize

    int rootValue = preorder[0]; // @step:select-element
    TreeNode* root = new TreeNode(rootValue); // @step:build-node

    auto it = std::find(inorder.begin(), inorder.end(), rootValue);
    int inorderRootIndex = (int)(it - inorder.begin()); // @step:partition-array

    // Left subtree uses inorder[0..inorderRootIndex-1] and corresponding preorder slice
    std::vector<int> leftInorder(inorder.begin(), inorder.begin() + inorderRootIndex); // @step:partition-array
    std::vector<int> leftPreorder(preorder.begin() + 1, preorder.begin() + 1 + leftInorder.size()); // @step:partition-array

    // Right subtree uses inorder[inorderRootIndex+1..] and the remaining preorder elements
    std::vector<int> rightInorder(inorder.begin() + inorderRootIndex + 1, inorder.end()); // @step:partition-array
    std::vector<int> rightPreorder(preorder.begin() + 1 + leftInorder.size(), preorder.end()); // @step:partition-array

    root->left = buildFromPreorderInorder(leftPreorder, leftInorder); // @step:connect-child
    root->right = buildFromPreorderInorder(rightPreorder, rightInorder); // @step:connect-child

    return root; // @step:visit
}
