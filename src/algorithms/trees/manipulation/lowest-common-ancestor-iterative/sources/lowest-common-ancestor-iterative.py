# Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

from collections import deque

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def lowest_common_ancestor_iterative(root, node_value_a: int, node_value_b: int):
    if root is None:  # @step:initialize
        return None

    # Build parent map using BFS
    parent_map = {root: None}  # @step:initialize
    queue = deque([root])  # @step:initialize
    node_a = None
    node_b = None

    while queue and (node_a is None or node_b is None):  # @step:visit
        current = queue.popleft()  # @step:dequeue

        if current.value == node_value_a:  # @step:compare
            node_a = current
        if current.value == node_value_b:  # @step:compare
            node_b = current

        if current.left is not None:  # @step:enqueue
            parent_map[current.left] = current  # @step:enqueue
            queue.append(current.left)  # @step:enqueue
        if current.right is not None:  # @step:enqueue
            parent_map[current.right] = current  # @step:enqueue
            queue.append(current.right)  # @step:enqueue

    if node_a is None or node_b is None:
        return None

    # Trace ancestors of node_a into a set
    ancestors_a = set()  # @step:visit
    trace = node_a
    while trace is not None:  # @step:visit
        ancestors_a.add(trace)  # @step:visit
        trace = parent_map.get(trace)  # @step:visit

    # Walk ancestors of node_b until we hit the first shared ancestor
    trace = node_b
    while trace is not None:  # @step:visit
        if trace in ancestors_a:  # @step:compare
            return trace
        trace = parent_map.get(trace)  # @step:visit

    return None  # @step:complete
