# Zigzag Level-Order Traversal — BFS with alternating left-right direction per level
from collections import deque

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def zigzag_level_order(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    queue = deque([root])  # @step:initialize
    left_to_right = True  # @step:initialize

    while len(queue) > 0:  # @step:enqueue-node
        level_size = len(queue)  # @step:enqueue-node
        current_level = [0] * level_size  # @step:enqueue-node

        for node_index in range(level_size):  # @step:dequeue-node
            node = queue.popleft()  # @step:dequeue-node

            # Insert at front or back based on current direction
            insert_index = node_index if left_to_right else level_size - 1 - node_index  # @step:visit
            current_level[insert_index] = node.value  # @step:visit

            if node.left is not None:  # @step:enqueue-node
                queue.append(node.left)  # @step:enqueue-node
            if node.right is not None:  # @step:enqueue-node
                queue.append(node.right)  # @step:enqueue-node

        result.append(current_level)  # @step:visit
        left_to_right = not left_to_right  # @step:visit

    return result  # @step:complete
