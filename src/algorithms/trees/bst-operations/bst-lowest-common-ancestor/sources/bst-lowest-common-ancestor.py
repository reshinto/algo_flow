# BST Lowest Common Ancestor (Recursive) — use BST property to find split point

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_lowest_common_ancestor(root, node_value_a: int, node_value_b: int):
    if root is None:  # @step:initialize
        return None

    if node_value_a < root.value and node_value_b < root.value:
        # Both values are smaller — LCA must be in the left subtree
        return bst_lowest_common_ancestor(root.left, node_value_a, node_value_b)  # @step:search-node

    if node_value_a > root.value and node_value_b > root.value:
        # Both values are larger — LCA must be in the right subtree
        return bst_lowest_common_ancestor(root.right, node_value_a, node_value_b)  # @step:search-node

    # Values split across root (or one equals root) — current node is the LCA
    return root  # @step:found
