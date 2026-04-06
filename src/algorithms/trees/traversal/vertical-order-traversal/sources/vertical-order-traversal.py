# Vertical-Order Traversal — BFS grouping nodes by vertical column index
from collections import deque, defaultdict

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def vertical_order_traversal(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    # Queue stores (node, column) pairs
    queue = deque([(root, 0)])  # @step:initialize
    column_map = defaultdict(list)  # @step:initialize
    min_column = 0  # @step:initialize
    max_column = 0  # @step:initialize

    while len(queue) > 0:  # @step:enqueue-node
        node, column = queue.popleft()  # @step:dequeue-node

        # Record this node's value in its column
        column_map[column].append(node.value)  # @step:visit

        if column < min_column:  # @step:visit
            min_column = column  # @step:visit
        if column > max_column:  # @step:visit
            max_column = column  # @step:visit

        if node.left is not None:  # @step:enqueue-node
            queue.append((node.left, column - 1))  # @step:enqueue-node
        if node.right is not None:  # @step:enqueue-node
            queue.append((node.right, column + 1))  # @step:enqueue-node

    # Collect columns in order from leftmost to rightmost
    for col in range(min_column, max_column + 1):  # @step:visit
        result.append(column_map[col])  # @step:visit

    return result  # @step:complete
