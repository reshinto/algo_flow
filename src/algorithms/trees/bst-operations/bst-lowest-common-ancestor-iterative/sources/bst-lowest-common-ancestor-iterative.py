# BST Lowest Common Ancestor (Iterative) — while loop split point search

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_lowest_common_ancestor_iterative(root, node_value_a: int, node_value_b: int):
    current = root  # @step:initialize

    while current is not None:
        if node_value_a < current.value and node_value_b < current.value:
            # Both values are smaller — move to left subtree
            current = current.left  # @step:search-node
        elif node_value_a > current.value and node_value_b > current.value:
            # Both values are larger — move to right subtree
            current = current.right  # @step:search-node
        else:
            # Values split across current (or one equals current) — found LCA
            return current  # @step:found

    return None  # @step:complete
