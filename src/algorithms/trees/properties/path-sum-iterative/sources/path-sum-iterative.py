# Path Sum (Iterative) — stack-based DFS with running sum tracking

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def path_sum_iterative(root, target_sum: int) -> bool:
    if root is None:  # @step:initialize
        return False

    stack = [(root, root.value)]  # @step:initialize

    while stack:  # @step:visit
        current, running_sum = stack.pop()  # @step:visit

        # Leaf node — check if path sum matches target
        if current.left is None and current.right is None:  # @step:check-balance
            if running_sum == target_sum:  # @step:complete
                return True

        if current.right is not None:  # @step:traverse-right
            stack.append((current.right, running_sum + current.right.value))  # @step:traverse-right

        if current.left is not None:  # @step:traverse-left
            stack.append((current.left, running_sum + current.left.value))  # @step:traverse-left

    return False  # @step:complete
