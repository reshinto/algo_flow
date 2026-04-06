# Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)
from collections import deque, defaultdict

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def diagonal_traversal(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    # Queue of (node, diagonal) pairs
    queue = deque([(root, 0)])  # @step:initialize
    diagonal_map = defaultdict(list)  # @step:initialize
    max_diagonal = 0  # @step:initialize

    while len(queue) > 0:  # @step:enqueue-node
        node, diagonal = queue.popleft()  # @step:dequeue-node

        diagonal_map[diagonal].append(node.value)  # @step:visit

        if diagonal > max_diagonal:  # @step:visit
            max_diagonal = diagonal  # @step:visit

        # Right child stays on same diagonal
        if node.right is not None:  # @step:traverse-right
            queue.append((node.right, diagonal))  # @step:traverse-right
        # Left child moves to next diagonal
        if node.left is not None:  # @step:traverse-left
            queue.append((node.left, diagonal + 1))  # @step:traverse-left

    # Collect diagonals in order
    for diag in range(max_diagonal + 1):  # @step:visit
        result.append(diagonal_map[diag])  # @step:visit

    return result  # @step:complete
