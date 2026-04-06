# Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def sum_of_left_leaves_iterative(root) -> int:
    if root is None:  # @step:initialize
        return 0

    stack = [(root, False)]  # @step:initialize
    total_sum = 0  # @step:initialize

    while stack:  # @step:visit
        current, is_left = stack.pop()  # @step:visit

        # Accumulate value when we find a left leaf
        if current.left is None and current.right is None and is_left:  # @step:check-balance
            total_sum += current.value  # @step:add-to-result

        if current.right is not None:  # @step:traverse-right
            stack.append((current.right, False))  # @step:traverse-right

        if current.left is not None:  # @step:traverse-left
            stack.append((current.left, True))  # @step:traverse-left

    return total_sum  # @step:complete
