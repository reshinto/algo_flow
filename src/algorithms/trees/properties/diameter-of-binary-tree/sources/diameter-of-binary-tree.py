# Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def diameter_of_binary_tree(root) -> int:
    max_diameter = [0]  # @step:initialize

    def compute_height(node) -> int:
        if node is None:  # @step:initialize
            return 0

        left_height = compute_height(node.left)  # @step:traverse-left
        right_height = compute_height(node.right)  # @step:traverse-right

        # Update global max diameter
        max_diameter[0] = max(max_diameter[0], left_height + right_height)  # @step:update-height

        return max(left_height, right_height) + 1  # @step:update-height

    compute_height(root)  # @step:initialize
    return max_diameter[0]  # @step:complete
