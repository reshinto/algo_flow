# Invert Binary Tree — recursive: swap left and right children at every node

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def invert_binary_tree(root) -> 'BinaryNode | None':
    if root is None:  # @step:initialize
        return None

    # Recursively invert the left subtree
    inverted_left = invert_binary_tree(root.left)  # @step:traverse-left
    # Recursively invert the right subtree
    inverted_right = invert_binary_tree(root.right)  # @step:traverse-right

    # Swap left and right children
    root.left = inverted_right  # @step:swap-children
    root.right = inverted_left  # @step:swap-children

    return root  # @step:visit
