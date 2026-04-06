# Merge Binary Trees Iterative — stack-based pair comparison and merge

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def merge_binary_trees_iterative(tree_a, tree_b):
    if tree_a is None:  # @step:initialize
        return tree_b

    stack = []  # @step:initialize

    if tree_b is not None:  # @step:initialize
        stack.append((tree_a, tree_b))  # @step:initialize

    while stack:  # @step:visit
        node_a, node_b = stack.pop()  # @step:visit

        # Merge values
        node_a.value = node_a.value + node_b.value  # @step:merge-node

        # Handle right children
        if node_a.right is None:  # @step:connect-child
            node_a.right = node_b.right  # @step:connect-child
        elif node_b.right is not None:  # @step:connect-child
            stack.append((node_a.right, node_b.right))  # @step:enqueue

        # Handle left children
        if node_a.left is None:  # @step:connect-child
            node_a.left = node_b.left  # @step:connect-child
        elif node_b.left is not None:  # @step:connect-child
            stack.append((node_a.left, node_b.left))  # @step:enqueue

    return tree_a  # @step:complete
