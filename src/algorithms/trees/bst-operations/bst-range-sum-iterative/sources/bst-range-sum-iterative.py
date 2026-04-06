# BST Range Sum (Iterative) — stack-based DFS summing nodes in [low_value, high_value]

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_range_sum_iterative(root, low_value: int, high_value: int) -> int:
    if root is None:  # @step:initialize
        return 0

    stack = [root]
    total_sum = 0

    while len(stack) > 0:
        node = stack.pop()

        if low_value <= node.value <= high_value:
            # Node is in range — add to sum
            total_sum += node.value  # @step:found

        if node.left is not None and node.value > low_value:
            # Left child exists and may have values in range
            stack.append(node.left)  # @step:search-node

        if node.right is not None and node.value < high_value:
            # Right child exists and may have values in range
            stack.append(node.right)  # @step:search-node

    return total_sum  # @step:complete
