// Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class SumRootToLeafNumbers {
public:
    int dfs(TreeNode* node, int runningNumber) {
        if (node == nullptr) return 0; // @step:initialize

        int currentNumber = runningNumber * 10 + node->value; // @step:compute-value

        // Leaf node — this path forms a complete number
        if (node->left == nullptr && node->right == nullptr) {
            // @step:visit
            return currentNumber; // @step:add-to-result
        }

        int leftSum = dfs(node->left, currentNumber);   // @step:traverse-left
        int rightSum = dfs(node->right, currentNumber); // @step:traverse-right
        return leftSum + rightSum;                       // @step:compute-value
    }

    int sumRootToLeafNumbers(TreeNode* root) {
        return dfs(root, 0); // @step:complete
    }
};
