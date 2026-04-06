# Minimum Depth of Binary Tree — BFS returns depth at first leaf encountered
from collections import deque

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def minimum_depth_iterative(root) -> int:
    if root is None:  # @step:initialize
        return 0

    queue = deque([root])  # @step:initialize
    depth = 0  # @step:initialize

    while queue:  # @step:visit
        level_size = len(queue)  # @step:visit
        depth += 1  # @step:update-height

        for _ in range(level_size):  # @step:visit
            current = queue.popleft()  # @step:visit

            # First leaf node encountered is the minimum depth
            if current.left is None and current.right is None:  # @step:visit
                return depth  # @step:complete

            if current.left is not None:  # @step:traverse-left
                queue.append(current.left)  # @step:traverse-left
            if current.right is not None:  # @step:traverse-right
                queue.append(current.right)  # @step:traverse-right

    return depth  # @step:complete
