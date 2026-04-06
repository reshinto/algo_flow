# Minimum Depth of Binary Tree — recursive DFS to nearest leaf

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def minimum_depth(root) -> int:
    if root is None:  # @step:initialize
        return 0

    # If only right child exists, recurse right
    if root.left is None and root.right is not None:  # @step:visit
        return minimum_depth(root.right) + 1  # @step:traverse-right

    # If only left child exists, recurse left
    if root.right is None and root.left is not None:  # @step:visit
        return minimum_depth(root.left) + 1  # @step:traverse-left

    # If leaf node, depth is 1
    if root.left is None and root.right is None:  # @step:visit
        return 1  # @step:update-height

    # Both children exist — take minimum
    left_depth = minimum_depth(root.left)  # @step:traverse-left
    right_depth = minimum_depth(root.right)  # @step:traverse-right
    return min(left_depth, right_depth) + 1  # @step:update-height
