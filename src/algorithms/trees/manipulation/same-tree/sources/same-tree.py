# Same Tree — recursive: check structural equality and value equality

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def same_tree(tree_a, tree_b) -> bool:
    if tree_a is None and tree_b is None:  # @step:initialize
        return True
    if tree_a is None or tree_b is None:  # @step:compare
        return False
    if tree_a.value != tree_b.value:  # @step:compare
        return False

    # Recursively check left and right subtrees
    left_match = same_tree(tree_a.left, tree_b.left)  # @step:traverse-left
    right_match = same_tree(tree_a.right, tree_b.right)  # @step:traverse-right

    return left_match and right_match  # @step:visit
