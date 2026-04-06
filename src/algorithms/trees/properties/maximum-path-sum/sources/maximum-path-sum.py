# Maximum Path Sum — recursive: at each node compute max path through it, track global max

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def maximum_path_sum(root) -> int:
    global_max = [root.value if root is not None else float("-inf")]  # @step:initialize

    def max_gain(node) -> int:
        if node is None:  # @step:initialize
            return 0

        # Only include subtree if it contributes positively
        left_gain = max(max_gain(node.left), 0)  # @step:traverse-left
        right_gain = max(max_gain(node.right), 0)  # @step:traverse-right

        # Path through this node
        path_through_node = node.value + left_gain + right_gain  # @step:compute-value
        global_max[0] = max(global_max[0], path_through_node)  # @step:update-height

        # Return max gain if we continue from this node to parent
        return node.value + max(left_gain, right_gain)  # @step:add-to-result

    max_gain(root)  # @step:initialize
    return global_max[0]  # @step:complete
