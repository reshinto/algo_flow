# Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def binary_tree_tilt(root) -> int:
    total_tilt = [0]  # @step:initialize

    def subtree_sum(node) -> int:
        if node is None:  # @step:initialize
            return 0

        left_sum = subtree_sum(node.left)  # @step:traverse-left
        right_sum = subtree_sum(node.right)  # @step:traverse-right

        # Tilt at this node is absolute difference of left and right sums
        node_tilt = abs(left_sum - right_sum)  # @step:compute-value
        total_tilt[0] += node_tilt  # @step:add-to-result

        return left_sum + right_sum + node.value  # @step:update-height

    subtree_sum(root)  # @step:initialize
    return total_tilt[0]  # @step:complete
