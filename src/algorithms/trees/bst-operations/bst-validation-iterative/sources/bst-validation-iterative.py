# BST Validation (Iterative) — stack-based in-order traversal checking ascending order

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_validation_iterative(root) -> bool:
    stack = []  # @step:initialize
    previous_value = float("-inf")
    current = root

    while current is not None or len(stack) > 0:
        # Push all left nodes onto the stack
        while current is not None:
            stack.append(current)  # @step:search-node
            current = current.left

        # Process the top of the stack
        current = stack.pop()

        # In-order value must be strictly greater than the previous one
        if current.value <= previous_value:
            return False  # @step:found — BST violation detected

        previous_value = current.value  # @step:search-node
        current = current.right

    return True  # @step:complete — all values in ascending order
