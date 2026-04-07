// Maximum Path Sum — recursive: at each node compute max path through it, track global max

#include <algorithm>
#include <climits>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class MaximumPathSum {
public:
    int globalMax;

    int maxGain(TreeNode* node) {
        if (node == nullptr) return 0; // @step:initialize

        // Only include subtree if it contributes positively
        int leftGain = std::max(maxGain(node->left), 0);   // @step:traverse-left
        int rightGain = std::max(maxGain(node->right), 0); // @step:traverse-right

        // Path through this node: left branch + node value + right branch
        int pathThroughNode = node->value + leftGain + rightGain; // @step:compute-value
        globalMax = std::max(globalMax, pathThroughNode);          // @step:update-height

        // Return max gain if we continue from this node to parent
        return node->value + std::max(leftGain, rightGain); // @step:add-to-result
    }

    int maximumPathSum(TreeNode* root) {
        globalMax = (root != nullptr) ? root->value : INT_MIN; // @step:initialize
        maxGain(root); // @step:initialize
        return globalMax; // @step:complete
    }
};
