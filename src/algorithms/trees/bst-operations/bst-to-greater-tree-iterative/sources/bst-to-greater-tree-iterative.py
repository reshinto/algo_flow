# BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_to_greater_tree_iterative(root):
    stack = []  # @step:initialize
    running_sum = 0
    current = root

    while current is not None or len(stack) > 0:
        # Push all right nodes first (reverse in-order visits right subtree first)
        while current is not None:
            stack.append(current)  # @step:search-node
            current = current.right

        # Process the top node
        current = stack.pop()

        # Accumulate sum and update node value
        running_sum += current.value  # @step:found
        current.value = running_sum

        # Move to left subtree
        current = current.left  # @step:search-node

    return root  # @step:complete
