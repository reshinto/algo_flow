# Build BST from Level-Order Sequence
# Insert each value from the level-order array into a BST using standard BST insertion.
# The resulting tree's level-order traversal will match the input array.

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_from_level_order(level_order: list):
    if not level_order:  # @step:initialize
        return None

    def bst_insert(current, value):  # @step:initialize
        if current is None:
            return TreeNode(value)  # @step:build-node

        if value < current.value:
            current.left = bst_insert(current.left, value)  # @step:connect-child
        elif value > current.value:
            current.right = bst_insert(current.right, value)  # @step:connect-child

        return current  # @step:visit

    root = None  # @step:initialize
    for value in level_order:  # @step:select-element
        root = bst_insert(root, value)  # @step:build-node

    return root  # @step:complete
