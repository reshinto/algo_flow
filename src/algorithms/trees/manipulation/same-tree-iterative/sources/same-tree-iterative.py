# Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

from collections import deque

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def same_tree_iterative(tree_a, tree_b) -> bool:
    queue = deque([(tree_a, tree_b)])  # @step:initialize

    while queue:  # @step:visit
        node_a, node_b = queue.popleft()  # @step:dequeue

        if node_a is None and node_b is None:  # @step:compare
            continue
        if node_a is None or node_b is None:  # @step:compare
            return False
        if node_a.value != node_b.value:  # @step:compare
            return False

        queue.append((node_a.left, node_b.left))  # @step:enqueue
        queue.append((node_a.right, node_b.right))  # @step:enqueue

    return True  # @step:complete
