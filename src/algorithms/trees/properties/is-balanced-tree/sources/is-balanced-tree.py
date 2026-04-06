# Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_balanced_tree(root) -> bool:
    # Returns -1 if unbalanced, otherwise returns height of the subtree
    def check_height(node) -> int:
        if node is None:  # @step:initialize
            return 0

        left_height = check_height(node.left)  # @step:traverse-left
        if left_height == -1:  # @step:check-balance
            return -1

        right_height = check_height(node.right)  # @step:traverse-right
        if right_height == -1:  # @step:check-balance
            return -1

        # Unbalanced if height difference exceeds 1
        if abs(left_height - right_height) > 1:  # @step:check-balance
            return -1

        return max(left_height, right_height) + 1  # @step:update-height

    return check_height(root) != -1  # @step:complete
