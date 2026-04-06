# Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def merge_binary_trees(tree_a, tree_b):
    if tree_a is None:  # @step:initialize
        return tree_b
    if tree_b is None:  # @step:initialize
        return tree_a

    # Both nodes exist — merge by summing values
    tree_a.value = tree_a.value + tree_b.value  # @step:merge-node

    # Recursively merge left and right subtrees
    tree_a.left = merge_binary_trees(tree_a.left, tree_b.left)  # @step:traverse-left
    tree_a.right = merge_binary_trees(tree_a.right, tree_b.right)  # @step:traverse-right

    return tree_a  # @step:visit
