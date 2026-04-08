// Sum of Left Leaves — recursive: sum values of all left leaf nodes

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class SumOfLeftLeaves {
public:
    int dfs(TreeNode* node, bool isLeft) {
        if (node == nullptr) return 0; // @step:initialize

        // Left leaf node contributes its value
        if (node->left == nullptr && node->right == nullptr && isLeft) {
            // @step:visit
            return node->value; // @step:add-to-result
        }

        int leftSum = dfs(node->left, true);   // @step:traverse-left
        int rightSum = dfs(node->right, false); // @step:traverse-right
        return leftSum + rightSum;              // @step:compute-value
    }

    int sumOfLeftLeaves(TreeNode* root) {
        if (root == nullptr) return 0; // @step:initialize

        return dfs(root, false); // @step:complete
    }
};
