# Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_symmetric_tree(root) -> bool:
    if root is None:  # @step:initialize
        return True

    def is_mirror(left_node, right_node) -> bool:
        if left_node is None and right_node is None:  # @step:check-balance
            return True
        if left_node is None or right_node is None:  # @step:check-balance
            return False
        if left_node.value != right_node.value:  # @step:check-balance
            return False

        # Outer pair and inner pair must both be mirrors
        outer_match = is_mirror(left_node.left, right_node.right)  # @step:traverse-left
        inner_match = is_mirror(left_node.right, right_node.left)  # @step:traverse-right
        return outer_match and inner_match  # @step:check-balance

    return is_mirror(root.left, root.right)  # @step:complete
