# Sum Root to Leaf Numbers (Iterative) — stack-based number formation

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def sum_root_to_leaf_numbers_iterative(root) -> int:
    if root is None:  # @step:initialize
        return 0

    total_sum = 0  # @step:initialize
    stack = [(root, root.value)]  # @step:initialize

    while stack:  # @step:visit
        current, running_number = stack.pop()  # @step:visit

        # Leaf node — add completed number to total
        if current.left is None and current.right is None:  # @step:check-balance
            total_sum += running_number  # @step:add-to-result

        if current.right is not None:  # @step:traverse-right
            stack.append((current.right, running_number * 10 + current.right.value))  # @step:traverse-right

        if current.left is not None:  # @step:traverse-left
            stack.append((current.left, running_number * 10 + current.left.value))  # @step:traverse-left

    return total_sum  # @step:complete
