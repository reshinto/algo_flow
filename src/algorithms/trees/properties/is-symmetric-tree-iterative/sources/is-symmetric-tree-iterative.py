# Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare
from collections import deque

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_symmetric_tree_iterative(root) -> bool:
    if root is None:  # @step:initialize
        return True

    queue = deque([(root.left, root.right)])  # @step:initialize

    while queue:  # @step:visit
        left_node, right_node = queue.popleft()  # @step:visit

        if left_node is None and right_node is None:  # @step:check-balance
            continue
        if left_node is None or right_node is None:  # @step:check-balance
            return False
        if left_node.value != right_node.value:  # @step:check-balance
            return False

        # Enqueue outer pair and inner pair
        queue.append((left_node.left, right_node.right))  # @step:traverse-left
        queue.append((left_node.right, right_node.left))  # @step:traverse-right

    return True  # @step:complete
