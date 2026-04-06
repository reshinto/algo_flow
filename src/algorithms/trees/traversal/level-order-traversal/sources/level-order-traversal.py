# Level-Order Traversal — BFS visiting nodes level by level using a queue
from collections import deque

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def level_order_traversal(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    queue = deque([root])  # @step:initialize

    while len(queue) > 0:  # @step:enqueue-node
        level_size = len(queue)  # @step:enqueue-node
        current_level = []  # @step:enqueue-node

        for _ in range(level_size):  # @step:dequeue-node
            node = queue.popleft()  # @step:dequeue-node
            current_level.append(node.value)  # @step:visit

            if node.left is not None:  # @step:enqueue-node
                queue.append(node.left)  # @step:enqueue-node
            if node.right is not None:  # @step:enqueue-node
                queue.append(node.right)  # @step:enqueue-node

        result.append(current_level)  # @step:visit

    return result  # @step:complete
