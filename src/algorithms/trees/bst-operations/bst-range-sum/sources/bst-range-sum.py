# BST Range Sum (Recursive) — sum all nodes with values in [low_value, high_value]

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_range_sum(root, low_value: int, high_value: int) -> int:
    if root is None:  # @step:initialize
        return 0

    total = 0

    if low_value <= root.value <= high_value:
        # Current node is in range — add its value
        total += root.value  # @step:found

    if root.value > low_value:
        # Left subtree may contain values in range
        total += bst_range_sum(root.left, low_value, high_value)  # @step:search-node

    if root.value < high_value:
        # Right subtree may contain values in range
        total += bst_range_sum(root.right, low_value, high_value)  # @step:search-node

    return total  # @step:complete
