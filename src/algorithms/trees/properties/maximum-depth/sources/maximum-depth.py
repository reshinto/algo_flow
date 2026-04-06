# Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def maximum_depth(root) -> int:
    if root is None:  # @step:initialize
        return 0

    # Recursively compute depth of left and right subtrees
    left_depth = maximum_depth(root.left)  # @step:traverse-left
    right_depth = maximum_depth(root.right)  # @step:traverse-right

    # Return the larger subtree depth plus 1 for the current node
    return max(left_depth, right_depth) + 1  # @step:update-height
