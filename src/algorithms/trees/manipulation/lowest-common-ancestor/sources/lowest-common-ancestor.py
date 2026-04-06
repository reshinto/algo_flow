# Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def lowest_common_ancestor(root, node_value_a: int, node_value_b: int):
    if root is None:  # @step:initialize
        return None
    if root.value == node_value_a or root.value == node_value_b:  # @step:compare
        return root

    # Search left and right subtrees
    left_result = lowest_common_ancestor(root.left, node_value_a, node_value_b)  # @step:traverse-left
    right_result = lowest_common_ancestor(root.right, node_value_a, node_value_b)  # @step:traverse-right

    # If both sides found a target node, current node is the LCA
    if left_result is not None and right_result is not None:  # @step:visit
        return root

    # Otherwise return whichever side found a target node
    return left_result if left_result is not None else right_result  # @step:visit
