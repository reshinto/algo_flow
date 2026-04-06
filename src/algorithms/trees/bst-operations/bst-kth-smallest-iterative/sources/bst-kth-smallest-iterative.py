# BST Kth Smallest (Iterative) — stack-based in-order with counter

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_kth_smallest_iterative(root, kth_position: int) -> int:
    stack = []  # @step:initialize
    counter = 0
    current = root

    while current is not None or len(stack) > 0:
        # Push all left nodes — they have smaller values
        while current is not None:
            stack.append(current)  # @step:search-node
            current = current.left

        # Process next in-order node
        current = stack.pop()
        counter += 1

        if counter == kth_position:
            return current.value  # @step:found

        # Move to right subtree
        current = current.right  # @step:search-node

    return -1  # @step:complete — k exceeds number of nodes
