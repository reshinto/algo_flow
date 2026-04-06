# Sum of Left Leaves — recursive: sum values of all left leaf nodes

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def sum_of_left_leaves(root) -> int:
    if root is None:  # @step:initialize
        return 0

    def dfs(node, is_left: bool) -> int:
        if node is None:  # @step:initialize
            return 0

        # Left leaf node contributes its value
        if node.left is None and node.right is None and is_left:  # @step:visit
            return node.value  # @step:add-to-result

        left_sum = dfs(node.left, True)  # @step:traverse-left
        right_sum = dfs(node.right, False)  # @step:traverse-right
        return left_sum + right_sum  # @step:compute-value

    return dfs(root, False)  # @step:complete
