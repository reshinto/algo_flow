# Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def count_complete_tree_nodes(root) -> int:
    if root is None:  # @step:initialize
        return 0

    # Compute left-most height and right-most height
    left_height = 0  # @step:initialize
    right_height = 0  # @step:initialize

    left_cursor = root  # @step:traverse-left
    while left_cursor is not None:  # @step:traverse-left
        left_height += 1  # @step:update-height
        left_cursor = left_cursor.left  # @step:traverse-left

    right_cursor = root  # @step:traverse-right
    while right_cursor is not None:  # @step:traverse-right
        right_height += 1  # @step:update-height
        right_cursor = right_cursor.right  # @step:traverse-right

    # If heights match, the tree is a perfect binary tree
    if left_height == right_height:  # @step:check-balance
        return (2 ** left_height) - 1  # @step:add-to-result

    # Otherwise recurse on both subtrees
    left_count = count_complete_tree_nodes(root.left)  # @step:traverse-left
    right_count = count_complete_tree_nodes(root.right)  # @step:traverse-right
    return left_count + right_count + 1  # @step:add-to-result
