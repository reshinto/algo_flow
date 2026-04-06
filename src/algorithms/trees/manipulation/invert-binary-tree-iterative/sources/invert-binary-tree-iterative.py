# Invert Binary Tree Iterative — BFS with queue: swap children level by level
from collections import deque

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def invert_binary_tree_iterative(root) -> 'BinaryNode | None':
    if root is None:  # @step:initialize
        return None

    queue = deque([root])  # @step:initialize

    while queue:  # @step:initialize
        current = queue.popleft()  # @step:dequeue

        # Swap left and right children
        current.left, current.right = current.right, current.left  # @step:swap-children

        # Enqueue non-null children for processing
        if current.left is not None:  # @step:enqueue
            queue.append(current.left)
        if current.right is not None:  # @step:enqueue
            queue.append(current.right)

    return root  # @step:complete
