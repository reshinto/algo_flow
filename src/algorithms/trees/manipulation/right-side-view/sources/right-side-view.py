# Right Side View — BFS: collect the last node of each level

from collections import deque

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def right_side_view(root) -> list:
    if root is None:  # @step:initialize
        return []

    result = []  # @step:initialize
    queue = deque([root])  # @step:initialize

    while queue:  # @step:visit
        level_size = len(queue)  # @step:visit

        for position in range(level_size):  # @step:visit
            node = queue.popleft()  # @step:dequeue

            # The last node of this level is visible from the right side
            if position == level_size - 1:  # @step:collect-element
                result.append(node.value)  # @step:collect-element

            if node.left is not None:
                queue.append(node.left)  # @step:enqueue
            if node.right is not None:
                queue.append(node.right)  # @step:enqueue

    return result  # @step:complete
