# Binary Tree Pruning — remove all subtrees containing no 1s (post-order)

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def binary_tree_pruning(root) -> object:
    if not root:
        return None  # @step:initialize

    root.left = binary_tree_pruning(root.left)  # @step:traverse-left
    root.right = binary_tree_pruning(root.right)  # @step:traverse-right

    if root.value == 0 and not root.left and not root.right:
        return None  # @step:detach-node

    return root  # @step:visit
