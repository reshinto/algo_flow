# Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents
from collections import deque

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def cousins_in_binary_tree(root, node_value_a: int, node_value_b: int) -> bool:
    if root is None:  # @step:initialize
        return False

    queue = deque([(root, None, 0)])  # @step:initialize
    parent_a = None  # @step:initialize
    parent_b = None  # @step:initialize
    depth_a = -1  # @step:initialize
    depth_b = -1  # @step:initialize

    while queue:  # @step:visit
        current, parent, current_depth = queue.popleft()  # @step:visit

        if current.value == node_value_a:  # @step:check-balance
            parent_a = parent  # @step:check-balance
            depth_a = current_depth  # @step:update-height

        if current.value == node_value_b:  # @step:check-balance
            parent_b = parent  # @step:check-balance
            depth_b = current_depth  # @step:update-height

        if current.left is not None:  # @step:traverse-left
            queue.append((current.left, current, current_depth + 1))  # @step:traverse-left
        if current.right is not None:  # @step:traverse-right
            queue.append((current.right, current, current_depth + 1))  # @step:traverse-right

    # Cousins: same depth, different parents
    return depth_a == depth_b and parent_a is not parent_b  # @step:complete
