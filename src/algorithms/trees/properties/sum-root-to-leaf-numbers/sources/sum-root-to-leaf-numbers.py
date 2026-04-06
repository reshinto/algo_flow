# Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def sum_root_to_leaf_numbers(root) -> int:
    def dfs(node, running_number: int) -> int:
        if node is None:  # @step:initialize
            return 0

        current_number = running_number * 10 + node.value  # @step:compute-value

        # Leaf node — this path forms a complete number
        if node.left is None and node.right is None:  # @step:visit
            return current_number  # @step:add-to-result

        left_sum = dfs(node.left, current_number)  # @step:traverse-left
        right_sum = dfs(node.right, current_number)  # @step:traverse-right
        return left_sum + right_sum  # @step:compute-value

    return dfs(root, 0)  # @step:complete
