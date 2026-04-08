// Path Sum — recursive DFS: check if any root-to-leaf path sums to target

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class PathSum {
public:
    bool pathSum(TreeNode* root, int targetSum) {
        if (root == nullptr) return false; // @step:initialize

        // Leaf node — check if remaining sum equals node value
        if (root->left == nullptr && root->right == nullptr) {
            // @step:visit
            return root->value == targetSum; // @step:check-balance
        }

        int remaining = targetSum - root->value; // @step:compute-value

        // Recurse on left and right subtrees
        bool foundLeft = pathSum(root->left, remaining); // @step:traverse-left
        if (foundLeft) return true;                       // @step:check-balance

        bool foundRight = pathSum(root->right, remaining); // @step:traverse-right
        return foundRight;                                   // @step:complete
    }
};
