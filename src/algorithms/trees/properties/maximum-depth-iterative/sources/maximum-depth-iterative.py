# Maximum Depth of Binary Tree — BFS level counting with a queue
from collections import deque

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def maximum_depth_iterative(root) -> int:
    if root is None:  # @step:initialize
        return 0

    queue = deque([root])  # @step:initialize
    depth = 0  # @step:initialize

    while queue:  # @step:visit
        level_size = len(queue)  # @step:visit
        depth += 1  # @step:update-height

        # Process all nodes at the current level
        for _ in range(level_size):  # @step:visit
            current = queue.popleft()  # @step:visit
            if current.left is not None:  # @step:traverse-left
                queue.append(current.left)  # @step:traverse-left
            if current.right is not None:  # @step:traverse-right
                queue.append(current.right)  # @step:traverse-right

    return depth  # @step:complete
