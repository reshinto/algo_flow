// Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class IsSymmetricTree {
public:
    bool isMirror(TreeNode* leftNode, TreeNode* rightNode) {
        if (leftNode == nullptr && rightNode == nullptr) return true;  // @step:check-balance
        if (leftNode == nullptr || rightNode == nullptr) return false; // @step:check-balance
        if (leftNode->value != rightNode->value) return false;         // @step:check-balance

        // Outer pair and inner pair must both be mirrors
        bool outerMatch = isMirror(leftNode->left, rightNode->right); // @step:traverse-left
        bool innerMatch = isMirror(leftNode->right, rightNode->left); // @step:traverse-right
        return outerMatch && innerMatch;                               // @step:check-balance
    }

    bool isSymmetricTree(TreeNode* root) {
        if (root == nullptr) return true; // @step:initialize

        return isMirror(root->left, root->right); // @step:complete
    }
};
